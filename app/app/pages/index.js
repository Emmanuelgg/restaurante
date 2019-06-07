import React, {Component} from "react"
import CustomHead from "../components/CustomHead"
import NavBar from "../components/NavBar"
import GridTable from "../components/GridTable"

class IndexPage extends Component {
    render() {
       return (
           <div>
               <CustomHead/>
               <NavBar active={"index"}/>
               <GridTable />
           </div>
       )
    }
}


export default IndexPage
