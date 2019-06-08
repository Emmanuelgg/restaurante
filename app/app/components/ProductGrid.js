import React, {Component} from "react"
import ENV from "../config.js"

class ProductGrid extends Component {
    constructor(props){
        super(props)
        this.state = {
            productGrid: []
        }
        this.getProductGrid = this.getProductGrid.bind(this)
    }

    componentDidMount() {

    }

    getProductGrid(event) {
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
                        <div key={"product_"+item.id_product} className="col-6 col-md-4 text-center">
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
                                        {this.state.productGrid}
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
