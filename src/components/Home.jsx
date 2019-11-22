import React, { Component } from 'react'
import img1 from '../img/1.jpg'
import product1 from '../img/mekanik.png'
import product2 from '../img/spring.png'
import Footer from './Footer'
import axios from '../config/axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


class Home extends Component {

    state={
        modal_sparepart: false,
        modal_service: false,
        sparepart: [],
        service: [],
        value_service: 0,
        value_sparepart: 0,
    }

    componentDidMount(){
        this.getSpareparts()
        this.getService()
    }

    getService = ()=>{
        axios.get('/service')
        .then(res=>{
            this.setState({
                service: res.data
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    getSpareparts = ()=>{
        axios.get('/sparepart')
        .then(res=>{
            this.setState({
                sparepart: res.data
            })
            // console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    openModalSparepart = ()=>{
        this.setState({modal_sparepart: !this.state.modal_sparepart})
    }

    toggle_sparepart_exit = ()=>{
        this.setState({modal_sparepart: !this.state.modal_sparepart})
    }

    buySparepart = ()=>{
        // let user_id = this.props.id
        // let sparepart_id = this.state.value_sparepart

    }

    openModalService = ()=>{
        this.setState({modal_service:!this.state.modal_service})
    }

    toggle_service_exit = ()=>{
        this.setState({modal_service: !this.state.modal_service})
    }

    buyService = ()=>{

    }

    renderOptionService = ()=>{
        let option = this.state.service.map(service=>{
            return(
            <option key={service.id} value={service.id}>{service.product}</option>
            )
        })
        // console.log(option)
        return option
    }

    renderOptionSparepart = ()=>{
        let option = this.state.sparepart.map(part=>{
            return(
            <option key={part.id} value={part.id}>{part.product}</option>
            )
        })
        // console.log(option)
        return option
    }

    render() {
        return (
            <div>
                <div className="" style={{paddingTop: 75, height: "70vh", backgroundColor:"#f8f8f8"}}>
                    
                    <div className="mt-5 text-center">
                        <div className=""><img src={img1} alt=""/></div>
                        <div>
                            <h1 className="display-4 mt-3">Vehicles Breakdown Assistance</h1>
                        </div>
                        <div>
                            <p className="lead">Selamat datang di website bantuan kerusakan kendaraan</p>
                        </div>
                    </div>
                </div>
                <section id="team" >
                    <div className="container p-5 ">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="section-title">
                                    <h2>See Our Services</h2>
                                    {/* <h4>creative, friendly</h4> */}
                                </div>
                            </div>
                        
                            <div className="col-md-6 col-12 " style={{width:50}}>
                                <div className="team-thumb">
                                    <img src={product1} className="img-responsive" alt=""/>
                                        <div className="team-hover">
                                                <div className="team-item">
                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, veritatis.</p> 
                                                    <center>
                                                        <button onClick={this.openModalService} className="btn btn-outline-light">Pesan</button>
                                                    </center>
                                                </div>
                                        </div>
                                </div>
                                <div className="team-info">
                                    <h3>Service Car</h3>
                                </div>
                            </div>
                        
                            <div className="col-md-6 col-12">
                                <div className="team-thumb wow fadeInUp" data-wow-delay="0.4s">
                                    <img src={product2} className="img-responsive" alt=""/>
                                        <div className="team-hover">
                                                <div className="team-item">
                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, veritatis.</p> 
                                                    <center>
                                                        <button onClick={this.openModalSparepart} className="btn btn-outline-light">Beli</button>
                                                    </center>
                                                </div>
                                        </div>
                                </div>
                                <div className="team-info">
                                    <h3>Buy Sparepart</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <div style={{backgroundColor: "#f8f8f8"}}>
                    <div className="container pt-5 pb-5">
                        <div className= "row">
                            <div className=" col-12 mt-3">
                                <h1 className="display-4 text-center"> About</h1>
                            </div>
                            <div className="col-6 pt-5">
                                <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis velit impedit voluptates quisquam incidunt. Amet culpa voluptatem inventore, veritatis sapiente, voluptates fuga consequuntur, maiores nesciunt nam debitis saepe officia sed?</p>
                            </div>
                            <div className="col-6 pt-5">
                                <p className="lead">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, iusto! Quam, dolorem dolore maiores numquam ducimus ullam optio suscipit eligendi necessitatibus blanditiis fugit tempora eaque modi, earum explicabo nostrum recusandae?</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>

                <Modal isOpen={this.state.modal_sparepart} toggle={this.toggle_sparepart_exit}>
                    <ModalHeader toggle={this.toggle_sparepart_exit}>Pilih Sparepart</ModalHeader>
                    <ModalBody>
                        
                        <label htmlFor="nama">Email</label>
                        <select className="form-control mt-3" value={this.state.value_sparepart} onChange={(e)=>this.setState({value_sparepart: e.target.value })}>
                            <option value="">-Pilih Sparepart-</option>
                            {this.renderOptionSparepart()}
                        </select>
                        <label htmlFor="qty">Quantity</label>
                        <input ref={(input)=>{this.qty = input}} id="qty" type="text" className="form-control"/>

                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={()=>{this.buySparepart(this.props.id)}}>Tambah ke Keranjang</Button>{' '}
                    <Button color="secondary" onClick={this.toggle_sparepart_exit}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.modal_service} toggle={this.toggle_service_exit}>
                    <ModalHeader toggle={this.toggle_service_exit}>Pilihan Service</ModalHeader>
                    <ModalBody>
                        
                        
                        <label htmlFor="nama">Jenis Service</label>
                        <select className="form-control mt-3" value={this.state.value_service} onChange={(e)=>this.setState({value_service: e.target.value })}>
                            <option value="">-Pilih Service-</option>
                            {this.renderOptionService()}
                        </select>

                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={()=>{this.buyService(this.props.id)}}>Tambah ke Keranjang</Button>{' '}
                    <Button color="secondary" onClick={this.toggle_service_exit}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Home
