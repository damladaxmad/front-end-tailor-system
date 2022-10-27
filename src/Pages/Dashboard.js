import React, { useEffect, useState } from "react";
import StatCard from "../containers/DashboardContainers/Summary/StatCard";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import WeeklyChart from "../containers/DashboardContainers/Weekly/WeeklyChart";
import OrderUpdates from "../containers/DashboardContainers/Weekly/OrderUpdates";
import RevenueStats from "../containers/DashboardContainers/Weekly/RevenueStats";
import Top5Employees from "../containers/DashboardContainers/Monthly/Top5Employees";

const Dashboard = () => {
  const dashboard = useSelector((state) => state.dashboard.dashboard);

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
      <Typography style={{ fontWeight: "600", fontSize: "25px" }}>
        {" "}
        Dashboard{" "}
      </Typography>
      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {dashboard?.summary.map((d, index) => (
          <StatCard value={d} key={index} type = "summary"/>
        ))}
      </div>

      <Typography
        style={{
          fontWeight: "500",
          color: "#928E8E",
          fontSize: "25px",
          marginTop: "40px",
        }}
      >
        {" "}
        Weekly Statistics{" "}
      </Typography>

      <div
        style={{
          display: "flex",
          width: "98%",
          justifyContent: "space-between",
        }}
      >
        <WeeklyChart data={dashboard?.weekly?.weeklyOrders} />
        <OrderUpdates data={dashboard?.weekly?.newOrderUpdates} />
        <RevenueStats data={dashboard?.weekly?.revenueStats} />
      </div>

      <Typography
        style={{
          fontWeight: "500",
          color: "#928E8E",
          fontSize: "25px",
          marginTop: "40px",
        }}
      >
        {" "}
        Monthly Statistics{" "}
      </Typography>

      <div
        style={{
          display: "flex",
          width: "98.5%",
          gap: "50px",
          flexWrap: "wrap",
        }}
      >
        <Top5Employees data={dashboard?.monthly?.top5Employees} />

        <div
          style={{
            display: "flex",
            gap: "30px",
            width: "50%",
            flexWrap: "wrap",
          }}
        >
          <StatCard
            value={{
              label: "orders",
              value: dashboard?.monthly?.thisMonthOrders,
              isMoney: false,
            }}
          />
          <StatCard
            value={{
              label: "revenue",
              value: dashboard?.monthly?.revenue,
              isMoney: true,
            }}
          />
           <StatCard
            value={{
              label: "recievable",
              value: dashboard?.monthly?.recievable,
              isMoney: true,
            }}
          />

          <StatCard
            value={{
              label: "net profit",
              value:
                dashboard?.monthly?.revenue - dashboard?.monthly?.recievable,
              isMoney: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
