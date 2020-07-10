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
      let champName = val[0];
      champName =
        champName.charAt(0).toUpperCase() + champName.slice(1).toLowerCase();

      return (
        <List.Item key={val[0]}>
          <Image
            size="tiny"
            avatar
            src={`/images/champions/${champName}.png`}
          />
          <List.Content>
            <List.Header>{val[0]}</List.Header>
            {val[1][role]}
          </List.Content>
        </List.Item>
      );
    });
  }

  // check undefined
  render() {
    if (!this.props.listing.champions) {
      return <div></div>;
    }

    return (
      <div>
        <Image
          avatar
          src={`/images/roles/${this.props.listing.role.toLowerCase()}.png`}
        />
        {this.props.listing.role}
        <List ordered>
          {this.sortObj(this.props.listing.champions, this.props.listing.role)}
        </List>
      </div>
    );
  }
}

// State is global state
function mapStateToProps(state) {
  return { listing: state.listing };
}

export default connect(mapStateToProps, { fetchListing })(ListingShow);
