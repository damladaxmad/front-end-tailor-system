import axios from "axios"
import { useEffect, useState } from "react"
import { constants } from "../../Helpers/constantsFile"



const ViewProducts = (props) => {
    const [image, setImage] = useState()
  
    useEffect(()=> {
      axios.get(`${constants.baseUrl}/files/${props.product}`,
      {responseType: 'blob'}).then((res)=> {
        setImage(URL.createObjectURL(res.data))
      })
    }, [])
  

    return (
        <img src = {image} style = {{width: "20%", height: "130px",
        borderRadius: "6px", cursor: "pointer"}}
        onClick = {()=> props.getProduct(props.product)}/>
    )

}


export default ViewProducts