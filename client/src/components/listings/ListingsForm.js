// Take in user input here
import React from "react";
import { reduxForm, Field } from "redux-form"; // Helps communicate with redux store, similar to connect()
import ListingField from "./ListingField";
import { Link, withRouter } from "react-router-dom";
import { createList } from "../../actions";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

class ListingsForm extends React.Component {
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };
  renderFields() {
    return (
      <div>
        <Field label="List Title" name="title" component={ListingField} />
        <Field label="Role" name="role" component={ListingField} />
        <Field label="Champions" name="champions" component={ListingField} />
      </div>
    );
  }

  // Handlesubmit is passed in from reduxForm, passed in props from reduxForm
  render() {
    return (
      <div>
        <form
          className="ui error form"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          {this.renderFields()}

          <Link to="/listings">
            <Button color="grey">Cancel</Button>
          </Link>

          <Button floated="right" color="green" type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = "You must provide a title";
  }

  if (!values.role) {
    errors.role = "You must provide a role";
  }

  if (!values.champions || values.champions.length === 0) {
    errors.champions = "You must choose a champion";
  }

  return errors;
}

const formWrapped = reduxForm({
  validate,
  form: "listingsForm",
})(ListingsForm);

export default connect(null, { createList })(withRouter(formWrapped));
