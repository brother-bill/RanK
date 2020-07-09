import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
const Dashboard = () => {
  return (
    <div>
      Dashboard
      <Link to="/listings/new">
        <Button floated="right" circular icon color="blue" size="massive">
          <Icon name="add" />
        </Button>
      </Link>
    </div>
  );
};

export default Dashboard;
