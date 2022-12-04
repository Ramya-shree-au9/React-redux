import axios from "axios";
const url = "http://fakestoreapi.com";

export function ProductList() {
  
  const output = axios.get(`${url}/products`);
  console.log('qwerty', output)
  return (dispatch) => {
    output.then(({ data }) => {
      console.log('data', data)
      dispatch({
        type: "PRODUCTLIST",
        payload: data,
      });
    });
  };
}

export function UpdatedProductList(data) {
  return (dispatch) => {
    dispatch({
      type: "NEWPRODUCT",
      payload: data,
    });
  };
}

export function AddToCart(data) {
  return (dispatch) => {
    dispatch({
      type: "CARTPRODUCT",
      payload: data,
    });
  };
}
