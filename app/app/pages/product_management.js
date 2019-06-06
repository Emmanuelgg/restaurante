import React from "react"
import CustomHead from "../components/CustomHead"
import NavBar from "../components/NavBar"
import FormProduct from "../components/FormProduct"

function productManagment() {
  return (
    <div>
        <CustomHead />
        <NavBar active={"product"}/>
        <FormProduct />
    </div>
  )
}

export default productManagment;
