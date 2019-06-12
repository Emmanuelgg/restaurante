import React, {Component} from "react"
import DataTable from 'react-data-table-component';
import ENV from "../config.js"

class ProductGrid extends Component {
    constructor(props){
        super(props)
        this.state = {
            productGrid: [],
            foodOrder: {},
            foodOrderDesciption: [],
            columns: [
              {
                name: 'Nombre',
                selector: 'name',
                sortable: true
              },
              {
                name: 'Cantidad',
                selector: 'quantity',
                sortable: true,
              },
              {
                name: 'Unitario',
                selector: 'unit',
                sortable: true,
              },
              {
                name: 'Importe',
                selector: 'import',
                sortable: true,
              },
              {
                name: 'Acciones',
                selector: 'actions',
                ignoreRowClick: true,
                cell: row => {
                    return(
                        <div>
                            <button className="btn btn-primary py-1 px-2 btn-action" onClick={this.handleEventClickDeleteFoodOrderDescription.bind(this,row.actions)}>
                                <span className="icon icon-trash"></span>
                            </button>
                        </div>
                    )
                }

              },
            ]
        }
        this.getProductGrid = this.getProductGrid.bind(this)
        this.getDiningTableOrder = this.getDiningTableOrder.bind(this)
        this.getFoodOrderDescription = this.getFoodOrderDescription.bind(this)
        this.handleEventClickDeleteFoodOrderDescription = this.handleEventClickDeleteFoodOrderDescription.bind(this)
    }

    componentDidMount() {

    }

    handleEventClickDeleteFoodOrderDescription() {

    }

    getFoodOrderDescription() {
        fetch(`${ENV.API_ROUTE}get`, {
            method: "post",
            cors: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table: "food_order_description",
                where: `id_food_order = ${this.state.foodOrder.id_food_order}`
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            if (res.status != 200)
                return "Error"
            let foodOrderDesciption = res.data.map(
                item => {
                    return({
                        name: item.product_name,
                        quantity: item.quantity,
                        unit: item.price,
                        import: item.total,
                        actions: item.id_food_order_description
                    })
                }
            )
            this.setState({foodOrderDesciption:foodOrderDesciption})
        })
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
            this.getFoodOrderDescription()
        })
    }

    addProductToFoodOrder(id_product) {
        fetch(`${ENV.API_ROUTE}add/foodOrder`, {
            method: "post",
            cors: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.foodOrder.id_food_order,
                id_product:id_product
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            if (res.status != 200)
                return "Error"
            this.getFoodOrderDescription()
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
                        <div key={"product_"+item.id_product} className="col-6 col-sm-6 col-md-4 text-center container-grid" onClick={this.addProductToFoodOrder.bind(this, item.id_product)}>
                            <img src={ENV.API_FILES_ROUTE+item.image_url} className="rounded img-product"/>
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
                                    <div className="col-12 col-md-6">
                                        <DataTable
                                            noHeader={true}
                                            pagination={true}
                                            columns={this.state.columns}
                                            data={this.state.foodOrderDesciption}
                                            className="table"
                                            noDataComponent="No se encontraron productos"
                                        />
                                    </div>
                                    <div className="product-grid col-12 col-md-6">
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
