import React from 'react';
import {Switch } from 'react-router-dom';
import routeCollection from './route.const';
import DefaultLayout from '../layouts/Default.layout';
const RouterLayer = ()=>{
    let routeDisplayCollection = routeCollection.map((route,i)=>{
      switch(route.layout) {
        case 'DefaultLayout':
        return <DefaultLayout key={i} exact path={route.path} component={route.component}/>
        // case 'AfterLoginLayout':
        // return <AfterLoginLayout key={i} path={route.path} component={route.component}/>
        default: return null;
      }
    });
    return (
      <Switch>
        {routeDisplayCollection}
      </Switch>
    )
  }

export default RouterLayer