import React, { useState, useEffect, useReducer } from "react"
import {Tabs, Tab, Box} from "@mui/material"
import Users from "../containers/AdminstrationContainers/UsersContainer/Users"
import Access from "../containers/AdminstrationContainers/AccessContainers/Access";
import { useDispatch, useSelector } from "react-redux";
import CompanyInfo from "../containers/AdminstrationContainers/CompanyInfoContainer/CompanyInfo";
import ImportProducts from "../containers/AdminstrationContainers/ImportContainers/ImportProducts";
import ListOptions from "../containers/ListContainers/ListOptions";
import { Details } from "@material-ui/icons";
import ListDetails from "../containers/ListContainers/ListDetails";
import { setOrders } from "../redux/actions/ordersActions";
import useFetch from "../funcrions/DataFetchers";

const Lists = () => {

  const statusArr = ["All", "Active", "Inactive"]
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const orders = useSelector(state => state.orders.orders)

  const [value, setValue] = React.useState("pending");
  const [details, setDetails] = useState(false)
  const dispatch = useDispatch()
  dispatch(setOrders(useFetch("orders", value, "orders")))
  console.log(orders)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const filterer = (data, type) => { 
 
    if (data?.length > 0) {
      return data.filter(
        (std) =>
        std.status == type
      );
    } else {
      return
    }  
  };
  
  return (
    <div
    style={{
      height: "100%",
      width: "100%",
      margin: "0px auto",
      display: "flex",
      gap: "0px",
      flexDirection: "column",
    }}
  >
    {!details && <div style = {{display: "flex", alignItems: "center",
    width: "95%", margin: "auto"}}>
        
     <Box sx={{ width: "95%", margin: "auto" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="black"
            indicatorColor="primary"
            aria-label="secondary tabs example"
            disableFocusRipple = {true}
          >
            
       
          {activeUser.privillages?.includes("Users") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="pending" label="Pending"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages.includes("Access") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="on-service" label="On Service"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages?.includes("Company Info") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="finished" label="Finished"
            style={{ fontSize: "16px", fontWeight: "700" }} />}

          {activeUser.privillages?.includes("Import Products") && <Tab 
            disableFocusRipple = {true}
            disableRipple = {true}
            value="importProducts" label="Import Products"
            style={{ fontSize: "16px", fontWeight: "700" }} />}
          </Tabs>
        </Box>
        <input
          type="text"
          placeholder="Search"
          style={{
            width: "500px",
            height: "40px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "white",
            border: "none",
          }}
        //   onChange={(e) => setQuery(e.target.value)}
        />
        </div>}

        {details && <ListDetails back = {()=> setDetails(false)} />}
        {(value == "pending" && !details) && <ListOptions orders = {filterer(orders, "pending")}
        details = {()=> setDetails(true)}/>}
        {(value == "on-service" && !details) && <ListOptions orders = {filterer(orders, "on-service")}
        details = {()=> setDetails(true)}/>}
   
    </div>
  );
};

export default Lists;
