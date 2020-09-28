import React, { useState } from 'react';
import { Link, browserHistory  } from 'react-router-dom';
import { Modal, Tabs, Tab } from "react-bootstrap";
import {connect} from 'react-redux';
import APIService from '../../../dependency/api.service';

class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            modalShow: false,
            githubConfig: {
                "client_id": "de6e75f12a0b5007acd0",
                "client_secret":"368e25601af3f22d822d5499bc4ead2884ebd908",
                "redirect_uri":"http://localhost:3000/"
            },
            signUpError:[]
        }
        this.githubCallback();
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
    signInAction = ()=>{
        let formData = APIService.getFormData("sign_in_form");
        APIService.HTTPRequest('user/login','POST', formData).then((response)=>{
           if (response.isSuccess) {
               sessionStorage.setItem('_token', response.payload.token);
               sessionStorage.setItem('_u', JSON.stringify({
                   name: response.payload.user.name,
                   id: response.payload.user._id
               }));
            //    console.log(this.context.router)
           }
        });
    }
    submitSignUp = ()=>{
        let formData = APIService.getFormData("sign_up_form");
        APIService.HTTPRequest('users','POST', formData).then((response)=>{
            if (response.isSuccess) {

            } else {
                this.setState({
                    signUpError: response.payload
                });
            }
        });
    }
    githubLogin = ()=>{
        const config = this.state.githubConfig;
        const loginUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${config.client_id}&redirect_uri=${config.redirect_uri}`;
        console.log(loginUrl);
        window.location.href = loginUrl;
    }
    githubCallback = ()=>{
        const config = this.state.githubConfig;
        const url = window.location.href;
        const hasCode = url.includes("?code=");
        if (hasCode) {
            const urlarr = url.split("?code=");
            let code = urlarr[1].replace("#/","");
            const requestData = {
                client_id: config.client_id,
                redirect_uri: config.redirect_uri,
                client_secret: config.client_secret,
                code: code
              };
            APIService.HTTPRequest('github-accesstoken','POST', requestData).then((response)=>{
                console.log(response);
            });
        }
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
                                                    <input type="password" name="password" className="form-control" placeholder="Password"/>
                                                </div>
                                                <div className="form-group">
                                                    <input onClick={this.signInAction} type="button" name="submit" className="btn btn-primary" value="Login"/>&nbsp;
                                                    <a>Forget Password?</a>
                                                </div>
                                            </form>
                                        </Tab>
                                        <Tab eventKey="sign_up" title="Sign Up">
                                            {
                                                this.state.signUpError.map((i, index)=>{
                                                return <div className="error-msg" key={index}>{i}</div>
                                                })
                                            }

                                            <form name="sign_up_form">
                                                <div className="form-group">
                                                    <input type="text" name="name" className="form-control" placeholder="Name" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="email" name="email" className="form-control" placeholder="Email" />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" name="password" className="form-control" placeholder="Password"/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="button" name="submit" className="btn btn-primary" value="Sign Up" onClick={this.submitSignUp}/>
                                                </div>
                                            </form>
                                        </Tab>
                                    </Tabs>
                                </div>
                                <div className="col-md-6 col-xs-12">
                                    <div className="right-btn-container">
                                    <button className="btn btn-primary btn-block" onClick={this.githubLogin}><i className="fa fa-github" aria-hidden="true"></i> Signin with Github</button>
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