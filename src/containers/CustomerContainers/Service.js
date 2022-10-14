import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios from "axios";
import { constants } from "../../Helpers/constantsFile";
const Service = (props) => {
  const [image, setImage] = useState();

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
      style={{
        width: "26%",
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
        <Typography> 2022/10/14</Typography>
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

        <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
          {props.service.styles.map((style) => (
            <p
              style={{
                background: "#F0F2FA",
                padding: "3px",
                margin: "0px",
                borderRadius: "12px",
              }}
            >
              {" "}
              {style}
            </p>
          ))}
        </div>
      </div>

      <div>
        <Typography style={{ fontWeight: "600", fontSize: "14px" }}>
          {" "}
          Sizes:
        </Typography>

        <div style={{ display: "flex", gap: "35px", marginTop: "10px" }}>
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
