import { Button, Typography } from "@material-ui/core";
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
import CloseIcon from "@material-ui/icons/Close";
import swal from "sweetalert";
import { BiArrowBack } from "react-icons/bi";

const OrderForm = (props) => {
    
    const progress = [
        { name: "customer" },
        { name: "sizes" },
        { name: "styles" },
        { name: "payment" },
    ];
    const [num, setNum] = useState(0)
    const [currentProgress, setCurrentProgress] = useState(progress[num].name);
    const [disabled, setDisabled] = useState(false)
    useEffect(() => {
      if (num < 4)
      setCurrentProgress(progress[num].name)
    }, [num])

    const [orderData, setOrderData] = useState({
      type: props.type.typeName,
      imageUrl: null,
      customer: null,
      sizes: null,
      styles: ["Kulleeti shiinees", "Gacmo Gaab"],
      advance: null,
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

    const postOrder = async (data) => {
      setDisabled(true)
      const res = await axios.post(`${constants.baseUrl}/orders`, data).then((res) => {
        alert("Succesfully posted order.")
        props.hideModal()
      }).catch(err => {
        alert(err.response.data.message);
      })
    }


    const completeOder = () => {
      const data = {
        customer: orderData.customer,
        advance: orderData.advance,
        deadline: orderData.deadline,
        services: [
          {
            type: orderData.type,
            sizes: orderData.sizes,
            styles: orderData.styles,
            unitPrice: orderData.unitPrice,
            imageUrl: orderData.imageUrl,
            quantity: 1
          }
        ]
      }
      postOrder(data)
    }

const closeForm = () => {
    swal({
      title: "Closing the form",
      text: `Are you sure to close the form?`,
      icon: "warning",
      buttons: {
        cancel : 'No',
        confirm : {text:'Yes',className:'sweet-warning'},
    }

    }).then((response) => {
      if (response) {
      props.hideModal()  
      }
    })
  }

  return (
    <MyModal  left="25%" top="23vh">
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
        <div style = {{display: "flex", width: "100%", justifyContent: "space-between",
      }}>

        <img
      src={image}
      alt = "Order Image"
      style={{
        width: "150px",
        height: "100px",
        borderRadius: "6px",
        cursor: "pointer",
        // visibility: !image ? "hidden" : null,
        // flex: 1
      }}
      
    />
        <div style={{ display: "flex", gap: "55px",  }}>
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
        
        <div style = {{display: "flex", gap: "6px", justifyContent: "center",
        cursor: "pointer", height: "20px"}}
        onClick = {()=> {
          if (currentProgress != "customer"){
            setNum(state => state - 1)
          }
        }}>
        <BiArrowBack style = {{cursor: "pointer", fontSize: "25px", 
        color: "gray",
        }} 
        />
        <Typography style = {{fontSize: "18px", color: "gray"}}> Back</Typography>
        </div>
        <CloseIcon style = {{cursor: "pointer", fontSize: "38px", 
        color: "gray",
        }} 
        onClick = {closeForm}/>
        </div>

        {currentProgress == "customer" && <ProductForm data = {
          (data) => {
            setOrderData(prevState => {
              return {...prevState, imageUrl: data.imageUrl,
                customer: data.customer};
            });
          }
        } />}
        {currentProgress == "sizes" && <SizesForm type = {props.type.typeName}
        data = {
          (data) => {
            setOrderData(prevState => {
              return {...prevState, sizes: data.sizes};
            });
          }
        }
        customer = {orderData.customer} type = {orderData.type}/>}
       
      { currentProgress == "styles" &&  <StylesForm data = {
          (data) => {
            setOrderData(prevState => {
              return {...prevState, styles: data.styles};
            });
          }
        }
        /> }

       { currentProgress == "payment" && <PaymentForm data = {
          (data) => {
            setOrderData(prevState => {
              return {...prevState, unitPrice: data.unitPrice,
                advance: data.advance, deadline: data.deadline};
            });
          }
        }/> }
        <Button
            disabled = {disabled}
            variant="contained"
            style={{
              background: disabled ? "lightGray" : "#3245E9",
              borderRadius: "6px",
              height: "45px",
              color: "white",
              fontSize:"16px",
              width: "250px"
            }}
            onClick = {()=> {
              if (currentProgress != "payment"){
                setNum(state => state + 1)
              }
              if (currentProgress == "payment"){
                 completeOder()
              }
              
            }}
          >
            {" "}
           {currentProgress == "payment" ? "complete" : "next"}
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
