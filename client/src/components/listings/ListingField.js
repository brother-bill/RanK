// Contains logic to render a single label and text input
import React from "react";
import { Dropdown } from "semantic-ui-react";
import { roleOptions, championOptions } from "./options";

// touched && error incase field is not clicked when validating in beginning
export default ({ input, label, name, meta: { error, touched } }) => {
  if (label === "List Title") {
    return (
      <div>
        <label>{label}</label>
        <input placeholder="Title" {...input} style={{ marginBottom: "5px" }} />
        <div className="ui error message" style={{ marginBottom: "20px" }}>
          {touched && error}
        </div>
      </div>
    );
  } else if (label === "Role") {
    return (
      <div>
        <label>Select Role</label>
        <Dropdown
          style={{ marginBottom: "5px" }}
          placeholder="Role"
          fluid
          selection
          {...input}
          value={input.value}
          onChange={(param, data) => input.onChange(data.value)}
          options={roleOptions}
        />
        <div className="ui error message" style={{ marginBottom: "20px" }}>
          {touched && error}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <label>Select Champions</label>
        <Dropdown
          options={championOptions}
          fluid
          multiple
          search
          selection
          {...input}
          value={input.value || []}
          onChange={(param, data) => input.onChange(data.value)}
          onBlur={() => input.onBlur(input.value)}
          placeholder={label}
          style={{ marginBottom: "20px" }}
        />
        <div className="ui error message" style={{ marginBottom: "20px" }}>
          {touched && error}
        </div>
      </div>
    );
  }
};
