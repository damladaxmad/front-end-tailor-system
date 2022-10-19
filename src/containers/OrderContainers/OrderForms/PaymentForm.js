import { Typography } from "@material-ui/core"


const PaymentForm = () => {

    const sizes = [
        "Qiimaha", "Carbuunka", "Waqtiga"
    ]

    return (
        <div style={{
            display: "flex",
            gap: "15px",
            width: "70%",
            flexWrap: "wrap",
            margin: "0px auto",
            alignItems: "start",
            marginLeft: "160px",
          }}
        class = "myDiv">
            {sizes.map(size => (
                <div style = {{display: "flex", flexDirection: "column",
                gap: "10px"}}>
                    <Typography style = {{fontWeight: "600",
        fontSize: "14px", marginLeft: "3px"}}> {size} :</Typography>
        <input
          type= {size == "Waqtiga" ?  "date" : "number"}
          style={{
            width: "200px",
            height: "40px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "#EFF0F6",
            border: "none",
          }}
        //   onChange={(e) => setName(e.target.value)}
        />
                </div>
            ))}
        </div>
    )
}

export default PaymentForm