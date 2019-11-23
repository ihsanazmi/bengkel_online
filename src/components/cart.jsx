import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from '../config/axios'


class cart extends Component {
    
    state={
        carts: [],
        grandTotal: 0,
    }

    componentDidMount(){
        this.getCart()
        this.getGrandTotal()
    }

    getGrandTotal = ()=>{
        axios.get('/cart/getGrandTotal')
        .then(res=>{
            this.setState({
                grandTotal: parseInt(res.data[0].grand_total)
            })
            // console.log(res.data[0].grand_total)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    getCart = ()=>{
        axios.get('/getCart')
        .then(res=>{
            this.setState({
                carts: res.data
            })
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    renderTable = ()=>{
        let i = 1
        let hasil = this.state.carts.map(produk=>{
            return (
                <tr key={produk.id}>
                    <td>{i++}</td>
                    <td>{produk.product}</td>
                    <td>{produk.qty}</td>
                    <td>{produk.total}</td>
                    <td><button onClick={()=>{this.onDeleteClick(produk.id)}} className="btn btn-danger">Delete</button></td>
                </tr>
            )
        })
        return hasil
    }

    onDeleteClick = (id_cart)=>{

    }

    render() {
        if(this.props.id){
            return (
                <div style={{paddingTop: 75}}>
                    <center>
                        <table className="table table-hover w-50 mt-5">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Produk</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTable()}
                            </tbody>
                        </table>
                        <div className="card w-50">
                            <div className="card-body">
                                <h5 className="card-title">GRAND TOTAL</h5>
                                <p className="card-text">Rp.{Intl.NumberFormat().format(this.state.grandTotal).replace(/,/g, '.')}</p>
                                <button onClick={this.onCheckoutClick} className="btn btn-primary">Checkout</button>
                            </div>
                        </div>
                </center>
                </div>
            )
        }else{
            return <Redirect to="/"/>
        }
    }
}

const mapStateToProps = (state)=>{
    return{
        id: state.auth.id
    }
}

export default connect(mapStateToProps)(cart)
