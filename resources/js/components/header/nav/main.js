import React from 'react'
import UserNav from './user/main'
import AdminNav from './admin/main'
import Cart from './cart/main'
import {Switch, Route} from "react-router-dom"

export default props => {
    return (
        <div>
            <nav className="nav-menu">
                <Switch>
                    <Route exact path='/'>
                        <UserNav empty={props.cart.filter(item => item).length === 0}/>
                        <Cart
                            items={props.cart}
                            currency={props.currency}
                            cartIsOpen={props.cartIsOpen}
                            toggleCart={props.toggleCart}
                            changeCount={props.changeCount}
                            removeItem={props.removeItem}
                            checkoutOrder={props.checkoutOrder}
                        />
                    </Route>
                    <Route path='/admin'>
                        <AdminNav/>
                    </Route>
                </Switch>
            </nav>
        </div>
    )
}
