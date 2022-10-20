import MyModal from "../../../Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { constants } from "../../../Helpers/constantsFile";

const ProductModel = (props) => {
  const menus = useSelector((state) => state.menus.menus);
  const [menu, setMenu] = useState(menus[0]?._id);
  const [productModel, setProdcutModel] = useState(false);
  const [menuProdcuts, setMenuProducts] = useState();
  const menuHandler = (e) => {
    setMenu(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${constants.baseUrl}/menus/${menu}`)
      .then((res) => setMenuProducts(res.data.data.menu.menuProducts));
  }, [menu]);

  return (
    <MyModal
      onClose={() => props.hideModal()}
      background="rgb(0,0,0, 0.24)"
      pwidth="480px"
      left="36%"
    >
      <div
        style={{
          height: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          width: "480px",
          padding: "0px 10px",
          overflowY: "scroll",
          gap: "15px",
        }}
      >
        <FormControl style={{ width: "250px" }}>
          <Select
            style={{ width: "200px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={menu}
            onChange={menuHandler}
          >
            {menus?.map((menu, index) => (
              <MenuItem value={menu._id} key={index}>
                {menu.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div
          style={{
            height: "200px",
            overFlowY: "scroll",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          {menuProdcuts?.map((image) => (
            <ProductImages
              image={image}
              productName={(name) => {
                props.productName(name);
              }}
            />
          ))}
        </div>
      </div>
    </MyModal>
  );
};

const ProductImages = (props) => {
  const [image, setImage] = useState();

  useEffect(() => {
    axios
      .get(`${constants.baseUrl}/files/${props.image}`, {
        responseType: "blob",
      })
      .then((res) => {
        setImage(URL.createObjectURL(res.data));
      });
  }, [props.image]);

  return (
    <img
      src={image}
      style={{
        width: "32%",
        height: "100px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
      onClick={() => {
        props.productName(props.image);
      }}
    />
  );
};

export default ProductModel;
