import React, {Component} from "react"
import ENV from "../config.js"

class FormPrduct extends Component {
    constructor(props){
        super(props)
            this.state = {
            file: "./static/images/not-found.png",
            file_name: "Sin producto",
            units: [],
            packages: [],
            code: "",
            name: "",
            idPackageType: "",
            quantityByPackage; "",
            idUnit: "",
            price: "",
            idProduct: ""
        }
        this.handleChangeFile = this.handleChangeFile.bind(this)
        this.handleChangeCode = this.handleChangeCode.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeIdPackageType = this.handleChangeIdPackageType.bind(this)
        this.handleChangeQuantityByPackage = this.handleChangeQuantityByPackage.bind(this)
        this.handleChangeIdUnit = this.handleChangeIdUnit.bind(this)
        this.handleChangePrice = this.handleChangePrice.bind(this)
        this.handleChangeIdProduct = this.handleChangeIdProduct.bind(this)
    }

    componentDidMount() {
        this.getUnit()
        this.getPackageType()
    }

    getUnit() {
        fetch(`${ENV.API_ROUTE}get`, {
            method: "post",
            cors: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table: "unit"
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            if (res.status != 200)
                return "Error"
                let units = res.data.map(item => {
                    return(
                        <option key={"unit_"+item.id_unit} value={item.id_unit}>{item.name}</option>
                    )
                })
                this.setState({units:units})
        })
    }

    getPackageType() {
        fetch(`${ENV.API_ROUTE}get`, {
            method: "post",
            cors: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table: "package_type"
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            if (res.status != 200)
                return "Error"
                let packages = res.data.map(item => {
                    return(
                        <option key={"package_"+item.id_package_type} value={item.id_pakcage_type}>{item.name}</option>
                    )
                })
                this.setState({packages:packages})
        })
    }

    handleChangeFile(event) {
        event.preventDefault()
        this.setState({
            file: URL.createObjectURL(event.target.files[0]),
            file_name: event.target.files[0].name
        })
    }

    handleChangeCode(event) { this.setState({ code: event.target.value }) }
    handleChangeName(event) { this.setState({ code: event.target.value }) }
    handleChangeIdPackageType(event) { this.setState({ code: event.target.value }) }
    handleChangeQuantityByPackage(event) { this.setState({ code: event.target.value }) }
    handleChangeIdUnit(event) { this.setState({ code: event.target.value }) }
    handleChangePrice(event) { this.setState({ code: event.target.value }) }
    handleChangeIdProduct(event) { this.setState({ code: event.target.value }) }



    handlePostRequest(event) {
        code: "",
        name: "",
        idPackageType: "",
        quantityByPackage; "",
        idUnit: "",
        price: "",
        idProduct: ""
        event.preventDefault()
        fetch(`${ENV.API_ROUTE}get/product/add`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.idProduct,
                table: "product",
                columns: `code, name, id_package_type, quantity_by_package, id_unit, price`,
                values: `${this.state.code}, ${this.state.name}, ${this.state.idPackageType}, ${this.state.quantityByPackage}, ${this.state.price}`
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            //do something
        })
    }

    render() {
        return (
            <div className="container">
                <form method="post" name="produtForm">
                    <div className="row">
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="code" className="form-control" placeholder="Clave" value={this.state.code} onChange={this.handleChangeCode} />
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="name" className="form-control" placeholder="Descripción" value={this.state.name} onChange={this.handleChangeName} />
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <select name="id_package_type" className="form-control" onChange={this.handleChangeIdPackageType}>
                                <option value="0">Seleccione una opción...</option>
                                {this.state.packages}
                            </select>
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="quantity_by_package" className="form-control" placeholder="Cantidad por empaque" value={this.state.quantityByPackage} onChange={this.handleChangeQuantityByPackage}/>
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <select name="id_unit" className="form-control" onChange={this.handleChangeIdUnit}>
                                <option value="0">Seleccione una opción...</option>
                                {this.state.units}
                            </select>
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="price" className="form-control" placeholder="Precio" value={this.state.price} onChange={this.handleChangePrice}/>
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
                                <input type="file" className="form-control-file btn btn-primary py-3 px-5" name="product_image" onChange={this.handleChangeFile}/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <input type="hidden" name="id_product" className="form-control" value={this.state.idProduct} onChange={this.handleChangeIdProduct}/>
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
