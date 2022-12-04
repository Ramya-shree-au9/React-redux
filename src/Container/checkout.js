import React from "react";
import { connect } from "react-redux";
import { AddToCart} from "../Actions/homeActions";
import Checkout from '../Components/Checkout/checkout'
import Header from './header'

const Cart=(props)=> {
  const { CartInfo} = props;

  const productRemoveHandler=(id)=>{  
    var newArray = CartInfo.filter(function (item) {
        return item.id !== id})
      props.dispatch(AddToCart(newArray))
      
  }
  
      return (
        <React.Fragment>
          <Header/>
          <Checkout cartData={CartInfo} productRemoveHandler={productRemoveHandler}/>          
        </React.Fragment>
      );
};

function mapStateToProps(state) {
  return {
   CartInfo: state.HomeReducer.CartProduct
  };
}

export default connect(mapStateToProps)(Cart);
