import React, {Component} from "react"
import DataTable from 'react-data-table-component'
import ENV from "../config.js"

class FoodOrderDescriptionList extends Component {
    constructor(props){
        super(props)
        this.state = {
            foodOrderDescriptionList: [],
            foodOrderDescription: [],
            description: {},
            columns: [
                {
                  name: 'Producto',
                  selector: 'product_name',
                  sortable: true,
                },
                {
                  name: 'M/Nombre',
                  selector: 'dining_table_name',
                  sortable: true,
                },
                {
                  name: 'M/Numero',
                  selector: 'dining_table_number',
                  sortable: true
                },
                {
                  name: 'Tiempo',
                  selector: 'created_at',
                  sortable: true
                },
                {
                  name: 'Acciones',
                  selector: 'actions',
                  ignoreRowClick: true,
                  cell: row => {
                      return(
                          <div>
                              <button className="btn btn-primary py-1 px-2 btn-action" onClick={this.confirmFoodOrderDescriptionMaked.bind(this, row.actions)}>
                                  <span className="icon icon-check"></span>
                              </button>
                          </div>
                      )
                  }

                },
            ]
        }
        this.getFoodOrderDescriptionList = this.getFoodOrderDescriptionList.bind(this)
    }

    componentDidMount() {
        this.getFoodOrderDescriptionList()
        this.interval = setInterval(() => this.getFoodOrderDescriptionList(), 20000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    confirmFoodOrderDescriptionMaked(id) {
        this.state.description = {}
        let description = this.state.foodOrderDescription.find(
            item => {return item.id_food_order_description == id}
        )
        this.setState({description: description})
        $("#modalFoodOrderDescriptionMaked").modal("show")
    }

    handleEventClickFoodOrderMaked(id) {
        fetch(`${ENV.API_ROUTE}update`, {
            method: "post",
            cors: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table: "food_order_description",
                id: id,
                columns: "status",
                values: `2`,
                updated_at: true
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            if (res.status != 200)
                return "Error"
            this.getFoodOrderDescriptionList()
            $("#modalFoodOrderDescriptionMaked").modal("hide")
        })
    }

    getFoodOrderDescriptionList(event) {
        fetch(`${ENV.API_ROUTE}get`, {
            method: "post",
            cors: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table: "food_order_description fod",
                columns:`
                    fod.id_food_order_description id_food_order_description,
                    fod.product_name product_name,
                    dt.name dining_table_name,
                    dt.number dining_table_number,
                    TIMEDIFF(NOW(), fod.created_at) created_at`,
                join: `
                    INNER JOIN food_order fo ON fo.id_food_order = fod.id_food_order
                    INNER JOIN dining_table dt ON dt.id_dining_table = fo.id_dining_table
                    `,
                where: "fod.status = 1 AND fo.status = 1"
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            if (res.status != 200)
                return "Error"

                let foodOrderDescriptionList = res.data.map(item => {
                    return({
                        product_name: item.product_name,
                        dining_table_number: item.dining_table_number,
                        dining_table_name: item.dining_table_name,
                        created_at: item.created_at,
                        actions: item.id_food_order_description
                    })
                })
                this.setState({foodOrderDescription: res.data})
                this.setState({foodOrderDescriptionList: foodOrderDescriptionList})

        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <DataTable
                                noHeader={true}
                                //pagination={true}
                                columns={this.state.columns}
                                data={this.state.foodOrderDescriptionList}
                                className="table"
                                noD15ataComponent="No se encontraron mesas"
                                defaultSortField="created_at"
                                defaultSortAsc={false}
                            />
                        </div>
                    </div>
                </div>
                <div className="modal" id="modalFoodOrderDescriptionMaked" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">¿Desea pasar a realizdo el producto?</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h1 className="title-brackground-white text-center">{this.state.description.product_name}</h1>
                                <h1 className="title-brackground-white text-center">Mesa: {this.state.description.dining_table_number}</h1>
                                <h1 className="title-brackground-white text-center">{this.state.description.dining_table_name}</h1>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="ml-2 btn btn-white btn-outline-white" data-dismiss="modal">Cerrar</button>
                                <button type="button" className="ml-2  btn btn-primary"
                                    onClick={this.handleEventClickFoodOrderMaked.bind(this, this.state.description.id_food_order_description)}
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default FoodOrderDescriptionList;
