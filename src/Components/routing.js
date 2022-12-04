import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Routes}  from 'react-router-dom'
import Home from '../Container/home'
import Checkout from '../Container/checkout'

class Routing extends Component{
    render(){
    return(
        <Router>
        <Routes>
            <Route path='/' element={<Home/>}/>
             <Route path='/checkout' element={<Checkout/>}/>
            </Routes>
        </Router>
       
    )   
}

}

export default Routing