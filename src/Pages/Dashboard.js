import React, { useEffect, useState } from "react";
import StatCard from "../containers/DashboardContainers/StatCard";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import WeeklyChart from "../containers/DashboardContainers/WeeklyChart";
import OrderUpdates from "../containers/DashboardContainers/OrderUpdates";
import RevenueStats from "../containers/DashboardContainers/RevenueStats";

const Dashboard = () => {

  const dashboard = useSelector((state) => state.dashboard.dashboard)

  return (
    <div
      id="uni"
      style={{
        height: "100%",
        width: "95%",
        margin: "0px auto",
        display: "flex",
        gap: "32px",
        flexDirection: "column",
      }}
    >
        <Typography style = {{fontWeight: "600",
    fontSize: '25px'}}> Dashboard </Typography>
      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {dashboard?.summary.map((d, index) => (
          <StatCard value={d} key={index} />
        ))}
      </div>

      <Typography style = {{fontWeight: "500", color: "#928E8E",
    fontSize: '25px', marginTop: "40px"}}> Weekly Statistics </Typography>

    <div style = {{display: "flex", width: "98.5%", 
    gap: "50px", flexWrap: "wrap"}}>
         <WeeklyChart data = {dashboard?.weekly?.weeklyOrders}/>
         <OrderUpdates />
         <RevenueStats data = {dashboard?.weekly?.revenueStats} />
    </div>
 
    </div>
  );
};

export default Dashboard;
