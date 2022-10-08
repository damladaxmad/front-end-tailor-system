import { Button, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import vip from "../../assets/images/vip.jpg";
import { BiDotsVerticalRounded } from "react-icons/bi";

const MenuContainer = () => {

    return (
        <div style = {{
           background: "white",
           width: "22%",
           padding: "12px",
           borderRadius: "6px",
           display: "flex",
           flexDirection: "column",
           gap: "10px"
        }}>
            <div style = {{display: 'flex', alignItems: "center", 
        justifyContent: "space-between"}}>
          <Typography style = {{fontSize: "14px", fontWeight: "600"}}>VIP MENU </Typography>
            <BiDotsVerticalRounded style = {{fontSize: "18px", cursor: "pointer"}} 
            onClick = {()=> alert("Be tolerant")}/>
            </div>
          
          <img src = {vip} style = {{width: "100%", height: "130px",
        borderRadius: "6px"}}/>

          <div style = {{display: "flex", flexDirection: "row",
        justifyContent: "space-between"}}>
            <Button style = {{border: "1px solid #F2994A", borderRadius: "6px",
        width: "45%", height: "30px"}}> View</Button>
            <Button variant="contained" style = {{background: "#3245E9", borderRadius: "6px",
        width: "45%", height: "30px"}}> ADD</Button>
          </div>


        </div>
    )
}

export default MenuContainer