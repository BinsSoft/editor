import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Tabs, Tab } from "react-bootstrap";
import {connect} from 'react-redux';
class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            modalShow: false
        }
    }
    showModal = () => {
        this.setState({
            modalShow: true
        })
    };

    hideModal = () => {
        this.setState({
            modalShow: false
        })
    };
    componentWillReceiveProps(nextProps) {
        this.setState({modalShow:nextProps.status});
    }
    render() {

        return (
            <div className="main-header">
                <div className='row'>
                    <div className="col-md-3 col-xs-12">
                        <div className="logo-content">
                            <Link to={'/'}><img src="logo.PNG" /></Link>
                        </div>
                    </div>
                    <div className="col-md-5 col-xs-12"></div>
                    <div className="col-md-4 col-xs-12">
                        <div className="row">
                            <div className="col-md-9 col-xs-12">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <span className="input-group-text" id="basic-addon2"><i className="fa fa-search"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-xs-12 text-xs-center">
                                <button className="btn btn-primary" onClick={this.showModal}>Sign In</button>
                            </div>
                        </div>


                    </div>
                </div>

                <div className={"customModal " + ((this.state.modalShow) ? 'show' : 'hide')}>
                    <div className="modalDialog">
                        <div className="modalHead">
                            <span className="closeSpan" onClick={this.hideModal}>x</span>
                        </div>
                        <div className="modalBody">
                            <div className="row sign-in-container">
                                <div className="col-md-6 col-xs-12 first-coloum">
                                    <Tabs defaultActiveKey="sign_in" id="uncontrolled-tab-example">
                                        <Tab eventKey="sign_in" title="Sign In">
                                            <form name="sign_in_form">
                                                <div className="form-group">
                                                    <input type="email" name="email" className="form-control" placeholder="Email" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" name="email" className="form-control" placeholder="Password"/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="submit" name="submit" className="btn btn-primary" value="Login"/>&nbsp;
                                                    <a>Forget Password?</a>
                                                </div>
                                            </form>
                                        </Tab>
                                        <Tab eventKey="sign_up" title="Sign Up">

                                            <form name="sign_up_form">
                                                <div className="form-group">
                                                    <input type="text" name="name" className="form-control" placeholder="Name" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="email" name="email" className="form-control" placeholder="Email" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" name="email" className="form-control" placeholder="Password"/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="submit" name="submit" className="btn btn-primary" value="Sign Up"/>
                                                </div>
                                            </form>
                                        </Tab>
                                    </Tabs>
                                </div>
                                <div className="col-md-6 col-xs-12">
                                    <div className="right-btn-container">
                                    <button className="btn btn-primary btn-block"><i className="fa fa-github" aria-hidden="true"></i> Signin with Github</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        status : state.AuthReducer
    }
}
export default connect(mapStateToProps)(Header);