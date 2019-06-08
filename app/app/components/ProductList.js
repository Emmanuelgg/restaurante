import React, {Component} from "react"
import ENV from "../config.js"

class ProductList extends Component {
    constructor(props){
        super(props)
        this.state = {
            productList: []
        }
        this.getProductList = this.getProductList.bind(this)
    }

    componentDidMount() {

    }

    handleEventClickEditProduct(value) {
        fetch(`${ENV.API_ROUTE}get`, {
            method: "post",
            cors: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table: "product",
                where: `id_product = ${value}`
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            if (res.status != 200)
                return "Error"
            let data = res.data.map(item => {
                return(
                    item
                )
            })
            this.props.callbackFromParent(data[0]);
            $('#modalProductList').modal('hide')

        })
    }
    handleEventClickDeleteProduct(value) {
        fetch(`${ENV.API_ROUTE}logical/delete`, {
            method: "post",
            cors: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table: "product",
                id: `${value}`
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            if (res.status != 200)
                return "Error"
            this.getProductList(this)
        })
    }

    getProductList(event) {
        //event.preventDefault()
        fetch(`${ENV.API_ROUTE}get`, {
            method: "post",
            cors: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table: "product",
                where: "status = 1"
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            if (res.status != 200)
                return "Error"
                let productList = res.data.map(item => {
                    return(
                        <tr key={"product_"+item.id_product}>
                            <td scope="row">{item.name}</td>
                            <td>{item.quantity_package}</td>
                            <td>{item.price}</td>
                            <td>
                                <button className="btn btn-primary py-1 px-2 btn-action" onClick={this.handleEventClickEditProduct.bind(this,item.id_product)}>
                                    <span className="icon icon-pencil"></span>
                                </button>
                                <button className="btn btn-primary py-1 px-2 btn-action" onClick={this.handleEventClickDeleteProduct.bind(this,item.id_product)}>
                                    <span className="icon icon-trash"></span>
                                </button>
                            </td>
                        </tr>
                    )
                })
                this.setState({productList: productList})
        })
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-primary py-1 px-3" data-toggle="modal" data-target="#modalProductList" onClick={this.getProductList}>Listar</button>
                <div className="modal fade" id="modalProductList" tabIndex="-1" role="dialog" aria-labelledby="modalProductList" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Productos</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12">
                                                <table className="table">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th scope="col">Nombre</th>
                                                            <th scope="col">Categoria</th>
                                                            <th scope="col">Precio</th>
                                                            <th scope="col">Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.productList}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            <div className="modal-footer">
                                <button type="button" className="ml-2 btn btn-white btn-outline-white" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ProductList;
