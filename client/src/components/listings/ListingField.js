// Contains logic to render a single label and text input
import React from "react";

// (props.input) --> ({input})
// {...input} adds all event handlers to input

// <label>
//         <input type="checkbox" checked={false} />
//         <span>Yellow</span>
//       </label>
// touched && error incase field is not clicked when validating in beginning
export default ({ input, label, name, meta: { error, touched } }) => {
  if (label === "List Title") {
    return (
      <div>
        <label>{label}</label>
        <input {...input} style={{ marginBottom: "5px" }} />
        <div className="red-text" style={{ marginBottom: "20px" }}>
          {touched && error}
        </div>
      </div>
    );
  } else if (label === "Role") {
    return (
      <div style={{ marginBottom: "25px" }}>
        <label>Select Role</label>
        <select {...input} className="browser-default">
          <option value="" disabled />
          <option value="Top">Top</option>
          <option value="Jungle">Jungle</option>
          <option value="Mid">Mid</option>
          <option value="Support">Support</option>
          <option value="Bot">Bot</option>
        </select>
        <div className="red-text" style={{ marginBottom: "20px" }}>
          {touched && error}
        </div>
      </div>
    );
  } else {
    if (touched && error) {
      return (
        <React.Fragment>
          <label>
            <input type="checkbox" {...input} />
            <span style={{ width: "130px", color: "Black" }}>{input.name}</span>
          </label>
          <div className="red-text" style={{ marginBottom: "20px" }}>
            {touched && error}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <label>
            <input type="checkbox" {...input} />
            <span style={{ width: "130px", color: "Black" }}>{input.name}</span>
          </label>
        </React.Fragment>
      );
    }
  }
};
