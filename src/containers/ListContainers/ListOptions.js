import { Button, Typography } from "@material-ui/core"
import image from "../../assets/images/vip.jpg"

const ListOptions = (props) => {

    console.log(props.orders)


  const arr = [1, 2, 3, 4,  10]

    return (
        <div style = {{ width: "95%",
        margin: "30px auto",
        display: "flex",
        gap: "35px",
        flexWrap: "wrap"}}>
            {props.orders?.map(order => (
                <ListOrder details = {()=> props.details()} />
            ))}
        </div>
    )
}

const ListOrder = (props) => {

    return (
        <div style={{
            width: "30%",
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
          onClick = {()=> props.details()}>

            <div style={{display: "flex", gap: "14px", alignItems: "center"}}>
        {/* <div style = {{background: "blue", padding: "10px", color: "white",
    borderRadius: "6px"}}>
Late
        </div> */}
        <p style = {{fontSize: "18px", fontWeight: "600",
        margin: "0px", color: "#ABA9A9",}}> 001</p>
        
        <div>
          <p style = {{fontSize: "16px", fontWeight: "bold",
        margin: "0px"}}> Shaati, Surwaal</p>
          <p style = {{fontSize: "14px",
        margin: "0px", color: "#8B8B8B"}}> Damlad Axmad</p>
        </div>

        </div>
        
        <p style = {{fontSize: "18px", fontWeight: "bold",
        margin: "0px", color: "blue", cursor: "pointer"}} 
       > details</p>
            
        </div>

    )
}

export default ListOptions