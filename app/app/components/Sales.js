import React, {Component} from "react"
import DataTable from 'react-data-table-component';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import ENV from "../config.js"

class Sales extends Component {
    constructor(props){
        super(props)
        this.state = {
            foodOrderCompleted: [],
            totalSale: 0.00,
            columns: [
              {
                name: 'Numero',
                selector: 'id_food_order',
                sortable: true
              },
              {
                name: 'Numero/Mesa',
                selector: 'dining_table_number',
                sortable: true,
              },
              {
                name: 'Nombre/Mesa',
                selector: 'dining_table_name',
                sortable: true,
              },
              {
                name: 'Total',
                selector: 'total',
                sortable: true,
              },
              {
                name: 'Fecha',
                selector: 'created_at',
                sortable: true,
              },
              {
                name: 'Acciones',
                selector: 'actions',
                ignoreRowClick: true,
                cell: row => {
                    return(
                        <div>
                            <button className="btn btn-primary py-1 px-2 btn-action" onClick={this.getFoodOrderDescription.bind(this,row.actions)}>
                                <span className="icon icon-minus"></span>
                            </button>
                        </div>
                    )
                }

              },
          ],
          date: new Date(),
        }

        this.getFoodOrderCompleted = this.getFoodOrderCompleted.bind(this)
    }

    componentDidMount() {
        this.getFoodOrderCompleted()
    }

    getFoodOrderDescription() {

    }

    onChange = date => this.setState({ date })

    getFoodOrderCompleted() {
        this.setState({totalSale: 0.00})
        let totalSale = 0.00
        fetch(`${ENV.API_ROUTE}get`, {
            method: "post",
            cors: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table: "food_order fo",
                columns:`
                    fo.id_food_order id_food_order,
                    fo.total total,
                    dt.name dining_table_name,
                    dt.number dining_table_number,
                    created_at`,
                join: `
                    INNER JOIN dining_table dt ON dt.id_dining_table = fo.id_dining_table
                    `,
                where: "fo.status = 2"
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            if (res.status != 200)
                return "Error"
                let foodOrderDescriptionList = res.data.map(item => {
                    totalSale += item.total
                    return({
                        id_food_order: item.id_food_order,
                        dining_table_name: item.dining_table_name,
                        dining_table_number: item.dining_table_number,
                        total: item.total,
                        created_at: item.created_at,
                        actions: item.id_food_order
                    })
                })
                this.setState({foodOrderCompleted: res.data})
                this.setState({totalSale: totalSale})
                console.log(this.foodOrderCompleted);

        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <DatePicker
                          onChange={this.onChange}
                          value={this.state.date}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <h1 className="title-total-sales">Total de ventas: ${this.state.totalSale}</h1>
                    </div>
                    <div className="col-4 text-right">
                        <button type="button" className="ml-2  btn btn-primary" onClick={this.openDay}>Abrir día</button>
                        <button type="button" className="ml-2  btn btn-primary" onClick={this.closeDay}>Cerrar día</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <DataTable
                            noHeader={true}
                            pagination={true}
                            columns={this.state.columns}
                            data={this.state.foodOrderCompleted}
                            className="table"
                            noDataComponent="No se encontraron ventas"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Sales
