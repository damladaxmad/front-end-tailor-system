import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import {useSelector} from "react-redux"
import React, {useState} from "react"

const StylesForm = (props) => {
  const styles = useSelector(state => state.styles.styles)
  const [styleData, setStyleData] = useState([])
  const [check, setCheck] = useState(false)

  const changeHandler = (data) => {
    setCheck(state => !state)
  }


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
      {styles?.map((style) => (
        <FormGroup style={{ width: "38%" }} key = {style.id}>
          <FormControlLabel
            control={
              <Checkbox
                style={{ padding: "10px 25px" }}
                value={style.name}
                color="primary"
                checked={check}
                  onChange={() => changeHandler(style.name)}
              />
            }
            label={style.name}
          />
        </FormGroup>
      ))}
    </div>
  );
};

export default StylesForm;
