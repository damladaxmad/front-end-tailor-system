import { Button, Typography } from "@material-ui/core"
import image from "../../assets/images/vip.jpg"

const ListOptions = (props) => {

    console.log(props.orders)
    
    return (
        <div style = {{ width: "92%",
        margin: "30px auto",
        display: "flex",
        gap: "35px",
        flexWrap: "wrap"}}>
          {!props.orders ? <p> Loading...</p> : 
          props.orders?.length < 1 ? <p> No orders to display</p> : null  }
            {props.orders?.map(order => (
                <ListOrder details = {(order)=> {
                  console.log(order)
                  props.details(order)
                }} order = {order} />
            ))}
        </div>
    )
}

const ListOrder = (props) => {

    return (
        <div class = "myDiv"
        style={{
            width: "31%",
            background: "white",
            display: "flex",
            flexDirection: "row",
            borderRadius: "8px",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "15px",
            gap: "10px",
            cursor: "pointer"
          }}
          onClick = {()=> props.details(props.order)}>

            <div style={{display: "flex", gap: "14px", alignItems: "center"}}>
     
        <p style = {{fontSize: "18px", fontWeight: "600",
        margin: "0px", color: "#ABA9A9",}}> 0{props.order.orderNumber}</p>
        
        <div>
          <p style = {{fontSize: "16px", fontWeight: "bold",
        margin: "0px"}}> {props.order.name}</p>
          <p style = {{fontSize: "14px",
        margin: "0px", color: "#8B8B8B"}}> {props.order.customer.name}</p>
        </div>

        </div>
        
        <p style = {{fontSize: "18px", fontWeight: "bold",
        margin: "0px", color: "blue", cursor: "pointer"}} 
       > details</p>
            
        </div>

    )
}

export default ListOptions