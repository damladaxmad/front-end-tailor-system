import shaatiImage from "../../assets/images/shaati.webp";
import surwaalImage from "../../assets/images/surwaal.jpg";
import qamiisImage from "../../assets/images/qamiis.jpg";
import jaakadImage from "../../assets/images/jaakad.jpg";
import { Button, Typography } from "@material-ui/core";
import { useState } from "react";
import OrderForm from "./OrderForms/OrderForm";

const types = [
  { typeName: "Shaati", typeImage: shaatiImage },
  { typeName: "Surwaal", typeImage: surwaalImage },
  { typeName: "Qamiis", typeImage: qamiisImage },
  { typeName: "Jaakad", typeImage: jaakadImage },
];

const OrderLists = (props) => {
    const [orderForm, setOrderForm] = useState(false)

  return (
    <div style = {{display: "flex", gap: "40px", flexWrap: "wrap",
    marginTop: "20px"}}
    class = "myDiv">

        {orderForm && <OrderForm hideModal = {()=> setOrderForm(false)}/>}
      {types.map((type) => (
        <div
          style={{
            width: "210px",
            display: "flex",
            flexDirection: "column",
            padding: "12px",
            background: "white",
            borderRadius: "8px",
            gap: "10px"
          }}
        >
          <Typography style={{ fontWeight: "600", fontSize: "16px" }}>
            {" "}
            {type.typeName}
          </Typography>
          <img
            src={type.typeImage}
            style={{
              width: "100%",
              height: "160px",
              borderRadius: "8px"
            }}
          />
          <Button
            variant="contained"
            style={{
              background: "#3245E9",
              borderRadius: "6px",
              height: "35px",
              color: "white",
              fontSize:"16px"
            }}
            onClick = {()=> setOrderForm(true)}
          >
            {" "}
            ORDER
          </Button>
        </div>
      ))}
    </div>
  );
};

export default OrderLists;
