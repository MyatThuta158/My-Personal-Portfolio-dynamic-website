import React from "react";

function FormInput(props) {
  return (
    <div>
      <h2 className="form-label">{props.title}</h2>
      <input
        type={props.type}
        className="form-control"
        style={{ width: "20vw" }}
        name={props.name}
        placeholder={props.placeholder}
        {...(props.register || {})}
      />
      {props.error && (
        <p className="text-danger">Please Enter {props.error.message}</p>
      )}
    </div>
  );
}

export default FormInput;
