import React, {Component} from "react"
import ENV from "../config.js"

class ProductGrid extends Component {
    constructor(props){
        super(props)
        this.state = {
            productGrid: [],
            foodOrder: {},
            foodOrderDesciption: {}
        }
        this.getProductGrid = this.getProductGrid.bind(this)
        this.getDiningTableOrder = this.getDiningTableOrder.bind(this)
    }

    componentDidMount() {

    }

    getDiningTableOrder(idDiningTable) {
        //event.preventDefault()
        fetch(`${ENV.API_ROUTE}get/foodOrder`, {
            method: "post",
            cors: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idDiningTable
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            if (res.status != 200)
                return "Error"
            let foodOrder = res.data.food_order[0]
            this.setState({foodOrder:foodOrder})
            console.log(this.state.foodOrder);
        })
    }

    getProductGrid() {
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
                let productGrid = res.data.map(item => {
                    return(
                        <div key={"product_"+item.id_product} className="col-sm-6 col-md-4 text-center">
                            <img src={ENV.IMAGE_ROUTE+"table.svg"} className="img-product"/>
                            <br/>
                            <span className="span-table-number"><b>{item.name}</b></span>
                        </div>
                    )
                })
                this.setState({productGrid: productGrid})
                $("#modalProductGrid").modal("show")
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="modal fade" id="modalProductGrid" tabIndex="-1" role="dialog" aria-labelledby="modalProductGrid" aria-hidden="true">
                    <div className="modal-dialog modal-xl" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">
                                    Mesa {this.state.foodOrder.number}, Orden: #{this.state.foodOrder.id_food_order}
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12 col-md-4">
                                        <table className="table">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th>Nombre</th>
                                                    <th>Cantidad</th>
                                                    <th className="d-none d-sm-block">Unitario</th>
                                                    <th>Importe</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="product-grid col-12 col-md-8">
                                        <div className="row">
                                            {this.state.productGrid}
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

export default ProductGrid;
