import React, {Component} from "react"
import Link from 'next/link'

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.active = props.active
    }
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                <div className="container">
                    <Link prefetch href="/">
                        <a className="navbar-brand"><span className="flaticon-pizza-1 mr-1"></span>My<br/><small>Restaurant</small></a>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="oi oi-menu"></span> Menu
                    </button>
                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className={"nav-item " + (this.active == "index" ? "active" : "")} >
                                <Link prefetch href="/">
                                    <a className="nav-link">Home </a>

                                </Link>
                            </li>
                            <li className={"nav-item " + (this.active == "food_order" ? "active" : "")} >
                                <Link prefetch href="/food_order">
                                    <a className="nav-link">Ordenes </a>

                                </Link>
                            </li>
                            <li className={"nav-item " + (this.active == "managment" ? "active" : "")}>
                                <Link prefetch href="/managment">
                                    <a className="nav-link">Administración</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar
