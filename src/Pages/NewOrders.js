import { Typography } from "@material-ui/core"
import OrderLists from "../containers/OrderContainers/OrderLIsts"

const NewOrders = () => {


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
        <Typography style = {{fontWeight: "600",
    fontSize: '25px'}}> New Order </Typography>
        <OrderLists />
        
        </div>
    )
}

export default NewOrders