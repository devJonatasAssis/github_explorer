import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Repositorios from '../pages/Repositorios';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Dashboard}/>
        <Route path="/repositorios/:repository+" component={Repositorios}/>
    </Switch>
)

export default Routes;
