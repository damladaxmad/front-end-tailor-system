import React, { useEffect, useState } from "react";
import StatCard from "../containers/DashboardContainers/StatCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setDashboard } from "../redux/actions/dashboardActions";
import JsPDF from "jspdf";
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";

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
        gap: "14px",
        flexDirection: "column",
      }}
    >
      <h2> Dashboard</h2>
      <div
        style={{
          display: "flex",
          gap: "12px",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {dashboard?.map((d, index) => (
          <StatCard value={d} key={index} />
        ))}
      </div>
 
    </div>
  );
};

export default Dashboard;
