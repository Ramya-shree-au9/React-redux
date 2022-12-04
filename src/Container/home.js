import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  ProductList,
  UpdatedProductList,
  AddToCart
} from "../Actions/homeActions";
import ProductDisplay from "../Components/Home/productDisplay";
import Header from "./header";

const Home = (props) => {
  const { HomeStoreInfo } = props;

  useEffect(() => {
    console.log('aa', HomeStoreInfo.ProductApi.length)
    if (HomeStoreInfo.ProductApi.length <= 0) {
      console.log('enter')
      props.dispatch(ProductList());
    }

    // eslint-disable-next-line
  }, []);

  const updateData = (data) => {
    if (data.length > 0) {
      const newArr = data.map((v) => ({ ...v, quantity: 1 }));
      props.dispatch(UpdatedProductList(newArr));
    }
  };

  const quantityUpdate = (qty, id) => {
    if (HomeStoreInfo.ProductApi.length > 0) {
      const newArr = HomeStoreInfo.ProductApi.map((v) => ({
        ...v,
        quantity: id === v.id ? qty : v.quantity
      }));
      props.dispatch(UpdatedProductList(newArr));
    }

    if (HomeStoreInfo.CartProduct.length > 0) {
      const newArr = HomeStoreInfo.CartProduct.map((v) => ({
        ...v,
        quantity: id === v.id ? qty : v.quantity
      }));
      props.dispatch(AddToCart(newArr));
    }
  };

  console.log('sss', HomeStoreInfo.ProductApi)
  if (HomeStoreInfo.ProductApi && HomeStoreInfo.ProductApi.length > 0) {
    return (
      <React.Fragment>
        <Header />

        <ProductDisplay
          productInfo={HomeStoreInfo.ProductApi}
          updateData={updateData}
          quantityUpdate={quantityUpdate}
        />
      </React.Fragment>
    );
  } else {
    return <p>Loading</p>
  }
};

function mapStateToProps(state) {
  return {
    HomeStoreInfo: state.HomeReducer
  };
}

export default connect(mapStateToProps)(Home);
