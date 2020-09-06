import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Item from './item'
import Changer from '../currency/main'

export default class Filters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            changerIsOpen: false
        }

        this.changeFilter = this.changeFilter.bind(this)
        this.toggleChanger = this.toggleChanger.bind(this)
    }

    componentDidMount() {
        axios.get('/api/categories')
            .then(response => {
                this.setState({
                    categories: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    changeFilter(id) {
        this.props.updateCurrent(id)
    }

    toggleChanger() {
        this.setState({
            changerIsOpen: !this.state.changerIsOpen
        })
    }

    handleClick() {

    }

    render() {
        let defaultFilter = (
                <Item
                    id={0}
                    title='All'
                    selected={+this.props.current === 0}
                    changeFilter={this.changeFilter}
                />
            ),
            filters = this.state.categories.map(category => {
                return (
                    <Item
                        key={category.id}
                        id={category.id}
                        title={category.meal_cat_title}
                        selected={category.id === +this.props.current}
                        changeFilter={this.changeFilter}
                    />
                )
            })

        return (
            <div className='row'>
                <div className='col-lg-12'>
                    <Changer
                        currencies={this.props.currencies}
                        currency={this.props.currency}
                        changeCurrency={this.props.changeCurrency}
                    />
                    <ul id='menu-filters'>
                        {defaultFilter}
                        {filters}
                    </ul>
                </div>
            </div>
        )
    }
}

Filters.propTypes = {
    data: PropTypes.array,
    current: PropTypes.number
}
