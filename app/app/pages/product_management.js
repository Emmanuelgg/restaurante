import React from "react"
import CustomHead from "../components/CustomHead"
import NavBar from "../components/NavBar"

function HiThere() {
  return (
    <div>
        <CustomHead />
        <NavBar active={"product"}/>
        <p>Products is here!</p>
    </div>
  )
}

export default HiThere;
