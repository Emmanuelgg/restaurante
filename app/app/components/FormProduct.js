import React, {Component} from "react"
import ENV from "../config.js"

class FormPrduct extends Component {
    constructor(props){
        super(props)
            this.state = {
            file: "./static/images/not-found.png",
            file_name: "Sin producto"
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0]),
            file_name: event.target.files[0].name
        })
    }

    handlePostRequest(event) {
        fetch(`${ENV.API_ROUTE}get/product/all`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({
                name: "myName",
                password: "myPassword"
            })
        })
        .then( (response) => {
            //do something awesome that makes the world a better place
        })
    }

    render() {
        return (
            <div className="container">
                <form method="post" name="produtForm">
                    <div className="row">
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="code" className="form-control" placeholder="Clave"/>
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="name" className="form-control" placeholder="Descripción"/>
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="package" className="form-control" placeholder="Empaque"/>
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="quantity_by_package" className="form-control" placeholder="Cantidad por empaque"/>
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="unit" className="form-control" placeholder="Unidad"/>
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="price" className="form-control" placeholder="Precio"/>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-12 text-center">
                            <img style={{ width: "200px", height:"200px" }} src={this.state.file} className="rounded" alt="product images"/>
                        </div>
                    </div>
                    <br/>
                    <div className="row justify-content-md-center">
                        <div className="col-sd-12 col-md-6 text-center">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlFile1">{this.state.file_name} </label>
                                <input type="file" className="form-control-file btn btn-primary py-3 px-5" name="product_image" onChange={this.handleChange}/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <input type="hidden" name="id_product" className="form-control" value="0"/>
                    <div className="row">
                        <div className="col-12 text-center">
                            <button type="button" className="btn btn-primary py-3 px-5" onClick={this.handlePostRequest}>Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default FormPrduct;
