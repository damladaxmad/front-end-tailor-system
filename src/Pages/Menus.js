import React, { useState, useEffect, useReducer } from "react";
import { Button } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import { FormControl, MenuItem, Menu } from "@material-ui/core";
import {Select, Typography} from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { constants } from "../Helpers/constantsFile";
import useFetch from "../funcrions/DataFetchers";
import MenuContainer from "../containers/MenusContainers/MenuContainer";


const Menus = () => {

  const [newMenus, setNewMenus] = useState(false)
  const [buttonName, setButtonName] = useState('Add New Menus')
  const [update, setUpdate] = useState(false)
  const [showCornerIcon, setShowCornerIcon] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [updatedMenu, setUpdatedMenu] = useState(null)
  const [del, setDel] = useState(1);
  const [menuIds, setMenusIds] = useState('')
  const [state, setState] = useState("")
  const activeUser = useSelector(state => state.activeUser.activeUser)

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

  
  const statusArr = ["All", "Active", "Inactive"]
  const [status, setStatus] = useState(statusArr[0]);
  const [query, setQuery] = useState("");
  const [force, setForce] = useState(1)

  const statusHandler = (e) => {
    setStatus(e.target.value)
  }

  const addEmployeeHandler = () => {
    setQuery('')
    if (buttonName == "Add New Menus"){
      setNewMenus(true)
      setButtonName("Go To Menus")
      return
    } else if (buttonName == "Go To Menus") {
      setNewMenus(false)
      setButtonName("Add New Menus") 
      setUpdate(false)
    }
   
    
  }

  const handler = (data) => { 
 
    if (data?.length > 0) {
      return data.filter(
        (std) =>
        std.name.toLowerCase().includes(query)
      );
    } else {
      return
    }  
  };

 
  let menusIds = '';
  const selectHandler = (data) => {
    data.map((d)=> {
      menusIds += d._id
      menusIds += ','
    })
    const slicedMenusIds = menusIds.slice(0, -1)
    setMenusIds(slicedMenusIds)

    setShowCornerIcon(true)
    if (data.length < 1) {
      setShowCornerIcon(false)
    }
  }

  const updateHandler = (menu) => {
    setNewMenus(true)
    setButtonName("Go To Menus")
    setUpdate(true)
    setUpdatedMenu(menu)
  }

  const resetFomr = () => {
    setForce(state => state + 1)
  }

  useEffect(()=> {
    setState("Loading...")
  }, [force])



  useEffect(()=> {
  }, [del])

    useEffect(()=> {
    if (query != '') {
      setState("No matching menus!")
    }
  }, [query])

  const showProfileHandler = () => {
    setButtonName("Go To Menus")
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
   
        <Typography style = {{fontWeight: "600",
    fontSize: '25px'}}> {newMenus ? "Create New Menus" : "Menus"}</Typography>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#2F49D1",
            color: "white",
          }}
          onClick = {() => {
            if (activeUser.privillages.includes('Add New Menus'))
            addEmployeeHandler()
            else alert("You have no access!")
          }}
          startIcon={
            newMenus  ? <BiArrowBack
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

      <div style = {{
            width: "95%",
          margin: "40px auto",
          display: "flex",
          gap: "39px",
          flexWrap: "wrap"
        }}>
          
      <MenuContainer/>
      <MenuContainer/>
      <MenuContainer/>
      <MenuContainer/>

      </div>
  

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem >Delete Employees</MenuItem>
      </Menu>

    </div>
  );
};

export default Menus;
