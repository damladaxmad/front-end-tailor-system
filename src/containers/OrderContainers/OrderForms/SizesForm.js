import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { formatMs, Typography } from "@material-ui/core";
import { constants } from "../../../Helpers/constantsFile";
import axios from "axios";

const SizesForm = (props) => {

  const arr = props.type == "Surwaal" ?  
   [
    { label: "Enter Amount", type: "number", name: "l" },
    { label: "Enter Amount", type: "number", name: "p" },
    { label: "Enter Amount", type: "number", name: "t" },
    { label: "Enter Amount", type: "number", name: "c" },
    { label: "Enter Amount", type: "number", name: "k" },
  ] :
  [
    { label: "Enter Amount", type: "number", name: "l" },
    { label: "Enter Amount", type: "number", name: "p" },
    { label: "Enter Amount", type: "number", name: "m" },
    { label: "Enter Amount", type: "number", name: "s" },
    { label: "Enter Amount", type: "number", name: "k" },
  ];

  const [orders, setOrders] = useState()
  

  useEffect(() => {
    axios
      .get(`${constants.baseUrl}/customers/orders/${props.customer}`)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        alert("failed to fetch");
      });
  }, [props.customer]);

  let services = [];
  orders?.map((order) => {
    Array.prototype.push.apply(services, order.services);
  });

  let olderSizes = null
  services.map(service => {
    if (service.type == props.type) {
      olderSizes = service.sizes
    }
  })

  let olderObject = {}
  olderSizes?.map(size => {
    olderObject[size.title] = size.value
  })

  const errorStyle = { color: "red", marginLeft: "27px", fontSize: "16px" };

  console.log(olderObject)


  const validate = (values) => {
    const errors = {};

    if (!values.l) {
      errors.l = "Field is Required";
    }
    if (!values.p) {
      errors.p = "Field is Required";
    }
    if (props.type != "Surwaal" && !values.m) {
      errors.m = "Field is Required";
    }
    if (props.type != "Surwaal" && !values.s) {
      errors.s = "Field is Required";
    }
    if (props.type == "Surwaal" && !values.t) {
      errors.t = "Field is Required";
    }
    if (props.type == "Surwaal" && !values.c) {
      errors.c = "Field is Required";
    }
    if (!values.k) {
      errors.k = "Field is Required";
    }
    return errors;
  };

 const init1 = {
  l: null,
  p: null,
  m: null,
  s: null,
  k: null,
}
const init2 = {
  l: null,
  p: null,
  t: null,
  c: null,
  k: null,
}
  const formik = useFormik({
    initialValues:  olderObject, 
    // ? olderObject : props.type == "Surwaal" ? init2 : init1,
    validate,
    enableReintialize: true
  });

  useEffect(()=> {
    let sizeData = []
    const arrayOfObj = Object.entries(formik.values).map((e) => ( { [e[0]]: e[1] } ));
    arrayOfObj.map((obj, index) => {
      sizeData.push({title: Object.keys(obj)[0], value: Object.values(obj)[0]})
    })
    
    props.data({sizes: sizeData})
  }, [formik.values])

 useEffect(()=> {
   formik.initialValues = olderObject
   console.log("re initializing..")
 }, [olderObject])
  
  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        justifyContent: "center",
        flexDirection: "row",
        width: "100%",
        padding: "20px 0px",
        alignItems: "center",
      }}
    >
      {arr.map((a, index) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Typography
            style={{ fontWeight: "600", fontSize: "14px", marginLeft: "3px" }}
          >
            {" "}
            {a.name.toUpperCase()}:
          </Typography>
          <input
            id={a.name}
            name={a.name}
            type={a.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[a.name]}
            style={{
              width: "70px",
              height: "45px",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              background: "#EFF0F6",
              border: "none",
            }}
            key={index}
          />
          {formik.touched[a.name] && formik.errors[a.name] ? (
            <div style={{ color: "red" }}>{formik.errors[a.name]}</div>
          ) : null}
        </div>
      ))}
    </form>
  );
};

export default SizesForm;
