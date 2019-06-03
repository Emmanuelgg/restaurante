import React, {Component} from "react"

class FormPrduct extends Component {
    render() {
        return (
            <div className="container">
                <form>
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
                            <input type="submit" value="Guardad" class="btn btn-primary py-3 px-5"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default FormPrduct;
