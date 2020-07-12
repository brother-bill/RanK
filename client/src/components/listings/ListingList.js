import React from "react";
import { connect } from "react-redux";
import { fetchListings } from "../../actions";
import { Card, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import history from "../../history";
class ListingList extends React.Component {
  componentDidMount() {
    this.props.fetchListings();
  }

  renderListings(listings) {
    return Object.keys(listings).map((keys) => {
      const { title, role, dateCreated, shortid } = listings[keys];
      let d = new Date(dateCreated);
      return (
        <Card
          fluid
          key={shortid}
          color="black"
          onClick={() => history.push(`/listings/show/${shortid}`)}
        >
          <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Meta>
              {`Created: ${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/listings/edit/${shortid}`);
                }}
                size="large"
                floated="right"
                color="blue"
              >
                Edit
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(`/listings/delete/${shortid}`);
                }}
                size="large"
                floated="right"
                color="red"
              >
                Delete
              </Button>
            </Card.Meta>
            <Card.Description>{`Role: ${role}`}</Card.Description>
          </Card.Content>
        </Card>
      );
    });
  }
  render() {
    return <Card.Group>{this.renderListings(this.props.listings)}</Card.Group>;
  }
}

// State is global state
function mapStateToProps(state) {
  return { listings: state.listings };
}
export default connect(mapStateToProps, { fetchListings })(
  withRouter(ListingList)
);
