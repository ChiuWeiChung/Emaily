const { Path } = require("path-parser");
const { URL } = require("url");
const _ = require("lodash");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

const Survey = require("../models/Survey");

module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const events = req.body.map((event) => {
      const pathname = new URL(event.url).pathname;
      const p = new Path("/api/surveys/:surveyId/:choice");
      const match = p.test(pathname);
      if (match) {
        return { email: event.email, ...match };
      }
    });
    const compactEvents = _.compact(events);
    const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");

    // Update Survey Database
    uniqueEvents.forEach((event) => {
      Survey.updateOne(
        {
          _id: event.surveyId,
          recipients: {
            $elemMatch: {
              email: event.email,
              responded: false,
            },
          },
        },
        {
          $inc: { [event.choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date(),
        }
      ).exec();
    });

    res.send({});
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { titile, subject, body, recipients } = req.body;
    const survey = new Survey({
      titile,
      subject,
      body,
      recipients: recipients.split(",").map((email) => {
        return {
          email: email.trim(),
        };
      }),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};

// const survey = {
//   title: "my title",
//   subject: "my subject",
//   recipients: "a0928202539@gmail.com",
//   body: "heres the body of the email",
// };
