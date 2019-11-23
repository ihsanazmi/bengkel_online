import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import axios from '../config/axios'
import Swal from 'sweetalert2'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment'

class cart extends Component {
    
    state={
        carts: [],
        grandTotal: 0,
        modal: false,
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
        if(this.state.carts !== 0){
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
        }else{
           return <h1>Silahkan belanja dulu</h1>
        }
            
        
    }

    onDeleteClick = (id_cart)=>{
        axios.delete(`/delete/cart/${id_cart}`)
        .then(res=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Stock berhasil di ubah',
                showConfirmButton: false,
                timer: 1000
            })
            this.getCart()
            this.getGrandTotal()
        })
    }

    onCheckoutClick = ()=>{
        this.setState({modal: !this.state.modal})
    }

    toggle = ()=>{
        this.setState({modal: !this.state.modal})
    }

    onBayarClick = ()=>{
        
        let transaksi_id = Date.now()
        let user_id = this.props.id
        let grand_total = this.state.grandTotal
        let status_pembayaran = 1
        let status_selesai = 1
        let created_at = new Date()
        created_at = moment(created_at).format('YYYY-MM-DD HH-mm-ss')
        
        axios.post('/bayar', {transaksi_id, user_id, grand_total, status_pembayaran, status_selesai, created_at})
        .then(res=>{
            console.log(res)
            alert('transaksi berhasil')
            this.setState({modal:!this.state.modal, grandTotal: 0})
            this.getCart()
        })
        .catch(err=>{
            console.log(err)
        })
        
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
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>PEMBAYARAN</ModalHeader>
                    <ModalBody className="text-center">
                        <p>Jumlah yang harus dibayar adalah  </p>
                        <h4 className="font-weight-bold">Rp.{Intl.NumberFormat().format(this.state.grandTotal).replace(/,/g, '.')}</h4>
                       
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Back</Button>{' '}
                        <Button color="secondary" onClick={this.onBayarClick}>Bayar</Button>
                    </ModalFooter>
                </Modal>
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
