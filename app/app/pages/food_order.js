import React, {Component} from "react"
import CustomHead from "../components/CustomHead"
import NavBar from "../components/NavBar"
import FoodOrderDescriptionList from "../components/FoodOrderDescriptionList"

class FoodOrder extends Component {
    render() {
       return (
           <div>
               <CustomHead/>
               <NavBar active={"food_order"}/>
               <FoodOrderDescriptionList />
           </div>
       )
    }
}


export default FoodOrder
