import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Typography } from "@material-ui/core";

const SizesForm = (props) => {
  const arr = [
    { label: "Enter Amount", type: "number", name: "l" },
    { label: "Enter Amount", type: "number", name: "p" },
    { label: "Enter Amount", type: "number", name: "m" },
    { label: "Enter Amount", type: "number", name: "s" },
    { label: "Enter Amount", type: "number", name: "k" },
  ];

  const errorStyle = { color: "red", marginLeft: "27px", fontSize: "16px" };

  const validate = (values) => {
    const errors = {};

    if (!values.l) {
      errors.l = "Field is Required";
    }
    if (!values.p) {
      errors.p = "Field is Required";
    }
    if (!values.m) {
      errors.m = "Field is Required";
    }
    if (!values.s) {
      errors.s = "Field is Required";
    }
    if (!values.k) {
      errors.k = "Field is Required";
    }
    return errors;
  };


  const formik = useFormik({
    initialValues: {
      l: null,
      p: null,
      m: null,
      s: null,
      k: null,
    },
    validate,
  });

  useEffect(()=> {
    let sizeData = []
    const arrayOfObj = Object.entries(formik.values).map((e) => ( { [e[0]]: e[1] } ));
    props.data({sizes: arrayOfObj})
    arrayOfObj.map(obj => {
        sizeData.push(obj)
    })
  }, [formik.values])

//  useEffect(()=> {
//     return () => {
//         props.data({sizes: formik.values})
//       };
//  }, [])
  
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
