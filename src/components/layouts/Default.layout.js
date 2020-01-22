import React from 'react';
import { Route } from 'react-router-dom';
import Flashmessages from '../elements/FlashMessages/Flashmessages.component'
import Loader from '../elements/Loader/Loader.component'
const DefaultLayoutTemplate = ({ children }) => (
    <div className="container default-container">
        <Flashmessages />
        <Loader />
        <div className="row">
            <div className="col">
                {/* Header */}
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