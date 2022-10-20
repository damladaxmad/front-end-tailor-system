import { Button } from "@material-ui/core";
import { useState } from "react";
import MyModal from "../../../Modal/Modal";
import PaymentForm from "./PaymentForm";
import ProductForm from "./ProductForm";
import SizesForm from "./SizesForm";
import StylesForm from "./StylesForm";
import React, { useEffect } from "react";
import axios from "axios";
import { constants } from "../../../Helpers/constantsFile";
// import image from "../../../assets/images/stripes.jpg";

const OrderForm = (props) => {
    
    const progress = [
        { name: "customer" },
        { name: "sizes" },
        { name: "styles" },
        { name: "payment" },
    ];
    const [num, setNum] = useState(0)
    const [currentProgress, setCurrentProgress] = useState("customer");

    const [orderData, setOrderData] = useState({
      type: props.type.typeName,
      imageUrl: null,
      customer: null,
      sizes: null,
      styles: [],
      advance: null,
      unitPrice: null,
      unitPrice: null,
      deadline: null
    })

    console.log(orderData)

    const [image, setImage] = useState();

    useEffect(() => {
      axios
        .get(`${constants.baseUrl}/files/${orderData.imageUrl}`, {
          responseType: "blob",
        })
        .then((res) => {
          setImage(URL.createObjectURL(res.data));
        });
    }, [orderData]);

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
        <div style = {{display: "flex", width: "100%", gap: "75px"}}>

        <img
      src={image}
      style={{
        width: "150px",
        height: "100px",
        borderRadius: "6px",
        cursor: "pointer",
        visibility: currentProgress == "customer" ? "hidden" : null
      }}
      
    />
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
        </div>

        {currentProgress == "customer" && <ProductForm data = {
          (data) => {
            setOrderData(prevState => {
              return {...prevState, imageUrl: data.imageUrl,
                customer: data.customer};
            });
          }
        } />}
        {/* {currentProgress == "sizes" && <SizesForm data = {
          (data) => {
            setOrderData(prevState => {
              return {...prevState, sizes: data.sizes};
            });
          }
        }/>} */}
       
      {/* { currentProgress == "styles" &&  <StylesForm data = {
          (data) => {
            setOrderData(prevState => {
              return {...prevState, styles: data.styles};
            });
          }
        }/> } */}

       { currentProgress == "payment" && <PaymentForm data = {
          (data) => {
            setOrderData(prevState => {
              return {...prevState, unitPrice: data.unitPrice,
                advance: data.advance, deadline: data.deadline};
            });
          }
        }/> }
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
            onClick = {()=> setCurrentProgress("payment")}
          >
            {" "}
            Next
          </Button>

          {currentProgress == "customer" && <div style = {{display: "flex", gap: "10px",
        fontSize: "16px"}}>
            <p style = {{margin: "0px"}}> Customer does not exist?</p>
            <p style = {{color: "#3245E9", margin: "0px", 
        fontWeight: "bold", cursor: "pointer"}}> Create</p>
          </div>}
      </div>
    </MyModal>
  );
};

export default OrderForm;
