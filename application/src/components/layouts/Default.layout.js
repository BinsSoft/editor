import React from 'react';
import { Route } from 'react-router-dom';
import Flashmessages from '../elements/FlashMessages/Flashmessages.component'
import Header from './layout_elements/Header.component';
const DefaultLayoutTemplate = ({ children }) => (
    <div className="main-container default-container">
        <Flashmessages />
        <Header/>
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