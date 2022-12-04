import React from "react";
import {Link} from 'react-router-dom'
import './checkout.scss'

const Checkout = (props) => {
  const {cartData,productRemoveHandler} = props

  const cartRemovalHandler=(id)=>{
    productRemoveHandler(id)
  
  }
  return (
    <div className="cartSection mt-5">
  {(cartData && cartData.length > 0)? 
      
       <div className='cartdisplay'>
          <div>
       <h5 className="m-2"> My Cart({cartData.length})</h5>
      <hr/>
     {cartData.map(item=>{
        return(
          <div className='detaildata m-3'  key={item.id}>
          <div className='row m-0' >
             
          <div className='col-md-3 pt-1 pb-2'>
         <center> <img src={item.image} alt='' className='cartimg'/></center>
          
          </div>
          
          <div className='col-md-6 pl-4 cartdetails'>
            <div><span>{item.title}</span></div>  
            <span style={{ marginLeft: "10px" }} className="listrating">
                  {item.rating.rate}
                  <span className="material-icons listrating">star_border</span>
                </span>        
            <div className="mt-2">₹ {item.price} X {item.quantity} = ₹ {(item.price-0).toLocaleString()}</div> 
        
          </div>
          <div className='col-md-3 pl-4'>
              <h5 onClick={()=>cartRemovalHandler(item.id)} style={{cursor:'pointer'}}>Remove</h5>
          </div>
        </div>
        </div>
        )
      })}      
             
      </div>
      </div>
      :
      
        <div className='cartEmpty'>
        <div style={{height:'15vh'}}>MY CART </div>
        <center>
          {/* <img src={img} alt='' className='cartemptyimg'></img> */}
        <h4 className='mt-4'>Your cart is empty!</h4>
        <p>Add items to it now.</p>
        <button className='btn btn-primary mb-5'><Link style={{textDecoration:'none',color:'white'}} to={'/'}>SHOP NOW</Link></button></center>
        </div>
      
    }
    </div>
  )
};



export default Checkout;
