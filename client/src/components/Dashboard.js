import React, { useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import ListingList from "./listings/ListingList";
import history from "../history";
const Dashboard = () => {
  // If user was already logged in and requests home page, we redirect them to listings page
  useEffect(() => {
    if (history.location.pathname === "/") {
      history.push("/listings");
    }
  }, []);
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
