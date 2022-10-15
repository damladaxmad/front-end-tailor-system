import { Button } from "@material-ui/core";
import Service from "../CustomerContainers/Service";
import "./list.css"

const ListDetails = (props) => {

    const service = {
        type: "Shaati",
        imageUrl: "1665477228067-any-name-stripes.jpg",
        sizes:  [{title: "l", value: 10},
        {title: "p", value: 9},
        {title: "m", value: 11},
        {title: "s", value: 12},
        {title: "k", value: 8}
    ],
        styles: ["gacmo gaab", "kulleeti"]
    }
  return (
    <div class = "myDiv"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "95%",
        margin: "auto",
        gap: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div
            style={{
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "90px",
              height: "30px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            Surwaal
          </div>
          <div
            style={{
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "90px",
              height: "30px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            Shaati
          </div>
          <div
            style={{
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "90px",
              height: "30px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            001
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ fontSize: "25px", fontWeight: "600", margin: "0px" }}>
            Damlad Axmad
          </p>
          <p style={{ fontSize: "20px", margin: "0px", color: "#8B8B8B" }}>
            0616549198
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Button
            variant="contained"
            style={{
              color: "white",
              borderRadius: "8px",
              background: "#3245E9",
              width: "100px",
            }}
            onClick = {()=> props.back()}
          >
            Back
          </Button>
          <Button
            variant="contained"
            style={{
              color: "white",
              borderRadius: "8px",
              background: "#F2994A",
              width: "100px",
            }}
          >
            Take
          </Button>
          <Button
            variant="contained"
            style={{
              color: "white",
              borderRadius: "8px",
              background: "#F2994A",
              width: "100px",
            }}
          >
            Cancel
          </Button>
        </div>
      </div>

      <div style = {{display: "flex", flexDirection: "column",
    gap: "20px"}}>
        <p style={{ fontSize: "22px", fontWeight: "700", margin: "0px" }}>
          Services
        </p>
        <div style = {{display: "flex", gap: "100px", flexWrap: "wrap"}}>
           <Service service = {service}/> 
           <Service service = {service}/> 
           <Service service = {service}/>
           <Service service = {service}/> 
        </div>
      </div>


    </div>
  );
};

export default ListDetails;
