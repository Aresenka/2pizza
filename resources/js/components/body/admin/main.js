import React from 'react'
import {Switch, Route, Redirect, useRouteMatch} from "react-router-dom"
import Orders from './orders/main'

export default props => {
    let match = useRouteMatch()

    return (
        <main
            id='main'
            className='admin'
        >
            <Switch>
                <Route exact path={match.path}>
                    <Redirect to={`${match.path}/orders`}/>
                </Route>
                <Route path={`${match.path}/orders`}>
                    <Orders />
                </Route>
                <Redirect to={`${match.path}/orders`}/>
            </Switch>
        </main>
    )
}
