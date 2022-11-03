import { Button, FormControl, FormLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductModel from "./ProductModel";

const selectStyle = { height: "40px", color: "#B9B9B9", width: "100%" };
const ProductForm = (props) => {

  const [state, setState] = useState(1);
  const customers = useSelector((state) => state.customers.customers);
  const [customer, setCustomer] = useState();
  const [productName, setProductName] = useState()
  const [menuName, setMenuName] = useState()
  const [productModel, setProductModel] = useState(false);

  const customerHandler = (e) => {
    setCustomer(e.target.value);
    props.data({imageUrl: productName, customer: e.target.value})
  };

  console.log(productName)


  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      class="myDiv"
    >
       { productModel && <ProductModel hideModal = {()=> setProductModel(false)} 
       productName = {(name)=> {
         setProductName(name.image)
         props.data({imageUrl: name.image, customer: customer, menu: name.menu})
        setProductModel(false)
        }}

        menuStaff = {(data)=> {
          console.log(data)
          props.menuStaff(data)
        }}
        />}

      <Button
        style={{
          border: "1.5px solid #F2994A",
          borderRadius: "6px",
          width: "250px",
          height: "45px",
          fontSize: "14px",
        }}
        onClick = {()=> setProductModel(true)}
      >
        {" "}
        Add Product
      </Button>

      {props.orderType == "normal" && <FormControl style={{ width: "250px" }}>
        <TextField
        select
          style={selectStyle}
          label = "Select a customer"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={customer}
          onChange={customerHandler}
        >
          {customers?.map((customer, index) => (
            <MenuItem value={customer._id} key={index}>
              {customer.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>}
    </div>
  );
};

export default ProductForm;
