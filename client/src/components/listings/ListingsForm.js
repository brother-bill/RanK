// Take in user input here
import React from "react";
import { reduxForm, Field } from "redux-form"; // Helps communicate with redux store, similar to connect()
import ListingField from "./ListingField";
//import _ from "lodash";
import { champions } from "./champions";
import { Link, withRouter } from "react-router-dom";
import * as actions from "../../actions";
import { connect } from "react-redux";

class ListingsForm extends React.Component {
  renderChampions(champs) {
    let total = champs.map((value) => {
      return (
        <Field
          key={value}
          label="champion"
          name={value}
          component={ListingField}
          type="checkbox"
        />
      );
    });
    return total;
  }
  renderFields() {
    return (
      <div>
        <Field
          label="List Title"
          type="text"
          name="title"
          component={ListingField}
        />
        <Field
          label="Role"
          type="select"
          name="role"
          component={ListingField}
        />

        {this.renderChampions(champions)}
      </div>
    );
  }

  // Handlesubmit is passed in from reduxForm, passed in props from reduxForm
  render() {
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit((values) => {
            this.props.submitList(values, this.props.history);
          })}
        >
          {this.renderFields()}
          <Link to="/listings" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Submit
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validateChampions(champs, values) {
  let x = false;
  champs.forEach((champ) => {
    if (values[champ]) {
      x = true;
    }
  });
  return x;
}
function validate(values, props) {
  //console.log(values["Jayce"]);
  const errors = {};
  if (!values.title) {
    errors.title = "You must provide a title";
  }

  if (!values.role) {
    errors.role = "You must provide a role";
  }

  if (!validateChampions(champions, values)) {
    errors.Zyra = "You must provide a champion";
  }

  return errors;
}

const formWrapped = reduxForm({
  validate,
  form: "listingsForm",
})(ListingsForm);

export default connect(null, actions)(withRouter(formWrapped));
