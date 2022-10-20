import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Typography } from "@material-ui/core";

const PaymentForm = (props) => {
  const arr = [
    { label: "Enter Amount", type: "number", name: "unitPrice" },
    { label: "Enter Amount", type: "number", name: "advance" },
    { label: "Enter Amount", type: "date", name: "deadline" }
  ];

  const errorStyle = { color: "red", marginLeft: "27px", fontSize: "16px" };

  const validate = (values) => {
    const errors = {};

    if (!values.unitPrice) {
      errors.unitPrice = "Field is Required";
    }
    if (!values.advance) {
      errors.advance = "Field is Required";
    }
    if (!values.deadline) {
      errors.deadline = "Field is Required";
    }
 
    return errors;
  };


  const formik = useFormik({
    initialValues: {
      unitPrice: null,
      advance: null,
      deadline: null
    },
    validate,
  });

  useEffect(()=> {
    props.data({unitPrice: formik.values.unitPrice,
    advance: formik.values.advance, deadline: formik.values.deadline})
   
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
              width: "170px",
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

export default PaymentForm;
