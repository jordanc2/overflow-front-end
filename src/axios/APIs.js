import axios from "axios";

//GET all products
export const fetchProduct = () => {
    axios
        .get('insertAPI')
        .then(res => 
            (console.log(res.data))
            ) 
        .catch(err => 
           (console.log(err))
            )
};

//ADD a product
export const addProduct = (newProduct ) => {
    axios
        .post('insertAPI', newProduct)
        .then(response => {})
        .catch(err => console.log(err));
};

//EDIT a product
export const editProduct = (productId) =>  {
    axios
        .put(`InsertAPI${productId}`)
        .then(response => {})
        .catch(err => console.log(err));
    };

//DELETE a specific product
export const deleteProduct = (productId) => {
    axios
        .delete(`insertAPI${productId}`)
        .then(response => {})
        .catch(err => console.log(err));
    };


