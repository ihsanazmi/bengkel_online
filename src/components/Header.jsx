import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logOut} from '../actions/index'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button } from 'reactstrap';

class Header extends Component {
    
    
    state = {
        isOpen : false,
    }

    toggle = ()=>{
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    renderRole = ()=>{
        if(this.props.role === "1"){
            return(
                <NavLink tag={Link} to ="/admin" >
                    <DropdownItem>Admin <i className="far fa-check-circle"/></DropdownItem>
                </NavLink>
            )
        }
    }

    renderNavigation = ()=>{
        
        if(!this.props.nama){
            return(
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink className="nav-link" tag = {Link} to = "/cart">
                            <button className=" nav-link btn btn-block"><i className="fas fa-shopping-cart fa-lg "></i></button>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag = {Link} className="nav-link" to ="/login">
                            <button className="btn btn-block btn-light">Masuk</button>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag = {Link} className="nav-link" to ="/register">
                            <button className="btn btn-block btn-outline-light">Daftar</button>
                        </NavLink>
                    </NavItem>
                </Nav>
            )
        }
        
        return(
            <Nav className="ml-auto" navbar>
                
                <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="text-center text-white" nav caret>
                        Helo, <span> {this.props.nama}</span>
                </DropdownToggle>
                <DropdownMenu right>
                    <NavLink tag = {Link} to="/cart">
                        <DropdownItem>Keranjang Belanja</DropdownItem>
                    </NavLink>
                    <NavLink tag = {Link} to="/edit">
                        <DropdownItem>Edit Profile</DropdownItem>
                    </NavLink>
                    
                        {this.renderRole()}
                    <DropdownItem divider />
                    <Button className="dropdown-item" onClick={this.props.logOut}>Logout</Button>
                </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
        )
    }

    render() {
        return (
            <div>
                {/* Navbar atas */}
                

                <Navbar color="dark" className="fixed-top" light expand= "md">
                    <Link to="/" className="navbar-brand text-white">Vehicle Breakdown Assistance</Link>
                    <NavbarToggler className="mb-2" onClick={this.toggle} />
                    
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {this.renderNavigation()}
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        id: state.auth.id,
        nama: state.auth.nama,
        role: state.auth.role,
    }
}

export default connect(mapStateToProps,{logOut})(Header)
