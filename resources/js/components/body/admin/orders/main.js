import React, {Component} from 'react'
import Table from './table'

export default class Orders extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [
                {
                    items: [],
                }
            ]
        }
    }

    componentDidMount() {
        axios.get('/api/admin/order/get/all')
            .then(response => {
                let data = response.data,
                    orders = []

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
                        created: (new Date(item.created_at)).toLocaleDateString(),
                        updated: item.updated_at === item.created_at
                            ? 'Never'
                            : (new Date(item.updated_at)).toLocaleDateString()
                    }

                    orders.push(order)
                })

                this.setState({data: orders})
            })
    }

    updateOrder(data){
        axios.post('/api/admin/order/update', data)
            .then(response => {
                console.log('test')
            })
    }

    render() {
        const {data} = this.state

        return (
            <div className='container py-3'>
                <h2>
                    Orders
                </h2>
                <div className='col-12'>
                    <Table
                        items={data}
                        updateOrder={this.updateOrder}
                    />
                </div>
            </div>
        )
    }
}
