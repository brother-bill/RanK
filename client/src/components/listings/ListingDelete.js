import React from "react";
import Modal from "../Modal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchListing, deleteListing } from "../../actions";

class ListingDelete extends React.Component {
  componentDidMount() {
    this.props.fetchListing(this.props.match.params.id);
  }
  renderActions() {
    const id = this.props.match.params.id;
    return (
      // React fragment to fix responsive buttons
      <React.Fragment>
        <button
          onClick={() => this.props.history.push("/listings")}
          className="ui grey button"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            this.props.deleteListing(id);
          }}
          className="ui button negative"
        >
          Delete
        </button>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.listing) {
      return "Are you sure you want to delete this listing?";
    }
    return `Are you sure you want to delete listing with title: ${this.props.listing.title}`;
  }

  render() {
    return (
      <div>
        <Modal
          title="Delete Listing"
          content={this.renderContent()}
          actions={this.renderActions()}
          onDismiss={() => this.props.history.push("/listings")}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    listing: state.listings[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, {
  fetchListing,
  deleteListing,
})(withRouter(ListingDelete));
