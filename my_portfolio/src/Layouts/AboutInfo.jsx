import React from "react";

function AboutInfo(props) {
  return (
    <div className="col-md-3">
      <h4 className="text-warning">{props.title}</h4>
      <h6 className="text-lowercase">{props.value}</h6>
    </div>
  );
}

export default AboutInfo;
