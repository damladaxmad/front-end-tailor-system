import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import {useSelector} from "react-redux"
import React, {useState, useEffect} from "react"

const StylesForm = (props) => {
  const styles = useSelector(state => state.styles.styles)
  const [styleData, setStyleData] = useState([])
  
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
    props.data({styles: styleData})
  }, [styleData])


  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        width: "70%",
        flexWrap: "wrap",
        margin: "0px auto",
        // justifyContent: "center",
        alignItems: "start",
        marginLeft: "180px",
      }}
      class="myDiv"
    >
      {currentStyles?.map((style) => (
        <SingleOutChecks style = {style} key = {style.id} 
        styleData = {styleData} addStyles = {(style) => addStyles(style)}
        removeStyles = {(style) => removeStyles(style)}/>
      ))}
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

export default StylesForm;
