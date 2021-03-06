import React, {Component} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom"
import ReactDOM from 'react-dom'
import Header from './header/main'
import Intro from './body/user/intro/main'
import UserContent from './body/user/main'
import AdminRoute from './body/admin/main'
import Checkout from './body/user/checkout/main'
import Alert from './body/alert'
import Footer from './footer/main'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            project_name: '',
            currencies: [],
            current_currency: {
                id: 0,
                data: {
                    id: 0,
                    code: '',
                    symbol: ''
                }
            },
            menu: {},
            cart: [],
            cartIsOpen: false,
            checkout: false,
            alert: {
                isOpen: false,
                text: '',
                color: ''
            }
        }

        this.toggleCart = this.toggleCart.bind(this)
        this.addToCart = this.addToCart.bind(this)
        this.removeFromCart = this.removeFromCart.bind(this)
        this.changeItemCount = this.changeItemCount.bind(this)
        this.toggleCheckoutModal = this.toggleCheckoutModal.bind(this)
        this.placeOrder = this.placeOrder.bind(this)
        this.changeCurrency = this.changeCurrency.bind(this)
    }

    //Get settings, currencies and menu and add it to App state
    componentDidMount() {
        //Get settings and currencies
        axios.get('/api/settings')
            .then(response => {
                let settings = response.data

                //Set site title
                document.title = settings['site title']

                //Get all meals
                axios.get('/api/menu/0')
                    .then(response => {
                        let menu = {}

                        //Use meal id as key in associative menu array
                        response.data.map(item => {
                            menu[item.id] = item
                        })

                        this.setState({
                            project_name: settings['project name'],
                            currencies: settings.currencies,
                            current_currency: {
                                id: settings['default currency'],
                                data: settings.currencies[settings['default currency']]
                            },
                            menu: menu
                        })
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    //Handle last item deleted from cart or item added to empty cart
    componentDidUpdate(prevProps, prevState) {
        //If user deleted last item in the cart close checkout modal
        if (this.state.cart.filter(item => item).length === 0 && this.state.checkout) {
            this.setState({
                checkout: false,
                cartIsOpen: false
            })
        } else if (
            prevState.cartIsOpen &&
            ((
                    prevState.cart.filter(item => item).length === 0 &&
                    this.state.cart.filter(item => item).length !== 0
                ) ||
                (
                    this.state.cart.filter(item => item).length === 0 &&
                    prevState.cart.filter(item => item).length !== 0
                ))
        ) {
            //If cart was open and empty before user added item to it
            //Or cart was open and user deleted last item in the cart
            //Reopen the cart to avoid uncontrolled width change
            this.setState({
                cartIsOpen: false
            })
            setTimeout(this.toggleCart, 0)
        }
    }

    //Cart methods

    //Toggle cart is open state
    toggleCart() {
        this.setState({cartIsOpen: !this.state.cartIsOpen})
    }

    //Add item to the cart or increase it count if item already in the cart
    addToCart(id, count = 1) {
        //Clone cart array to avoid mutations
        let cart = [...this.state.cart]

        if (cart[id]) {
            //If item with such id already in the cart increase it count
            let item = {...cart[id]}

            item.count += count
            cart[id] = item
        } else {
            //Push item to cart
            let meal = {...this.state.menu[id]}

            meal.count = count
            cart[id] = meal
        }

        this.setState({
            cart: cart
        })
    }

    //Delete item from the cart
    removeFromCart(id) {
        //Clone cart to avoid mutations
        let cart = [...this.state.cart]

        delete cart[id]

        this.setState({cart: cart})
    }

    //Change item count
    changeItemCount(id, count) {
        //Clone both cart and item to avoid mutations
        let cart = [...this.state.cart],
            item = {...cart[id]}

        item.count = count
        cart[id] = item

        this.setState({cart: cart})
    }

    //Order checkout methods

    //Toggle checkout modal window visibility
    toggleCheckoutModal() {
        this.setState({
            cartIsOpen: false,
            checkout: !this.state.checkout
        })
    }

    //Send order data to server, empty the cart, close checkout modal window and show alert with server message
    placeOrder(order) {
        axios.post('/api/order/add', order)
            .then(response => {
                this.setState({
                    cart: [],
                    checkout: false,
                    alert: {
                        isOpen: true,
                        color: 'success',
                        text: response.data
                    }
                })

                //Close alert after two seconds
                setTimeout(
                    () => {
                        this.setState({
                                alert: {
                                    isOpen: false,
                                    color: '',
                                    text: ''
                                }
                            }
                        )
                    },
                    2000
                )
            })
    }

    //Currency methods

    //Change selected currency
    changeCurrency(id) {
        //Clone cart to aviod mutations
        let cart = [...this.state.cart]

        //Change each items price in the cart
        cart.filter(i => i).map(item => {
            let currency_id = this.state.current_currency.id,
                prices = this.state.menu[item.id].meal_prices,
                price = 0

            //Get price for current currency
            prices.map(item => {
                if (+item.currency_id === +currency_id) {
                    price = item.meal_price
                }
            })

            //Update item in the cart
            item = {...item}
            item.price = price
            cart[item.id] = item
        })

        this.setState({
            current_currency: {
                id: id,
                data: this.state.currencies[id]
            },
            cart: cart
        })
    }

    render() {
        //Define checkout modal if it should be shown
        const checkout = this.state.checkout ?
            <Checkout
                items={this.state.cart}
                placeOrder={this.placeOrder}
                closeModal={this.toggleCheckoutModal}
                changeCount={this.changeItemCount}
                removeItem={this.removeFromCart}
                currency={this.state.current_currency}
            /> :
            null

        return (
            <Router>
                <div id="body">
                    <Header
                        companyName={this.state.project_name}
                        currency={this.state.current_currency}
                        cart={this.state.cart}
                        cartIsOpen={this.state.cartIsOpen}
                        toggleCart={this.toggleCart}
                        changeCount={this.changeItemCount}
                        removeItem={this.removeFromCart}
                        checkoutOrder={this.toggleCheckoutModal}
                    />

                    <Switch>
                        <Route exact path='/'>
                            <Intro
                                items={[
                                    {
                                        src: 'images/intro-carousel/1.jpg',
                                        title: 'Best pizza in the city',
                                        text: 'We make best pizzas in this city. Try it out!'
                                    },
                                    {
                                        src: 'images/intro-carousel/2.jpg',
                                        title: 'Stone oven',
                                        text: 'We use authentic pizza oven for baking. That makes our pizzas so tasty!'
                                    },
                                    {
                                        src: 'images/intro-carousel/3.jpg',
                                        title: 'Natural ingredients',
                                        text: 'We use only natural ingredients and all of our processes are eco-friendly!'
                                    },
                                    {
                                        src: 'images/intro-carousel/4.jpg',
                                        title: 'Great deals',
                                        text: 'We are glad to offer you our deals, new for each month!'
                                    }
                                ]}
                            />
                            <UserContent
                                menu={this.state.menu}
                                currencies={this.state.currencies}
                                currency={this.state.current_currency}
                                addToCart={this.addToCart}
                                changeCurrency={this.changeCurrency}
                            />
                            {checkout}
                            <Alert
                                isOpen={this.state.alert.isOpen}
                                color={this.state.alert.color}
                                text={this.state.alert.text}
                            />
                        </Route>
                        <AdminRoute path='/admin'/>
                        <Redirect to='/'/>
                    </Switch>
                    <Footer companyName={this.state.project_name}/>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))
