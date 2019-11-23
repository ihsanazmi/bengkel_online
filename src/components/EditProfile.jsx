import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {connect} from 'react-redux'
import axios from '../config/axios'
import {Redirect} from 'react-router-dom'
import { isNull } from 'util'

class EditProfile extends Component {
    
    state = {
        modal_edit : false,
        userProfile : null
    }

    componentDidMount(){
        this.getUser()
    }

    getUser = ()=>{
        axios.get(`/user/get/${this.props.id}`)
        .then(res=>{
            this.setState({
                userProfile: res.data
            })
            // console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    // BUKA MODAL
    toggle_edit = ()=>{
        this.setState({
            modal_edit: !this.state.modal_edit
        })
    }

    // TUTUP MODAL
    toggle_edit_exit = ()=>{
        this.setState({
            modal_edit: !this.state.modal_edit
        })
    }

    // UPDATE PROFILE KE DATABASE
    editProfile = ()=>{
        let nama = this.nama.value
        let email = this.email.value
        let no_hp = this.no_hp.value
        let password = this.password.value

        axios.patch(`/user/update/${this.props.id}`,{nama, email, no_hp, password})
        .then(res=>{
            alert('Profile berhasil diubah')
            this.getUser()
            this.setState({modal_edit:!this.state.modal_edit})
            // console.log(res)
        })
        .catch(err=>{
            // console.log(err)
        })
    }
    
    
    render() {
        if(this.props.id){
            // console.log(this.state.userProfile)
            if(!isNull(this.state.userProfile)){
                let {nama, email, no_hp} = this.state.userProfile[0]
                // console.log(nama)
                return (
                    <div className="container" style={{paddingTop:75}}>
                        <div className="card w-">
                            <div className="card-header">
                                Featured
                            </div>
                            <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="col-3">Informasi User</th>
                                        <th className="text-right"><button onClick={this.toggle_edit} className="btn btn-light"><i className="far fa-edit"></i>Edit</button></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="font-weight-bold">Nama</td>
                                        <td>{nama}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-weight-bold">Email</td>
                                        <td>{email}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-weight-bold">No Handphone</td>
                                        <td>{no_hp}</td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                            </div>
                        </div>
                        <Modal isOpen={this.state.modal_edit} toggle={this.toggle_edit_exit}>
                            <ModalHeader toggle={this.toggle_edit_exit}>Edit Stock</ModalHeader>
                            <ModalBody>
                                
                                <label htmlFor="nama">Nama</label>
                                <input ref={(input)=>{this.nama = input}} id="nama" type="text" className="form-control" defaultValue={nama} />
                                <label htmlFor="nama">Email</label>
                                <input ref={(input)=>{this.email = input}} id="email" type="text" className="form-control" defaultValue={email} />
                                <label htmlFor="nama">No Handphone</label>
                                <input ref={(input)=>{this.no_hp = input}} id="no_hp" type="text" className="form-control" defaultValue={no_hp} />
                                <label htmlFor="nama">password</label>
                                <input ref={(input)=>{this.password = input}} id="password" type="password" className="form-control" defaultValue={this.state.userProfile[0].password} />
        
                            </ModalBody>
                            <ModalFooter>
                            <Button color="primary" onClick={()=>{this.editProfile(this.props.id)}}>Save</Button>{' '}
                            <Button color="secondary" onClick={this.toggle_edit_exit}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                )
            }else{
                return <h1 style={{paddingTop: 75}}>Loading</h1>
            }
        }else{
            return <Redirect to="/"/>
        }
    }
}

const mapStateToProps = (state)=>{
    return {
        id: state.auth.id,
    }
}

export default connect(mapStateToProps)(EditProfile)
