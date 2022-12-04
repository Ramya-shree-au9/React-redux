import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {AddToCart} from "../../Actions/homeActions";
import Pagination from "react-js-pagination";
import "./productDisplay.scss";

var cartamt = 0
const ProductsList = (props) => {
  const {
    HomeStoreInfo,productInfo,updateData,quantityUpdate
  } = props;
  const [Pid,setPid]=useState('')
  const [postPerPage] = useState(8);
  const [activePage, setActivePage] = useState(1);
  const [responsiveWidth, setresponsiveWidth] = useState(250);
  const [responsiveHeight, setresponsiveHeight] = useState(200);

  const indexOfLastPost = activePage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const FilteredData = productInfo.slice(indexOfFirstPost, indexOfLastPost);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    if(productInfo.length>0){
      updateData(productInfo)

    }

    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth <= 600) {
          setresponsiveWidth(150);
          setresponsiveHeight(150);
        } else if (window.innerWidth > 779) {
          setresponsiveWidth(200);
          setresponsiveHeight(150);
        } else if (window.innerWidth > 992) {
          setresponsiveWidth(250);
          setresponsiveHeight(200);
        }
      },
      false
    );
    // eslint-disable-next-line
  }, []);

  const style = {
    image: {
      marginLeft: "10px",
    },
  };

  const reduceQuantity=(q,id)=>{
    if(q > 1){
      var qty = q-1 
        quantityUpdate(qty,id)
    }
  }


  const increaseQuantity=(q,id)=>{
    var qty = parseInt(q) + 1
   quantityUpdate(qty,id)
  }


  const functionrender=(item,num)=>{
    return(
      <>
       
        <div className='row pt-2'>
          {num === 1 &&
          <div className='mt-2'>
          <div className='quantitydesign'>
          <span className='carticons ml-1 mr-2 ml-4'  onClick={()=>reduceQuantity(item.quantity,item.id)}>
            <svg className='svgimg bi bi-dash-circle' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
</svg>
</span>
        <span className='quantity mr-2 '>{item.quantity}</span>
        <span className='carticons '  onClick={()=>increaseQuantity(item.quantity,item.id)}>
          <svg className='svgimg bi bi-plus-circle' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg> </span> </div> 
         
          </div>}
         
  </div>
  
  </>
    )
  }

const addToCartHandler=(product)=>{
  setPid(product.id)
  var array = HomeStoreInfo.CartProduct.length>0?[...HomeStoreInfo.CartProduct]:[]
    if(array.length > 0){
      
      const found =array.some(el => el.id === product.id);
      if (!found) {array.push(product)};
    }else{
      array.push(product)
     
    } 
    props.dispatch(AddToCart(array))

}
  return (
    <div className="productsList">
      <h3 className="mt-2 mb-2">Products</h3>
      <div className="listRow">
        {FilteredData.length > 0 ? (
          FilteredData.map((product, idx) => {
            return (
              <div key={idx} className="p-3">
                <img src={product.image} width='250px' height='250px'></img>
                <p style={{ color: "black" }} className="listText">
                  {product.title.charAt(0).toUpperCase() +
                    product.title.slice(1).substring(0, 30)}{" "}
                  . . .
                </p>
                <span style={{ marginLeft: "10px" }} className="listrating">
                  {product.rating.rate}
                  <span className="material-icons listrating">star_border</span>
                </span>
                <p className="listprice">₹ {product.price.toLocaleString()}</p>
                <button className="btn btn-secondary ml-2" onClick={()=>addToCartHandler(product)}>Add</button>
                {Pid === product.id &&
                <>
                {functionrender(product,1)}
                </>
          }
                </div>
            );
          })
        ) : (
          <div>No Data Found</div>
        )}
      </div>

      <div className="pagiRow mb-5">
        <div className="pagiCol">
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={activePage}
            itemsCountPerPage={postPerPage}
            totalItemsCount={productInfo.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
      {HomeStoreInfo.CartProduct.length > 0 &&
      <Link to='/checkout'>
      <div className="sticky">
            Checkout
        </div>
        </Link>
      }
    </div>
  );
};

function mapStateToProps(state) {
  const result = Object.values(state.HomeReducer.CartProduct).reduce((r, { price,quantity }) => r + (price*quantity), 0);
  cartamt = result          
  return {
    HomeStoreInfo: state.HomeReducer
  };
}

export default connect(mapStateToProps)(ProductsList);
