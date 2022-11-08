import axios from "axios"
import { useEffect, useState } from "react"
import { constants } from "../../Helpers/constantsFile"
import MyModal from "../../Modal/Modal"
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Menu, MenuItem } from "@material-ui/core";


const ImagePortal = (props) => {

    const [image, setImage] = useState()
    const [anchorEl, setAnchorEl] = useState(null);
    const [imagePortal, setImagePortal] = useState(false)
    const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

    useEffect(()=> {
        axios.get(`${constants.baseUrl}/files/${props.product}`,
        {responseType: 'blob'}).then((res)=> {
          setImage(URL.createObjectURL(res.data))
        })
      }, [props.product])

      const optionHadler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };

      const deleteImage = (product) => {
        let remainedProducts = []
        props.whichMenu.menuProducts?.map(m => {
          if (m != product) remainedProducts.push(m)
        })
        axios.patch(`${constants.baseUrl}/menus/${props.whichMenu.id}`, {menuProducts: remainedProducts}).then(res => {
          alert("Successfully Deleted Image.")
          props.resetPics()
          props.hideModal()
        }).catch(err => {
          alert(err.response?.data?.message)
        })
      }

      const moveImage = (product) => {
        let remainedProducts = []
        props.whichMenu.menuProducts?.map(m => {
          if (m != product) remainedProducts.push(m)
        })
        axios.patch(`${constants.baseUrl}/menus/${props.whichMenu.id}`, {menuProducts: remainedProducts}).then(res => {
          // alert("Successfully Moved Image.")
          props.resetPics()
          props.hideModal()
        }).catch(err => {
          alert(err.response?.data?.message)
        })
        axios.patch(`${constants.baseUrl}/menus/635a1d208b514c19dcbc3616`, {menuProducts: remainedProducts}).then(res => {
          alert("Successfully Moved Image.")
          props.resetPics()
          props.hideModal()
        }).catch(err => {
          alert(err.response?.data?.message)
        })
      }

    return (
        <MyModal onClose = {()=> props.hideModal()} left = "36%">
            <div style = {{display: "flex", flexDirection: "column",
        alignItems: "end", gap: "15px"}}>
             <BiDotsVerticalRounded style = {{fontSize: "18px", cursor: "pointer"}} 
            onClick = {optionHadler}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
              />
               <img src = {image} style = {{width: "400px", height: "300px",
        borderRadius: "6px", cursor: "pointer"}}
       />

<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {
          handleClose()
          deleteImage(props.product)
        } }>Delete Image</MenuItem>
        <MenuItem onClick={() => {
          handleClose()
          moveImage(props.product)
        } }>Move Image</MenuItem>
      </Menu>
      </div>
        </MyModal>
    )
}

export default ImagePortal