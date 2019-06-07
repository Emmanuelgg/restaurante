import React, {Component} from "react"
import ENV from "../config.js"

class GridTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            gridTable: []
        }
        this.getGridTable = this.getGridTable.bind(this)
    }

    componentDidMount() {
        this.getGridTable()
    }



    getGridTable(event) {
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
                let gridTable = res.data.map(item => {
                    return(
                        <div key={"table_"+item.id_dining_table} className="col-6 col-md-4 text-center">
                            <img src={ENV.IMAGE_ROUTE+"table.svg"} className="img-table"/>
                            <br/>
                            <span className="span-table-number"><b>{item.number}</b></span>
                        </div>
                    )
                })
                this.setState({gridTable: gridTable})
        })
    }

    render() {
        return (
            <React.Fragment>
                <br/>
                <div className="container">
                    <div className="row">
                        {this.state.gridTable}
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default GridTable;
