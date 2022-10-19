import { Typography } from "@material-ui/core"


const SizesForm = () => {

    const sizes = [
        "L", "P", "M", "S", "K"
    ]

    return (
        <div style = {{display: "flex", gap: "20px"}}
        class = "myDiv">
            {sizes.map(size => (
                <div style = {{display: "flex", flexDirection: "column",
                gap: "10px"}}>
                    <Typography style = {{fontWeight: "600",
        fontSize: "14px", marginLeft: "3px"}}> {size} :</Typography>
        <input
          type="number"
          style={{
            width: "70px",
            height: "45px",
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

export default SizesForm