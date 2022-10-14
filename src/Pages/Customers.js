import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import {Select} from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { setEmployees } from "../redux/actions/employeesActions";
import { constants } from "../Helpers/constantsFile";
import useFetch from "../funcrions/DataFetchers";
import Table from "../utils/Table";
import Register from "../utils/Register";
import { setCustomers } from "../redux/actions/customersActions";
import CustomerOrders from "../containers/CustomerContainers/CustomerOrders";

const Customers = () => {

  const [newCustomers, setNewCustomers] = useState(false)
  const [buttonName, setButtonName] = useState('Add New Customers')
  const [update, setUpdate] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [updatedCustomer, setUpdatedCustomer] = useState(null)
  const [del, setDel] = useState(1);
  const [showOrders, setShowOrders] = useState(false)
  const [customerInfo, setCustomerInfo] = useState()
  const [state, setState] = useState("")
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const columns = [
    { title: "ID", field: "customerId",},
    { title: "Full Name", field: "name", width: "4%"},
    { title: "Email Address", field: "phone" },
    { title: "Balance", field: "balance" },
  ]
  const fields = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Phone", type: "text", name: "phone" }
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, customer) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeHandler = () => {
    setDel(state => state + 1)
  }

  const dispatch = useDispatch()
  const customers = useSelector((state) => state.customers.customers);
  dispatch(setCustomers(useFetch("customers", del, "customers")))
  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1)

  const addCustomerHandler = () => {
    setQuery('')
    if (buttonName == "Add New Customers"){
      setNewCustomers(true)
      setButtonName("Go To Customers")
      setShowOrders(false)
      return
    } else if (buttonName == "Go To Customers") {
      setShowOrders(false)
      setNewCustomers(false)
      setButtonName("Add New Customers") 
      setUpdate(false)
    }
   
    
  }

  const handler = (data) => { 
 
    if (data?.length > 0) {
      return data.filter(
        (std) =>
        std.name.toLowerCase().includes(query) ||
        std.phone.toLowerCase().includes(query)
      );
    } else {
      return
    }  
  };

  const updateHandler = (customer) => {
    setNewCustomers(true)
    setButtonName("Go To Customers")
    setUpdate(true)
    setUpdatedCustomer(customer)
  }

  const resetFomr = () => {
    setForce(state => state + 1)
  }

  useEffect(()=> {
    setState("Loading...")
  }, [force])

  useEffect(()=> {
    if (customers?.length < 1)
    setState("No customers found!")
  }, [customers])

  useEffect(()=> {
  }, [del])

    useEffect(()=> {
    if (query != '') {
      setState("No matching customers!")
    }
  }, [query])

  const showOrdersHandler = (customer) => {
    setShowOrders(true)
    setButtonName("Go To Customers")
    setCustomerInfo(customer)
  }

  const hideModal = () =>{
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        margin: "0px auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#EFF0F6",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "95%",
          margin: "auto",
        }}
      >
   
        <h2> {newCustomers ? "Create New Customers" : 
        showOrders ? "Customer Details" : "Customers"}</h2>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          onClick = {() => {
            if (activeUser.privillages.includes('Add New Customers'))
            addCustomerHandler()
            else alert("You have no access!")
          }}
          startIcon={
            newCustomers || showOrders ? <BiArrowBack
              style={{
                color: "white",
              }}
            /> : <MdAdd
            style={{
              color: "white",
            }}
          />
          }
        >
          {buttonName}
        </Button>
      </div>
      {!showOrders &&
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          padding: "20px",
          background: "white",
          width: "95.3%",
          margin: "auto",
          marginTop: "20px",
          borderRadius: "8px 8px 0px 0px",
        }}
      >
        <input
          type="text"
          placeholder="Search"
          style={{
            width: "400px",
            height: "40px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "8px",
            background: "#EFF0F6",
            border: "none",
          }}
          onChange={(e) => setQuery(e.target.value)}
        />
    
      </div>}

      {showOrders && <CustomerOrders data = {customerInfo}/>}
      {!showOrders && <Table data={handler(customers)} 
      change = {changeHandler} 
      update = {updateHandler} showOrders = {(customer)=> showOrdersHandler(customer)}
      state = {state} columns = {columns} url = "customers"
      name = "Customer"/>}
      {newCustomers && <Register update = {update}
      instance = {updatedCustomer} reset = {resetFomr}  hideModal = {()=> {
        setUpdate(false)
        setNewCustomers(false)
        setButtonName("Add New Customers")
      }}
      fields = {fields}  url = "customers"
      name = "Customer"
      change = {changeHandler} />}

    </div>
  );
};

export default Customers;
