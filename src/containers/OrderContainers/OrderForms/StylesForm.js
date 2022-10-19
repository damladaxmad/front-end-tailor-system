import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";

const StylesForm = () => {
  const styles = [
    "Gulees dahabi",
    "Jeeb weyn",
    "Kulleeti La'aaan",
    "Gacmo gaab",
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        width: "70%",
        flexWrap: "wrap",
        margin: "0px auto",
        justifyContent: "center",
        alignItems: "start",
        marginLeft: "130px",
      }}
      class="myDiv"
    >
      {styles.map((style) => (
        <FormGroup style={{ width: "38%" }}>
          <FormControlLabel
            control={
              <Checkbox
                style={{ padding: "10px 25px" }}
                value={style}
                color="primary"
                checked={false}
                //   onChange={() => accessCheckHanlder(props.value)}
              />
            }
            label={style}
          />
        </FormGroup>
      ))}
    </div>
  );
};

export default StylesForm;
