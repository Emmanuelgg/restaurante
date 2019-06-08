import React, {Component} from "react"
import CustomHead from "../components/CustomHead"
import NavBar from "../components/NavBar"
import TableGrid from "../components/TableGrid"

class IndexPage extends Component {
    render() {
       return (
           <div>
               <CustomHead/>
               <NavBar active={"index"}/>
               <TableGrid />
           </div>
       )
    }
}


export default IndexPage
