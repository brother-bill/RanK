import React from "react";
import { connect } from "react-redux";
import { fetchListing, editListing } from "../../actions";
import ListingsForm from "./ListingsForm";
import _ from "lodash";

class ListingEdit extends React.Component {
  componentDidMount() {
    this.props.fetchListing(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editListing(this.props.match.params.id, formValues);
  };

  getChampions = (champions) => {
    let championArr = [];
    for (let champ in champions) {
      championArr.push(champ);
    }
    return championArr;
  };

  render() {
    if (!this.props.listing) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <h3>Edit Listing</h3>
        <ListingsForm
          initialValues={{
            ..._.pick(this.props.listing, "title", "role"),
            ...{ champions: this.getChampions(this.props.listing.champions) },
          }}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { listing: state.listings[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchListing, editListing })(
  ListingEdit
);
