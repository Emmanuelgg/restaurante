import React, {Component} from "react"
import ENV from "../config.js"

class ListProduct extends Component {
    constructor(props){
        super(props)
        this.state = {
            listProduct: []
        }
        this.getProduct = this.getProduct.bind(this)
    }

    componentDidMount() {

    }

    getProduct(event) {
        event.preventDefault()
        fetch(`${ENV.API_ROUTE}get`, {
            method: "post",
            cors: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table: "product"
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            if (res.status != 200)
                return "Error"
                let listProduct = res.data.map(item => {
                    return(
                        <tr key={"product_"+item.id_product}>
                            <th scope="row">{item.code}</th>
                            <td>{item.name}</td>
                            <td>{item.quantity_package}</td>
                            <td>{item.price}</td>
                            <td>
                                <button className="btn btn-primary py-1 px-2 btn-action"><span className="icon icon-pencil"></span></button>
                                <button className="btn btn-primary py-1 px-2 btn-action"><span className="icon icon-trash"></span></button>
                            </td>
                        </tr>
                    )
                })
                this.setState({listProduct: listProduct})
        })
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-primary py-1 px-3" data-toggle="modal" data-target="#modalListProduct" onClick={this.getProduct}>Listar</button>
                <div className="modal fade" id="modalListProduct" tabIndex="-1" role="dialog" aria-labelledby="modalListProduct" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                                <div className="modal-body">
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Codigo</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Cantidad/empaque</th>
                                                <th scope="col">Precio</th>
                                                <th scope="col">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.listProduct}
                                        </tbody>
                                    </table>
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

export default ListProduct;
