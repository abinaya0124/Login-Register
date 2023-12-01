import React from "react";
import { useContext } from "react";
import { UserContext } from "./Context/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Dashboard</h1>
      {!!user && <h2>This is {user.name}!</h2>}
    </div>
  );
};

export default Dashboard;
