import React, {Component} from "react"
import DataTable from 'react-data-table-component'
import ENV from "../config.js"

class DiningTableList extends Component {
    constructor(props){
        super(props)
        this.state = {
            diningTableList: [],
            columns: [
              {
                name: 'Numero',
                selector: 'number',
                sortable: true
              },
              {
                name: 'Nombre',
                selector: 'name',
                sortable: true,
              },
              {
                name: 'Acciones',
                selector: 'actions',
                ignoreRowClick: true,
                cell: row => {
                    return(
                        <div>
                            <button className="btn btn-primary py-1 px-2 btn-action" onClick={this.handleEventClickEditDiningTable.bind(this,row.actions)}>
                                <span className="icon icon-pencil"></span>
                            </button>
                            <button className="btn btn-primary py-1 px-2 btn-action" onClick={this.handleEventClickDeleteDiningTable.bind(this,row.actions)}>
                                <span className="icon icon-trash"></span>
                            </button>
                        </div>
                    )
                }

              },
            ]
        }
        this.getDiningTableList = this.getDiningTableList.bind(this)
    }

    componentDidMount() {

    }

    handleEventClickEditDiningTable(value) {
        fetch(`${ENV.API_ROUTE}get`, {
            method: "post",
            cors: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table: "dining_table",
                where: `id_dining_table = ${value}`
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
            $('#modalDiningTableList').modal('hide')

        })
    }
    handleEventClickDeleteDiningTable(value) {
        fetch(`${ENV.API_ROUTE}logical/delete`, {
            method: "post",
            cors: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table: "dining_table",
                id: `${value}`
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            if (res.status != 200)
                return "Error"
            this.getDiningTableList(this)
        })
    }

    getDiningTableList(event) {
        //event.preventDefault()
        fetch(`${ENV.API_ROUTE}get`, {
            method: "post",
            cors: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                table: "dining_table",
                where: "status = 1"
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            if (res.status != 200)
                return "Error"
                let diningTableList = res.data.map(item => {
                    return({
                        number: item.number,
                        name: item.name,
                        actions: item.id_dining_table
                    })
                })
                this.setState({diningTableList: diningTableList})
        })
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-primary py-1 px-3" data-toggle="modal" data-target="#modalDiningTableList" onClick={this.getDiningTableList}>Listar</button>
                <div className="modal fade" id="modalDiningTableList" tabIndex="-1" role="dialog" aria-labelledby="modalDiningTableList" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Mesas</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                                <div className="modal-body">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12">
                                                <DataTable
                                                    noHeader={true}
                                                    pagination={true}
                                                    columns={this.state.columns}
                                                    data={this.state.diningTableList}
                                                    className="table"
                                                    noDataComponent="No se encontraron mesas"
                                                />
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

export default DiningTableList;
