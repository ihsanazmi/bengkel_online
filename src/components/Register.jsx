import React, { Component } from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
// import {Redirect} from 'react-router-dom'

class Register extends Component {


    onSubmitClick = (event)=>{
        event.preventDefault()

        let _nama = this.name.value
        let _email = this.email.value
        let _no_hp = this.no_hp.value
        let _password = this.password.value
        let _role = '0'

        axios.post('/user/register', 
            {
                nama: _nama,
                email: _email,
                no_hp: _no_hp,
                password: _password,
                role: _role
            })
        .then(res=>{
            console.log(res.data);
            // return  <Redirect to="/login"/>
            this.name.value = ''
            this.email.value = ''
            this.no_hp.value = ''
            this.password.value = ''
            alert('register berhasil')
            
        }).catch(err=>{
            console.log(err)
        })

    }

    render() {
        if(!this.props.id){
            return (
                <div>
                   < div className="" style={{paddingTop: 75}}>
                        <div className='col-6 mx-auto m-3 card'>
                            <div className='card-body'>
                                <div className='border-bottom border-secondary card-title text-center'>
                                    <h1>Register</h1>
                                </div>
                                
                                <form onSubmit={this.onSubmitClick} className='form-group' >
                                    
                                    <label className="pt-3" htmlFor="nama">Nama</label>
                                    <input id="nama" ref={ (asdf) => {this.name = asdf} } className='form-control' type='text'/>
                                    <label className="pt-3" htmlFor="email">Email</label>
                                    <input id ="email" ref={ (asdf) => {this.email = asdf} } className='form-control' type='email'/>
    
                                    <label className="pt-3" htmlFor="no_hp">Nomor Handphone</label>
                                    <input id="no_hp" ref={ (input) => {this.no_hp = input} } className='form-control' type='text'/>
    
                                    <label className="pt-3" htmlFor="password">Password</label>
                                    <input id="password" ref={ (input) => {this.password = input} } className='form-control' type='password'/>
                                    
                                    <button onClick={this.onSubmitClick} className='btn btn-outline-dark btn-block mt-4'>Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return <Redirect to ="/" />
        }
    }
}

const mapStateToProps = (state)=>{
    return{
        id: state.auth.id
    }
}

export default connect(mapStateToProps)(Register)
