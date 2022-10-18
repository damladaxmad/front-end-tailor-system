import { Button } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { constants } from "../../Helpers/constantsFile";
import { setUsers } from "../../redux/actions/usersActions";
import Service from "../CustomerContainers/Service";
import AssignOrderToUser from "./AssingOrderToUser";
import "./list.css"
import PaymentForm from "./PaymentForm";

const ListDetails = (props) => {

  const [paymentForm, setPaymentForm] = useState(false)
  const [assign, setAssign] = useState(false)
  const dispatch = useDispatch()

  const orderActions = () => {
    if (props.order?.status == "on-service") {
      axios.post(`${constants.baseUrl}/orders/finish-order/${props.order?.id}`).then(()=> {
        alert("Successfully Finished Order")
      })
    }
    if (props.order?.status == "finished") {
      setPaymentForm(true)
      // axios.post(`${constants.baseUrl}/orders/take-order/${props.order?.id}`).then(()=> {
      //   alert("Successfully Taken Order")
      // })
    }
    if (props.order?.status == "pending") {
     setAssign(true)
    }
  }

  const fetchUsers = async () => {
    const response = await axios
      .get(`${constants.baseUrl}/users`)
      .catch((err) => {
        alert(err.response.data.message);
      });
    dispatch(setUsers(response.data.data.users));
  };

  useEffect(() => {
    fetchUsers()
  },[])
  return (
    <div class = "myDiv"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "95%",
        margin: "auto",
        gap: "80px",
      }}
    >
      {paymentForm && <PaymentForm hideModal = {()=> setPaymentForm(false)}
      orderId = {props.order?.id} balance = {props.order?.balance}/>}
      {assign && <AssignOrderToUser hideModal = {()=> setAssign(false)}
      orderId = {props.order?.id} />}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {props.order?.services?.map(service => (
   <div
   style={{
     border: "1px solid black",
     display: "flex",
     alignItems: "center",
     justifyContent: "center",
     width: "90px",
     height: "30px",
     borderRadius: "8px",
     fontWeight: "bold",
   }}
 >
   {service.type}
 </div>
          ))}
       
         
          <div
            style={{
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "90px",
              height: "30px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            00{props.order.orderNumber}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ fontSize: "25px", fontWeight: "600", margin: "0px" }}>
            {props.order.customer.name}
          </p>
          <p style={{ fontSize: "20px", margin: "0px", color: "#8B8B8B" }}>
            {props.order.customer.phone}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Button
            variant="contained"
            style={{
              color: "white",
              borderRadius: "8px",
              background: "#3245E9",
              width: "100px",
            }}
            onClick = {()=> props.back()}
          >
            Back
          </Button>
          <Button
            variant="contained"
            style={{
              color: "white",
              borderRadius: "8px",
              background: "#F2994A",
              width: "100px",
            }}
            onClick = {orderActions}
          >
            {props.order?.status == "pending" ? "assign" : 
            props.order?.status == "on-service" ? "finish" : "take" }
          </Button>
          <Button
            variant="contained"
            style={{
              color: "white",
              borderRadius: "8px",
              background: "#F2994A",
              width: "100px",
            }}
          >
            Cancel
          </Button>
        </div>
      </div>

      <div style = {{display: "flex", flexDirection: "column",
    gap: "20px"}}>
        <p style={{ fontSize: "22px", fontWeight: "700", margin: "0px" }}>
          Services
        </p>
        <div style = {{display: "flex", gap: "100px", flexWrap: "wrap"}}>
          {props.order?.services.map(service => (
            <Service service = {service}/>
          ))}
        </div>
      </div>


    </div>
  );
};

export default ListDetails;
