import React, {Component} from "react"
import ENV from "../config.js"
import ProductGrid from "./ProductGrid"

class TableGrid extends Component {
    constructor(props){
        super(props)
        this.state = {
            tableGrid: []
        }
        this.getTableGrid = this.getTableGrid.bind(this)
        this.getGridProduct = this.getGridProduct.bind(this)
        this.triggerGetProductGrid = this.triggerGetProductGrid.bind(this)
    }

    componentDidMount() {
        this.getTableGrid()
    }

    triggerGetProductGrid(){
        this.refs.productGrid.getProductGrid()
    }

    getGridProduct(event) {

    }

    getTableGrid(event) {
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
                let tableGrid = res.data.map(item => {
                    return(
                        <div key={"table_"+item.id_dining_table} className="col-6 col-md-4 text-center" onClick={this.triggerGetProductGrid}>
                            <img src={ENV.IMAGE_ROUTE+"table.svg"} className="img-table"/>
                            <br/>
                            <span className="span-table-number"><b>{item.number}</b></span>
                        </div>
                    )
                })
                this.setState({tableGrid: tableGrid})
        })
    }

    render() {
        return (
            <React.Fragment>
                <br/>
                <div className="container">
                    <div className="row">
                        {this.state.tableGrid}
                    </div>
                </div>
                <ProductGrid ref="productGrid" />
            </React.Fragment>
        )
    }
}

export default TableGrid;