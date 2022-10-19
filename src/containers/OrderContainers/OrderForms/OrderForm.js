import { Button } from "@material-ui/core";
import { useState } from "react";
import MyModal from "../../../Modal/Modal";
import PaymentForm from "./PaymentForm";
import ProductForm from "./ProductForm";
import SizesForm from "./SizesForm";
import StylesForm from "./StylesForm";

const OrderForm = (props) => {
    
    const progress = [
        { name: "customer" },
        { name: "sizes" },
        { name: "styles" },
        { name: "payment" },
    ];
    const [num, setNum] = useState(0)
    const [currentProgress, setCurrentProgress] = useState("customer");

  return (
    <MyModal onClose={() => props.hideModal()} left="25%" top="23vh">
      <div
        style={{
          width: "750px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          height: "400px",
        }}
      >
        <div style={{ display: "flex", gap: "55px" }}>
          {progress.map((i, index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "7px",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  background: currentProgress == i.name ? "#3245E9" : "#F0F2FA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: currentProgress == i.name && "white",
                }}
              >
                {index + 1}
              </div>
              <p
                style={{
                  fontWeight: "500",
                  color: currentProgress == i.name && "#3245E9",
                }}
              >
                {" "}
                {i.name}
              </p>
            </div>
          ))}
        </div>
        {currentProgress == "customer" && <ProductForm />}
        {currentProgress == "sizes" && <SizesForm/>}
        {/* <StylesForm/> */}
        {/* <PaymentForm/> */}
        <Button
            variant="contained"
            style={{
              background: "#3245E9",
              borderRadius: "6px",
              height: "45px",
              color: "white",
              fontSize:"16px",
              width: "250px"
            }}
            onClick = {()=> setCurrentProgress("sizes")}
          >
            {" "}
            Next
          </Button>
          <div style = {{display: "flex", gap: "10px",
        fontSize: "16px"}}>
            <p style = {{margin: "0px"}}> Customer does not exist?</p>
            <p style = {{color: "#3245E9", margin: "0px", 
        fontWeight: "bold", cursor: "pointer"}}> Create</p>
          </div>
      </div>
    </MyModal>
  );
};

export default OrderForm;
