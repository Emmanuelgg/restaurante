import React, {Component} from "react"
import CustomHead from "../components/CustomHead"
import NavBar from "../components/NavBar"

class IndexPage extends Component {
    render() {
       return (
           <div>
               <CustomHead/>
               <NavBar active={"index"}/>
           </div>
       )
    }
}


export default IndexPage
