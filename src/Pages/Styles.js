import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import {Select} from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { constants } from "../Helpers/constantsFile";
import useFetch from "../funcrions/DataFetchers";
import Table from "../utils/Table";
import Register from "../utils/Register";
import { setStyles } from "../redux/actions/stylesActions";

const Styles = () => {

  const [newEmployees, setNewEmployees] = useState(false)
  const [buttonName, setButtonName] = useState('Add New Employees')
  const [update, setUpdate] = useState(false)
  const [showCornerIcon, setShowCornerIcon] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [updatedEmployee, setUpdatedEmployee] = useState(null)
  const [del, setDel] = useState(1);
  const [assignMany, setAssignMany] = useState(false)
  const [emplyeeIds, setEmployeesIds] = useState('')
  const [state, setState] = useState("")
  const activeUser = useSelector(state => state.activeUser.activeUser)
  const columns = [
    { title: "Name", field: "name",},
    { title: "Email Type", field: "type" },
    { title: "Description", field: "description", width: "4%"}
  ]
  const fields = [
    { label: "Enter Name", type: "text", name: "name" },
    { label: "Enter Description", type: "text", name: "description" },
    { label: "Enter Type", type: "text", name: "type" },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, student) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeHandler = () => {
    setDel(state => state + 1)
  }

  const dispatch = useDispatch()
  const styles = useSelector((state) => state.styles.styles);
  dispatch(setStyles(useFetch("styles", del, "styles")))
  
  const statusArr = ["All", "Active", "Inactive"]
  const [status, setStatus] = useState(statusArr[0]);
  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1)

  const statusHandler = (e) => {
    setStatus(e.target.value)
  }

  const addEmployeeHandler = () => {
    setQuery('')
    if (buttonName == "Add New Employees"){
      setNewEmployees(true)
      setButtonName("Go To Employees")
    
      return
    } else if (buttonName == "Go To Employees") {

      setNewEmployees(false)
      setButtonName("Add New Employees") 
      setUpdate(false)
    }
  }

  const handler = (data) => { 
 
    if (data?.length > 0) {
      return data.filter(
        (std) =>
        std.name.toLowerCase().includes(query) ||
        std.type.toLowerCase().includes(query)
      );
    } else {
      return
    }  
  };

  const updateHandler = (employee) => {
    setNewEmployees(true)
    setButtonName("Go To Employees")
    setUpdate(true)
    setUpdatedEmployee(employee)
  }

  const resetFomr = () => {
    setForce(state => state + 1)
  }

  useEffect(()=> {
    setState("Loading...")
  }, [force])

  useEffect(()=> {
    if (styles?.length < 1)
    setState("No styles found!")
  }, [styles])

  useEffect(()=> {
  }, [del])

    useEffect(()=> {
    if (query != '') {
      setState("No matching employees!")
    }
  }, [query])


  const hideModal = () =>{
    setAssignMany(false)
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
   
        <h2> {newEmployees ? "Create New Employees" : "Employees"}</h2>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          onClick = {() => {
            if (activeUser.privillages.includes('Add New Employees'))
            addEmployeeHandler()
            else alert("You have no access!")
          }}
          startIcon={
            newEmployees ? <BiArrowBack
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
        <div style={{ display: "flex", gap: "20px" }}>
 
          {showCornerIcon && <BiDotsVerticalRounded style = {{
            fontSize: "24px", margin: "auto 0px",
            cursor: "pointer"
          }} onClick = {handleClick} />}
        </div>
      </div>

     <Table data={handler(styles)} 
      change = {changeHandler} 
      update = {updateHandler} 
      state = {state} columns = {columns} url = "styles"
      name = "Styles"/>
      {newEmployees && <Register update = {update}
      instance = {updatedEmployee} reset = {resetFomr}  hideModal = {()=> {
        setUpdate(false)
        setNewEmployees(false)
        setButtonName("Add New Employees")
      }}
      fields = {fields}  url = "styles"
      name = "Styles"
      change = {changeHandler} />}

    </div>
  );
};

export default Styles;