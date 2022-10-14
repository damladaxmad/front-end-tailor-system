import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import useFetch from "../../funcrions/DataFetchers";
import image from "../../assets/images/vip.jpg";
import { display } from "@mui/system";
import axios from "axios";
import { constants } from "../../Helpers/constantsFile";
import Service from "./Service";

const CustomerOrders = (props) => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    axios
      .get(`${constants.baseUrl}/customers/orders/${props.data.id}`)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        alert("failed to get request.");
      });
  }, []);

  // Getting the number of items
  let items = 0;
  let services = [];
  orders?.map((order) => {
    items += order.services.length;
    Array.prototype.push.apply(services, order.services);
  });

  const customerInfo = [
    { title: "Name:", content: props.data.name },
    { title: "Phone:", content: props.data.phone },
    { title: "Orders:", content: orders?.length ? orders?.length : "0" },
    { title: "Items:", content: items },
  ];

  return (
    <div
      style={{
        width: "95%",
        margin: "30px auto",
        display: "flex",
        gap: "45px",
        flexWrap: "wrap",
        borderRadius: "6px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          background: "white",
          borderRadius: "6px",
          padding: "15px 0px",
          justifyContent: "space-around",
          border: "1px solid black",
        }}
      >
        {customerInfo.map((info) => (
          <div style={{ display: "flex", gap: "20px" }}>
            <Typography style={{ fontWeight: "600", fontSize: "16px" }}>
              {info.title}
            </Typography>
            <Typography
              style={{
                fontSize: "16px",
              }}
            >
              {info.content}
            </Typography>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
        //   justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "45px",
        }}
      >
        {services?.map((service) => (
          <Service service={service} />
        ))}
      </div>
    </div>
  );
};

export default CustomerOrders;
