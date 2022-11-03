import { Menu, MenuItem } from "@material-ui/core"
import axios from "axios"
import { useEffect, useState } from "react"
import { constants } from "../../Helpers/constantsFile"



const ViewProducts = (props) => {
    const [image, setImage] = useState()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

    const updateMenu = (product) => {
      let remainedProducts = []
      props.whichMenu.menuProducts?.map(m => {
        if (m != product) remainedProducts.push(m)
      })
      axios.patch(`${constants.baseUrl}/menus/${props.whichMenu.id}`, {menuProducts: remainedProducts}).then(res => {
        alert("Successfully Deleted Image.")
        props.resetPics()
      }).catch(err => {
        alert(err.response?.data?.message)
      })
    }
  
    useEffect(()=> {
      axios.get(`${constants.baseUrl}/files/${props.product}`,
      {responseType: 'blob'}).then((res)=> {
        setImage(URL.createObjectURL(res.data))
      })
    }, [props.product])

    const optionHadler = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  

    return (
      <>
        <img src = {image} style = {{width: "20%", height: "130px",
        borderRadius: "6px", cursor: "pointer"}}
        onClick = {optionHadler}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}/>

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
          updateMenu(props.product)
        } }>Delete Image</MenuItem>
      </Menu>
      </>
    )

}


export default ViewProducts