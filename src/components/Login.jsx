import React, { Component } from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import {sendData} from '../actions/index'

 class Login extends Component {

    onSubmitClick = (event)=>{

        event.preventDefault()

        let _email = this.email.value
        let _password = this.password.value

        // alert(password)
        console.log(_email)

        axios.post('/user/login', {email: _email, password: _password})
        .then(res=>{
            if(res.data.error){
                return alert(res.data.error)
            }

            let {email, id, nama, no_hp, role} = res.data

            localStorage.setItem('userData', JSON.stringify({nama, id, email, no_hp, role}))
            this.props.sendData(id, nama, email, no_hp, role)
            // console.log(avatar)
        })
        .catch(err=>{
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
                                    <h1>Login</h1>
                                </div>
                                
                                <form onSubmit={this.onSubmitClick} className='form-group' >
                                    
                                   
                                    <label className="pt-3" htmlFor="email">Email</label>
                                    <input id ="email" ref={ (asdf) => {this.email = asdf} } className='form-control' type='email'/>
    
                                    <label className="pt-3" htmlFor="password">Password</label>
                                    <input id="password" ref={ (input) => {this.password = input} } className='form-control' type='password'/>
                                    
                                    <button onClick={this.onSubmitClick} className='btn btn-outline-dark btn-block mt-4'>Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            // arahkan ke halaman home
            return <Redirect to ="/"/>
        }
    }
}

const mapStateToProps = (state)=>{
    return {
        id: state.auth.id
    }
}

export default connect(mapStateToProps, {sendData})(Login)
