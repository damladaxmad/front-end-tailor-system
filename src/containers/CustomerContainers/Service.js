import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { constants } from "../../Helpers/constantsFile";
import moment from "moment/moment";

const Service = (props) => {
  const [image, setImage] = useState();
  console.log(props.deadline)

  useEffect(() => {
    axios
      .get(`${constants.baseUrl}/files/${props.service.imageUrl}`, {
        responseType: "blob",
      })
      .then((res) => {
        setImage(URL.createObjectURL(res.data));
      });
  }, []);

  console.log(props.service);

  return (
    <div
    class = "myDiv"
      style={{
        width: "250px",
        background: "white",
        display: "flex",
        flexDirection: "column",
        borderRadius: "8px",
        padding: "10px",
        gap: "15px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography style={{ color: "#3245E9", fontWeight: "600" }}>
          {" "}
          {props.service.type}
        </Typography>
        {/* <Typography> {moment(props.deadline).format("YYYY-MM-DD")}</Typography> */}
        <Typography> {constants.moneySign}{props.service.unitPrice} / {props.service.quantity}</Typography>
      </div>

      <img
        src={image}
        style={{ width: "100%", height: "150px", borderRadius: "8px" }}
      />

      <div>
        <Typography style={{ fontWeight: "600", fontSize: "14px" }}>
          {" "}
          Styles:
        </Typography>

        <div style={{ display: "flex", gap: "12px", marginTop: "10px",
      flexWrap: "wrap" }}>
          {props.service.styles.map((style) => (
            <div style = {{background: "#F0F2FA",
            borderRadius: "6px", padding: "6px"}}>
            <p
              style={{
                margin: "0px",
                fontSize: "13px",
              }}
            >
              {style}
            </p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Typography style={{ fontWeight: "600", fontSize: "14px" }}>
          {" "}
          Sizes:
        </Typography>

        <div style={{ display: "flex", gap: "35px", marginTop: "10px",
      flexWrap: "wrap" }}>
          {props.service.sizes.map((size) => (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px",
            flexWrap: "wrap" }}
            >
              <Typography style={{ fontWeight: "500" }}>
                {size.title.toUpperCase()}
              </Typography>
              <Typography> {size.value}</Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
