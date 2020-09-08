import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Filters from './filters/main'
import Items from './items/main'

export default class Menu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentCategory: 0
        }

        this.updateCategory = this.updateCategory.bind(this)
    }

    //Update selected category
    updateCategory(id) {
        this.setState({
            currentCategory: +id,
        })
    }

    render() {
        return (
            <section
                id='menu'
                className='section-bg'
            >
                <div
                    className='container'
                >
                    <header className='section-header'>
                        <h3 className='section-title'>
                            Menu
                        </h3>
                    </header>
                    <Filters
                        current={this.state.currentCategory}
                        currencies={this.props.currencies}
                        currency={this.props.currency}
                        updateCurrent={this.updateCategory}
                        changeCurrency={this.props.changeCurrency}
                    />
                    <Items
                        data={this.props.data}
                        category={this.state.currentCategory}
                        addToCart={this.props.addToCart}
                        currency={this.props.currency}
                    />
                </div>
            </section>
        )
    }
}

Menu.propTypes = {
    currentCategory: PropTypes.number,
    menu: PropTypes.array
}
