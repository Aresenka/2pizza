import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Item from './item'
import Details from './details'

export default class Items extends Component {
    constructor(props) {
        super(props)

        this.state = {
            details: null
        }

        this.parseItems = this.parseItems.bind(this)
        this.showDetails = this.showDetails.bind(this)
        this.hideDetails = this.hideDetails.bind(this)
    }

    //Filter items with selected category
    parseItems() {
        return Object.values(this.props.data).map(item => {
            //I don't know, how to fix price changing through props, so I use one logic twice, sorry :C
            item.price = 0

            item.meal_prices.map(price => {
                let item_id = +price.currency_id,
                    current_currency = +this.props.currency.id

                if (item_id === current_currency) {
                    item.price = price.meal_price
                }
            })

            //Return item if selected category is All or item's category is same as selected
            if (!this.props.category ||
                (this.props.category && +this.props.category === item.category_id)) {
                return (
                    <Item
                        key={'menu_item_' + item.id}
                        item={item}
                        showDetails={this.showDetails}
                        addToCart={this.props.addToCart}
                        currency={this.props.currency.data}
                    />
                )
            }
        })
    }

    //Display details modal window
    showDetails(id) {
            //I don't know, how to fix price changing through props, so I use one logic twice, sorry :C
        let item = this.props.data[id]

        item.meal_prices.map(item => {
            if (+item.currency_id === +this.props.currency.id) {
                item.price = item.meal_price
            }
        })

        this.setState({
            details: <Details
                item={item}
                currency={this.props.currency.data.symbol}
                closeModal={this.hideDetails}
                addToCart={this.props.addToCart}
            />
        })
    }

    //Hide details modal window
    hideDetails() {
        this.setState({details: null})
    }

    render() {
        return (
            <div className='row menu-container'>
                {this.parseItems()}
                {this.state.details}
            </div>
        )
    }
}

Items.defaultProps = {
    data: PropTypes.array
}
