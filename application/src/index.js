import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import {HashRouter}  from 'react-router-dom'; 
import RouterLayer from './components/route/RouterLayer';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import Flashmessagereducer from './components/elements/FlashMessages/Flashmessages.reducer'
import LoaderReducer from './components/elements/Loader/Loader.reducer';
import EditorReducer from './components/elements/editor/Editor.reducer';
const store = createStore( combineReducers (
{
    Flashmessagereducer,
    LoaderReducer,
    EditorReducer
}
));
const App = ()=>{
    return (
        <React.Fragment>
            <Provider store={store}>
            <HashRouter>
            <RouterLayer/>
            </HashRouter>
            </Provider>
        </React.Fragment>
    );
}

render (<App/>, document.getElementById("root"));