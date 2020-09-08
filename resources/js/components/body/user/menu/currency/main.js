import React, {Component} from 'react'
import Item from './item'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            new_id: 0
        }

        this.toggle = this.toggle.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    //Toggle currencies list visibility
    toggle(id = null) {
        if (id) {
            this.setState({
                isOpen: !this.state.isOpen,
                new_id: id
            })
        } else {
            this.setState({
                isOpen: !this.state.isOpen,
            })
        }
    }

    //Handle click to currency from currencies list
    handleClick(e) {
        let id = e.target.dataset.id
        this.toggle(id)
    }

    //Set new currency equal to current currency
    componentDidMount() {
        this.setState({
            new_id: this.props.currency.id
        })
    }

    //Change currency if clicked to not current currency
    componentDidUpdate(prevProps, prevState) {
        if (prevState.new_id !== this.state.new_id) {
            this.props.changeCurrency(this.state.new_id)
        }
    }

    render() {
        //Init currencies list if it should be visible
        const listClass = this.state.isOpen ? 'currency-list' : 'currency-list hide',
            list = Object.values(this.props.currencies).map(item => {
                //Return all currencies except current one
                if (+item.id !== +this.props.currency.id) {
                    return (
                        <Item
                            key={'currency_' + item.id}
                            currency={item}
                            changeCurrency={this.handleClick}
                        />
                    )
                }
            })

        return (
            <div className='currency-changer'>
                <div
                    className='current-currency'
                    onClick={this.handleClick}
                >
                    {this.props.currency.data.code}
                </div>
                <ul className={listClass}>
                    {list}
                </ul>
            </div>
        )
    }
}
