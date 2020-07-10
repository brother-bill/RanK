import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import ListingList from "./listings/ListingList";
const Dashboard = () => {
  return (
    <div>
      <ListingList />
      <Link to="/listings/new">
        <Button
          style={{ marginTop: "20px" }}
          floated="right"
          circular
          icon
          color="blue"
          size="massive"
        >
          <Icon name="add" />
        </Button>
      </Link>
    </div>
  );
};

export default Dashboard;
