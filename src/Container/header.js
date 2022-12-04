import React, { useState } from "react";
import { Link} from "react-router-dom";
import "./header.scss";
import { connect } from "react-redux";

var cartamt = 0
const Header = (props) => {
  const {CartInfo} = props
  const [searchInputVal, setsearchInputVal] = useState("");

  const searchInputHandler = (e) => {
    setsearchInputVal(e.target.value)
  };


    return (
      <div className="headerdiv">
        <nav className="navbar navbar-expand-lg navbar-light bg-primary fixed-top">
          <div className="navmain mr-2">
            <Link to="/" className="navbar-brand  navmain text-white" href="#">
              KIBANA STORE
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <div className="nav_search">
              <input
                value={searchInputVal}
                type="text"
                className="searchinput"
                placeholder="Search"
                name="Search"
                onChange={searchInputHandler}
              />
            </div>
            {searchInputVal ? (
              <div className="searchResultRow">
                {props.search
                  ? props.search.map((pro, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <Link
                            to={`/list?subCategory=${pro._id}`}
                            // onClick={searchresultselectHandler}
                            className="searchresultCol"
                          >
                            <img
                              className="searchresultimage"
                              src={pro.image} alt=''
                            />
                          </Link>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/list?subCategory=${pro._id}`}
                            // onClick={searchresultselectHandler}
                            className="searchresultCol"
                            key={idx}
                          >
                            {pro.name.toLowerCase().includes(searchInputVal) ? (
                              <p className="searchresulttitle">
                                {pro.name.substring(0, 18)}
                              </p>
                            ) : pro.brand
                                .toLowerCase()
                                .includes(searchInputVal) ? (
                              <p className="searchresulttitle">
                                {pro.brand.substring(0, 15)}
                              </p>
                            ) : pro.subCategory
                                .toLowerCase()
                                .includes(searchInputVal) &&
                              <p className="searchresulttitle">
                                {pro.subCategory.substring(0, 15)}
                              </p>
                            
                            }
                            <p className="searchresultcategory">in {pro._id}</p>
                          </Link>
                        </React.Fragment>
                      );
                    })
                  : ""}
              </div>
            ) : (
              ""
            )}

            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link
                    to="/checkout"
                    className="nav-link text-white d-flex"
                    style={{ textDecoration: "none" }}
                  >
               <span> <i className="fas fa-shopping-cart mr-1 "></i></span>
               {CartInfo.length > 0 &&
               <span className='badge badge-warning' id='lblCartCount'>{CartInfo.length} </span>}
               <span > Cart</span> 
                  </Link>
                </li>
             {CartInfo.length > 0 &&
             <li className="nav-item mt-2" style={{color:'white',width:'400px'}}>
               <span>Cart amount - ₹ {cartamt.toFixed(2)}</span></li>
              }
            </ul>
          </div>
        </nav>
      </div>
    );
 
};

function mapStateToProps(state) {
  const result = Object.values(state.HomeReducer.CartProduct).reduce((r, { price,quantity }) => r + (price*quantity), 0);
  cartamt = result   
  return {
    CartInfo: state.HomeReducer.CartProduct
  };
}

export default connect(mapStateToProps)(Header);
