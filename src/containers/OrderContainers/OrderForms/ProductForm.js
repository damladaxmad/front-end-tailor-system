import { Button, FormControl, MenuItem, Select } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import ProductModel from "./ProductModel";

const selectStyle = { height: "40px", color: "#B9B9B9", width: "100%" };
const ProductForm = (props) => {
  const [state, setState] = useState(1);
  const users = useSelector((state) => state.users.users);
  const [productModel, setProdcutModel] = useState(false);
  const [user, setUser] = useState(users[0]?._id);
  const userHandler = (e) => {
    setUser(e.target.value);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      class="myDiv"
    >
       { productModel && <ProductModel hideModal = {()=> setProdcutModel(false)} />}
      <Button
        style={{
          border: "1.5px solid #F2994A",
          borderRadius: "6px",
          width: "250px",
          height: "45px",
          fontSize: "14px",
        }}
        onClick = {()=> setProdcutModel(true)}
      >
        {" "}
        Add Product
      </Button>

      <FormControl style={{ width: "250px" }}>
        <Select
          style={selectStyle}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={user}
          onChange={userHandler}
        >
          {users?.map((user, index) => (
            <MenuItem value={user._id} key={index}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ProductForm;
