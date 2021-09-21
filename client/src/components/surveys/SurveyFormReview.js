import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions/index";

const SurveyReview = (props) => {
  const reviewFields = () => {
    return formFields.map((field) => {
      return (
        <div key={field.name}>
          <label>{field.label}</label>
          <div>{props.formValues[field.name]}</div>
        </div>
      );
    });
  };

  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>{reviewFields()}</div>
      <button
        className="yellow white-text darken-3 btn-flat"
        onClick={props.onCancel}
      >
        Cancel
      </button>
      <button
        className="green white-text btn-flat right"
        onClick={() => props.submitSurvey(props.formValues, props.history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    formValues: state.form.surveyForm.values,
  };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
