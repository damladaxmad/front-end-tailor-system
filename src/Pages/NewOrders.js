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
        <h2> New Orders</h2>

        <OrderLists/>
        
        </div>
    )
}

export default NewOrders