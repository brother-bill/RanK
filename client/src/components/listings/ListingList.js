import React from "react";
import { connect } from "react-redux";
import { fetchListings } from "../../actions";
import { Card } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
class ListingList extends React.Component {
  componentDidMount() {
    this.props.fetchListings();
  }

  // key  key ={listing._id}
  renderListings() {
    return this.props.listings.map(
      ({ title, role, champions, dateCreated, shortid, _id }) => {
        let d = new Date(dateCreated);
        return (
          <Card
            fluid
            key={shortid}
            color="red"
            header={title}
            meta={`Created: ${
              d.getMonth() + 1
            }/${d.getDate()}/${d.getFullYear()}`}
            description={`Role: ${role}`}
            onClick={() => this.props.history.push(`/listings/${shortid}`)}
          ></Card>
        );
      }
    );
  }
  render() {
    return <Card.Group>{this.renderListings()}</Card.Group>;
  }
}

// State is global state
function mapStateToProps(state) {
  return { listings: state.listings };
}
export default connect(mapStateToProps, { fetchListings })(
  withRouter(ListingList)
);
