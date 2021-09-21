import React from "react";

const surveyField = (props) => {
  return (
    <div>
      <label>{props.label}</label>
      <input {...props.input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {props.meta.touched && props.meta.error}
      </div>
    </div>
  );
};

export default surveyField;
