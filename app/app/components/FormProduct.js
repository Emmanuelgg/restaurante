import React, {Component} from "react"
import ENV from "../config.js"
import ListProduct from "./ListProduct"

class FormProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            file: "./static/images/not-found.png",
            file_name: "Sin producto",
            units: [],
            categories: [],
            code: "",
            name: "",
            idCategory: "",
            quantityByPackage: "",
            idUnit: "",
            price: "",
            idProduct: ""
        }
        this.handleChangeFile = this.handleChangeFile.bind(this)
        this.handleChangeCode = this.handleChangeCode.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleChangeQuantityByPackage = this.handleChangeQuantityByPackage.bind(this)
        this.handleChangeIdUnit = this.handleChangeIdUnit.bind(this)
        this.handleChangePrice = this.handleChangePrice.bind(this)
        this.handleChangeIdProduct = this.handleChangeIdProduct.bind(this)
        this.handlePostRequest = this.handlePostRequest.bind(this)
        this.getProductToEdit = this.getProductToEdit.bind(this)
        this.resetFormProduct = this.resetFormProduct.bind(this)
    }

    componentDidMount() {
        this.getUnit()
        this.getCategory()
    }

    getProductToEdit(product) {
        this.resetFormProduct()
        this.setState({
            idProduct: product.id_product,
            code:product.code,
            name: product.name,
            idCategory: product.category,
            quantityByPackage: product.quantity_package,
            idUnit: product.id_unit,
            price: product.price
        })
        console.log(product)
    }

    resetFormProduct() {
        this.setState({
            idProduct: "",
            code:"",
            name: "",
            quantityByPackage: "",
            idCategory: "0",
            idUnit: "0",
            price: ""
        })
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

    getCategory() {
        fetch(`${ENV.API_ROUTE}get`, {
            method: "post",
            cors: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table: "category"
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            if (res.status != 200)
                return "Error"
                let categories = res.data.map(item => {
                    return(
                        <option key={"category_"+item.id_category} value={item.id_category}>{item.name}</option>
                    )
                })
                this.setState({categories:categories})
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
    handleChangeName(event) { this.setState({ name: event.target.value }) }
    handleChangeCategory(event) { this.setState({ idCategory: event.target.value }) }
    handleChangeQuantityByPackage(event) { this.setState({ quantityByPackage: event.target.value }) }
    handleChangeIdUnit(event) { this.setState({ idUnit: event.target.value }) }
    handleChangePrice(event) { this.setState({ price: event.target.value }) }
    handleChangeIdProduct(event) { this.setState({ idProduct: event.target.value }) }



    handlePostRequest(event) {
        event.preventDefault()
        fetch(`${ENV.API_ROUTE}add`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.idProduct,
                table: "product",
                columns: `code, name, id_category, quantity_package, id_unit, price`,
                values: `${this.state.code}, ${this.state.name}, ${this.state.idCategory}, ${this.state.quantityByPackage}, ${this.state.idUnit}, ${this.state.price}`
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            this.resetFormProduct()
        })
    }

    render() {
        return (
            <div className="container">
                <div className="col-12 text-right">
                    <button type="button" className="btn btn-primary py-1 px-3 btn-action" onClick={this.resetFormProduct}>Reiniciar</button>
                    <ListProduct callbackFromParent={this.getProductToEdit}/>
                </div>
                <form method="post" name="produtForm">
                    <div className="row">
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="code" className="form-control" placeholder="Clave" value={this.state.code} onChange={this.handleChangeCode} />
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="name" className="form-control" placeholder="Descripción" value={this.state.name} onChange={this.handleChangeName} />
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <select name="category" className="form-control" value={this.state.idCategory} onChange={this.handleChangeCategory}>
                                <option value="0">Seleccione una opción...</option>
                                {this.state.categories}
                            </select>
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="quantity_by_package" className="form-control" placeholder="Cantidad por empaque" value={this.state.quantityByPackage} onChange={this.handleChangeQuantityByPackage}/>
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <select name="id_unit" className="form-control" value={this.state.idUnit} onChange={this.handleChangeIdUnit}>
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

export default FormProduct
