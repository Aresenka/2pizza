import React, {Component} from 'react'
import Logo from './logo'
import Navbar from './nav/main'

export default class Header extends Component{
    constructor(props){
        super(props)

        let user = localStorage['appState'] ?
            JSON.parse(localStorage['appState']) :
            {
                authed: false,
                data: {}
            }

        localStorage['appState'] = JSON.stringify(user)

        this.state = {
            user: user,
            auth_error: {
                show: false,
                text: ''
            },
            showLogin: false
        }

        this.authUser = this.authUser.bind(this)
        this.disauthUser = this.disauthUser.bind(this)
        this.closeLogin = this.closeLogin.bind(this)
    }

    closeLogin() {
        this.setState({
            showLogin: false
        })
    }

    authUser(email, password) {
        let data = {
            email: email,
            password: password
        }

        axios
            .post("/api/user/login", data)
            .then(response => {
                if (response.data.success) {
                    let userData = {
                            name: response.data.data.name,
                            id: response.data.data.id,
                            email: response.data.data.email,
                            auth_token: response.data.data.auth_token,
                            timestamp: new Date().toString()
                        },
                        user = {
                            authed: true,
                            data: userData
                        }

                    // save app state with user date in local storage
                    localStorage["appState"] = JSON.stringify(user)

                    this.setState({
                        auth_error: {
                            show: false,
                            text: ''
                        },
                        user: user,
                        showLogin: false
                    })
                } else{
                    this.setState({
                        showLogin: true,
                        auth_error: {
                            show: true,
                            text: response.data.data
                        }
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    disauthUser() {
        let user = {
            authed: false,
            data: {}
        }

        localStorage['appState'] = JSON.stringify(user)

        this.setState({
            user: user
        })
    }

    render(){
        return (
            <header
                id="header"
                className="fixed-top"
            >
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-11 d-flex align-items-center">
                            <Logo title={this.props.companyName}/>
                            <Navbar
                                authError={this.state.auth_error}
                                loginIsOpen={this.state.showLogin}
                                currency={this.props.currency}
                                cart={this.props.cart}
                                cartIsOpen={this.props.cartIsOpen}
                                toggleCart={this.props.toggleCart}
                                changeCount={this.props.changeCount}
                                removeItem={this.props.removeItem}
                                checkoutOrder={this.props.checkoutOrder}
                                authUser={this.authUser}
                                disauthUser={this.disauthUser}
                                closeLogin={this.closeLogin}
                            />
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}
