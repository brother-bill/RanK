import React from "react";
import { Button, Icon } from "semantic-ui-react";
import ListingList from "./listings/ListingList";
import history from "../history";
const Dashboard = () => {
  return (
    <div>
      <ListingList />

      <Button
        style={{ marginTop: "20px" }}
        floated="right"
        circular
        icon
        color="blue"
        size="massive"
        onClick={() => {
          history.push("/listings/new");
        }}
      >
        <Icon name="add" />
      </Button>
    </div>
  );
};

export default Dashboard;
