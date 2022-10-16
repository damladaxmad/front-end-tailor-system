import { Button } from "@material-ui/core";
import axios from "axios";
import { constants } from "../../Helpers/constantsFile";
import Service from "../CustomerContainers/Service";
import "./list.css"

const ListDetails = (props) => {

  console.log(props.order)

  const orderActions = () => {
    if (props.order?.status == "on-service") {
      axios.post(`${constants.baseUrl}/orders/finish-order/${props.order?.id}`).then(()=> {
        alert("Successfully Finished Order")
      })
    }
    if (props.order?.status == "finished") {
      axios.post(`${constants.baseUrl}/orders/take-order/${props.order?.id}`).then(()=> {
        alert("Successfully Taken Order")
      })
    }
    if (props.order?.status == "pending") {
      axios.post(`${constants.baseUrl}/orders/assign-order-to-user/${props.order?.id}/63483a68435b04089c7de7d3`).then(()=> {
        alert("Successfully Assigned Order To User")
      })
    }
  }

    const service = {
        type: "Shaati",
        imageUrl: "1665477228067-any-name-stripes.jpg",
        sizes:  [{title: "l", value: 10},
        {title: "p", value: 9},
        {title: "m", value: 11},
        {title: "s", value: 12},
        {title: "k", value: 8}
    ],
        styles: ["gacmo gaab", "kulleeti"]
    }
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
