import React, {Component} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import Item from './item'
import Form from './form'

export default class Checkout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errors: {
                name: {
                    value: false,
                    text: 'Please, enter your name!'
                },
                phone: {
                    value: false,
                    text: 'Please, enter your phone number!'
                },
                address: {
                    value: false,
                    text: 'Please, enter your address!'
                }
            },
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        let items = this.props.items.filter(item => item).map(item => {
                return {
                    id: item.id,
                    count: item.count
                }
            }),
            errors = this.state.errors,
            name = document.getElementById('form-name').value,
            phone = document.getElementById('form-phone').value,
            address = document.getElementById('form-address').value

        if(!name.trim() || !phone.trim() || !address.trim()){
            errors.name.value = !name.trim()
            errors.phone.value = !phone.trim()
            errors.address.value = !address.trim()
            this.setState({errors: errors})
        }else{
            this.props.placeOrder({
                items: items,
                name: name,
                phone: phone,
                address: address,
                total: this.state.total_price,
                currency: this.props.currency.id
            })
        }
    }

    render(){
        let total_price = 0,
            items = this.props.items.filter(i => i).map(item => {
                total_price += item.price * item.count

                return (
                    <div key={'checkout_' + item.id}>
                        <Item
                            item={item}
                            changeItemCount={this.props.changeCount}
                            removeFromCart={this.props.removeItem}
                            currency={this.props.currency.data.symbol}
                        />
                        <hr/>
                    </div>
                )
            }),
            total = (
                <div className='order-total row'>
                    <div className='col-6 text-left'>
                        Total:
                    </div>
                    <div className='col-6 text-right'>
                        {total_price+this.props.currency.data.symbol}
                    </div>
                </div>
            )

        return (
            <Modal
                isOpen={true}
                toggle={this.props.closeModal}
            >
                <ModalHeader toggle={this.props.closeModal}>
                    Order checkout
                </ModalHeader>
                <ModalBody>
                    {items}
                    {total}
                    <hr />
                    <Form errors={this.state.errors}/>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={this.handleClick}
                    >
                        Confirm
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }
}
