import React from "react";
import { connect } from "react-redux";
import { fetchListing } from "../../actions";
import { Image, List } from "semantic-ui-react";

class ListingShow extends React.Component {
  componentDidMount() {
    this.props.fetchListing(this.props.match.params.id);
  }
  sortObj(championsObj, role) {
    let championsArr = Object.entries(championsObj);
    let sortedArr = championsArr.sort((a, b) =>
      a[1][role] < b[1][role] ? 1 : -1
    );

    return sortedArr.map((val) => {
      return (
        <List.Item key={val[0]}>
          <Image
            size="tiny"
            avatar
            src={`/images/champions/${val[0].toLowerCase()}.png`}
          />
          <List.Content>
            <List.Header>{val[0]}</List.Header>
            {val[1][role]}
          </List.Content>
        </List.Item>
      );
    });
  }

  render() {
    // Check if undefined
    if (!this.props.listing) {
      return <React.Fragment></React.Fragment>;
    }

    return (
      <div>
        <h1>{this.props.listing.title}</h1>

        <h2 style={{ display: "inline" }}>
          {this.props.listing.role} Popularity
        </h2>
        <Image
          style={{ marginBottom: "5px" }}
          avatar
          src={`/images/roles/${this.props.listing.role.toLowerCase()}.png`}
        />

        <List inverted={this.props.theme === "true"} ordered>
          {this.sortObj(this.props.listing.champions, this.props.listing.role)}
        </List>
      </div>
    );
  }
}

// State is global state
function mapStateToProps(state, ownProps) {
  return {
    listing: state.listings[ownProps.match.params.id],
    theme: state.theme,
  };
}

export default connect(mapStateToProps, { fetchListing })(ListingShow);
