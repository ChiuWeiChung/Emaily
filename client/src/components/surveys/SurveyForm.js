import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends React.Component {
  renderFields() {
    return formFields.map((field) => {
      return (
        <Field
          key={field.name}
          component={SurveyField}
          type="text"
          label={field.label}
          name={field.name}
        ></Field>
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  formFields.forEach((field) => {
    if (!values[field.name]) {
      errors[field.name] = `You must provide ${field.name}`;
    }
  });
  errors.recipients = validateEmails(values.recipients || "");

  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
