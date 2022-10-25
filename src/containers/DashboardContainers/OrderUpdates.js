import { Typography } from "@material-ui/core"

const OrderUpdates = (props) => {

    const orders = [
        {name: "Pending orders", value: 5},
        {name: "On-service orders", value: 5},
        {name: "Finished orders", value: 5},
        {name: "Taken orders", value: 5},
    ]

    return (
        <div style = {{background: "white", padding: "24px", 
        borderRadius: "9px", display: "flex", flexDirection: "column",
        gap: "8px", width: "300px"}}>
            <Typography style = {{color: "#3245E9", fontWeight: "bold"}}>
                Today
            </Typography>
            <Typography style = {{fontWeight: "500", fontSize: "22px"}}>
            New order updates
            </Typography>

            {orders.map((order, index) => (
                <div style = {{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", gap: "14px",}}>
                    <Typography style = {{ fontSize: "16px",
                color: "#575656"}}> {index + 1}. </Typography>
                    <Typography style = {{ fontSize: "16px",
                color: "#575656"}}> {order.name} </Typography>
                    </div>
                    <Typography style = {{ fontSize: "16px",
                color: "#575656"}}> {order.value} </Typography>
                </div>
            ))}


        </div>
    )
}

export default OrderUpdates