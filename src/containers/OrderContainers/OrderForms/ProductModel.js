import MyModal from "../../../Modal/Modal"


const ProductModel = (props) => {

    return (
        <MyModal onClose = {()=> props.hideModal()} background = "rgb(0,0,0, 0.24)"
        pwidth = "480px" left = "36%">
        <div style = {{height: "300px"}}>
            This is the product model
        </div>

        </MyModal>
    )
}

export default ProductModel