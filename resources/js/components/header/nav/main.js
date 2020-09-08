import React, {Component} from 'react'
import {Switch, Route} from "react-router-dom"
import UserNav from './user/main'
import Cart from './cart/main'
import Modal from './user/login'
import Profile from './user/profile'
import AdminNav from './admin/main'

export default class Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            showProfile: false,
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.toggleProfile = this.toggleProfile.bind(this)
    }

    componentDidMount() {
        this.setState({
            showModal: this.props.loginIsOpen
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.showModal !== this.props.loginIsOpen){
            this.setState({
                showModal: this.props.loginIsOpen
            })
        }
    }

    handleClick() {
        let authed = JSON.parse(localStorage['appState']).authed

        if (!authed) {
            this.setState({
                showModal: true
            })
        }
    }

    handleLogout(){
        this.props.disauthUser()
        this.setState({
            showProfile: false
        })
    }

    toggleProfile(){
        let authed = JSON.parse(localStorage['appState']).authed

        if(authed){
            this.setState({
                showProfile: !this.state.showProfile
            })
        }
    }

    render() {
        return (
            <div>
                <nav className="nav-menu">
                    <Switch>
                        <Route exact path='/'>
                            <UserNav
                                empty={this.props.cart.filter(item => item).length === 0}
                                handleClick={this.handleClick}
                            />
                            <Cart
                                items={this.props.cart}
                                currency={this.props.currency}
                                cartIsOpen={this.props.cartIsOpen}
                                toggleCart={this.props.toggleCart}
                                changeCount={this.props.changeCount}
                                removeItem={this.props.removeItem}
                                checkoutOrder={this.props.checkoutOrder}
                            />
                            <Profile
                                isOpen={this.state.showProfile}
                                toggle={this.toggleProfile}
                                logout={this.handleLogout}
                            />
                            <Modal
                                error={this.props.authError}
                                showModal={this.state.showModal}
                                closeModal={this.props.closeLogin}
                                authUser={this.props.authUser}
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
}
