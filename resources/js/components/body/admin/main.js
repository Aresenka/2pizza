import React from 'react'
import {Switch, Route, Redirect} from "react-router-dom"
import Orders from './orders/main'

export default props => {
    let authed = JSON.parse(localStorage['appState']).authed
    return (
        <Route
            path={props.path}
            render={() => authed === true ?
                <main
                    id='main'
                    className='admin'
                >
                    <Switch>
                        <Route exact path={props.path}>
                            <Redirect to={`${props.path}/orders`}/>
                        </Route>
                        <Route path={`${props.path}/orders`}>
                            <Orders/>
                        </Route>
                        <Redirect to={`${props.path}/orders`}/>
                    </Switch>
                </main> :
                <Redirect to='/'/>
            }
        />
    )
}
