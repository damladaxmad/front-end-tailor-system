import { Checkbox, FormControlLabel, FormGroup, Typography } from "@material-ui/core";
import {useSelector} from "react-redux"
import React, {useState, useEffect} from "react"

const CustomStyles = (props) => {
  const styles = useSelector(state => state.styles.styles)
  const [styleData, setStyleData] = useState([])
  const [unitPrice, setUnitPrice] = useState()

  const changeHandler = (e) => {
    setUnitPrice(e.target.value)
  }
  
  let currentStyles = []
  styles.map(style => {
    if (style.type == props.type)
    currentStyles.push(style)
  })

  const addStyles = (style) => {
    setStyleData([...styleData, style]);
  };

  const removeStyles = (style) => {
    setStyleData((arr) => arr.filter((el) => el !== style));
  };

  useEffect(()=> {
    props.data({styles: styleData, unitPrice: unitPrice})
  }, [styleData, unitPrice])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "70%",
        flexWrap: "wrap",
        margin: "0px auto",
        // justifyContent: "center",
        justifyContent: "center",
        marginLeft: "180px",
      }}
      class="myDiv"
    >
        <div style = {{display: "flex", width: "100%"}}>
      {currentStyles?.map((style) => (
        <SingleOutChecks style = {style} key = {style.id} 
        styleData = {styleData} addStyles = {(style) => addStyles(style)}
        removeStyles = {(style) => removeStyles(style)}/>
      ))}
      </div>

      <div style={{display: "flex", gap: "10px", flexDirection: "column",
    width: "100%", marginLeft: "15px"}}>
      <Typography
            style={{ fontWeight: "600", fontSize: "14px", marginLeft: "3px" }}
          >
            UnitPrice:
          </Typography>
      <input
            onChange={changeHandler}
            style={{
              width: "170px",
              height: "45px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "#EFF0F6",
              border: "none",
            }}
          />
          </div>
    </div>
  );
};


const SingleOutChecks = (props) => {

  const [check, setCheck] = useState(false)

  const changeHandler = (data) => {
    if (!props.styleData.includes(data)){
      props.addStyles(data)
    }
    if (props.styleData.includes(data)){
      props.removeStyles(data)
    }
    setCheck(state => !state)
  }

  return (
        <FormGroup style={{ width: "38%" }} >
          <FormControlLabel
            control={
              <Checkbox
                style={{ padding: "10px 25px" }}
                value={props.style.name}
                color="primary"
                checked={check}
                  onChange={() => changeHandler(props.style.name)}
              />
            }
            label={props.style.name}
          />
        </FormGroup>
  )
}

export default CustomStyles;
