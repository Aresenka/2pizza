import React, {Component} from 'react'
import Table from './table'
import Alert from "../../alert";

export default class Orders extends Component {
    constructor(props) {
        super(props)

        //Grab auth token from localStorage
        let user = JSON.parse(localStorage['appState']).data,
            token = user.auth_token

        this.state = {
            token: token,
            orders: [],
            alert: {
                show: false,
                text: ''
            }
        }

        this.updateOrder = this.updateOrder.bind(this)
    }

    //Get all orders
    componentDidMount() {
        let orders = []

        axios.get(`/api/admin/order/get/all?token=${this.state.token}`)
            .then(response => {
                let data = response.data

                //Parse orders
                data.map(item => {
                    let order = {
                        id: item.id,
                        name: item.order_client_name,
                        phone: item.order_client_phone,
                        address: item.order_client_address,
                        items: item.order_items.map(order_item => {
                            return {
                                title: order_item.meal_title,
                                count: order_item.meals_count
                            }
                        }),
                        total: `${item.order_total}${item.order_currency.currency_symbol}`,
                        status: item.order_status,
                        comment: item.order_comment,
                        created: (new Date(item.created_at)).toLocaleDateString(),
                        updated: item.updated_at === item.created_at
                            ? 'Never'
                            : (new Date(item.updated_at)).toLocaleDateString()
                    }

                    orders.push(order)
                })

                this.setState({
                    orders: orders
                })
            })
    }

    //Update order's state and comment
    updateOrder(data) {
        data['token'] = this.state.token

        axios.post('/api/admin/order/update', data)
            .then(response => {
                //Show alert with server message
                this.setState({
                    alert: {
                        show: true,
                        text: response.data
                    }
                })

                //Hide alert after two seconds
                setTimeout(() => {
                    this.setState({
                        alert: {
                            show: false,
                            text: ''
                        }
                    })
                }, 2000)
            })
    }

    render() {
        const orders = [...this.state.orders]

        return (
            <div className='container py-3'>
                <h2>
                    Orders
                </h2>
                <div className='col-12'>
                    <Table
                        data={orders}
                        updateOrder={this.updateOrder}
                    />
                </div>
                <Alert
                    isOpen={this.state.alert.show}
                    color='success'
                    text={this.state.alert.text}
                />
            </div>
        )
    }
}
