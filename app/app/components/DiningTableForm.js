import React, {Component} from "react"
import ENV from "../config.js"
import DiningTableList from "./DiningTableList"

class DiningTableForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            idDiningTable: "",
            number: "",
            name: ""
        }
        this.handleChangeIdDiningTable = this.handleChangeIdDiningTable.bind(this)
        this.handleChangeNumber = this.handleChangeNumber.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.resetDiningTableForm = this.resetDiningTableForm.bind(this)
        this.getDiningTableToEdit = this.getDiningTableToEdit.bind(this)
        this.handlePostRequest = this.handlePostRequest.bind(this)
    }

    componentDidMount() {

    }

    getDiningTableToEdit(diningTable) {
        this.resetDiningTableForm()
        this.setState({
            idDiningTable: diningTable.id_dining_table,
            number:diningTable.number,
            name: diningTable.name
        })
    }

    resetDiningTableForm() {
        this.setState({
            idDiningTable: "",
            number:"",
            name: "",
        })
    }

    handleChangeIdDiningTable(event) { this.setState({ idDiningTable: event.target.value }) }
    handleChangeNumber(event) { this.setState({ number: event.target.value }) }
    handleChangeName(event) { this.setState({ name: event.target.value }) }



    handlePostRequest(event) {
        event.preventDefault()
        fetch(`${ENV.API_ROUTE}add`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.idDiningTable,
                table: "dining_table",
                columns: `number, name, status`,
                values: `${this.state.number}, ${this.state.name}, 1`
            })
        })
        .then(response => {return response.json()})
        .then(res => {
            this.resetDiningTableForm()
        })
    }

    render() {
        return (
            <div className="container">
                <div className="col-12 text-right">
                    <button type="button" className="btn btn-primary py-1 px-3 btn-action" onClick={this.resetDiningTableForm}>Reiniciar</button>
                    <DiningTableList callbackFromParent={this.getDiningTableToEdit}/>
                </div>
                <form method="post" name="produtForm">
                    <div className="row">
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="code" className="form-control" placeholder="Numero" value={this.state.number} onChange={this.handleChangeNumber} />
                        </div>
                        <div className="col-sd-12 col-md-6">
                            <input type="text" name="name" className="form-control" placeholder="Nombre" value={this.state.name} onChange={this.handleChangeName} />
                        </div>
                    </div>
                    <br/>
                    <input type="hidden" name="id_product" className="form-control" value={this.state.idDiningTable} onChange={this.handleChangeIdDiningTable}/>
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

export default DiningTableForm
