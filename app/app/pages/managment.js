import React from "react"
import CustomHead from "../components/CustomHead"
import NavBar from "../components/NavBar"
import ProductForm from "../components/ProductForm"
import DiningTableForm from "../components/DiningTableForm"

function Managment() {
  return (
    <div>
        <CustomHead />
        <NavBar active={"managment"}/>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item">
                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Productos</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Mesas</a>
            </li>
        </ul>
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <br/>
                <ProductForm />
            </div>
            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <br/>
                <DiningTableForm />
            </div>
        </div>
    </div>
  )
}

export default Managment;
