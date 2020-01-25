import React from 'react';
import { Route, Link } from 'react-router-dom';
import Flashmessages from '../elements/FlashMessages/Flashmessages.component'

const DefaultLayoutTemplate = ({ children }) => (
    <div className="main-container default-container">
        <Flashmessages />
        
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
                        <a href="" className="btn btn-primary">Sign In</a>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
        {children}


    </div>
);
const DefaultLayout = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (

            <DefaultLayoutTemplate>
                <Component {...matchProps} />
            </DefaultLayoutTemplate>
        )} />
    );
}
export default DefaultLayout;