import React, {Component} from 'react'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

export default class Details extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 1
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    //Add item to the cart or increase it's count
    handleClick(e) {
        let id = e.target.dataset.id,
            count = this.state.count
        this.props.addToCart(id, +count)
        this.props.closeModal()
    }

    //Handle item's count change
    handleChange(e) {
        let value = e.target.value

        if (value && value > 0) {
            this.setState({
                count: +e.target.value
            })
        }
    }

    render() {
        return (
            <Modal
                isOpen={true}
                toggle={this.props.closeModal}
            >
                <ModalHeader toggle={this.props.closeModal}>
                    {this.props.item.meal_title}
                </ModalHeader>
                <ModalBody>
                    <div className='row'>
                        <div className='col-12 col-md-6 mb-2'>
                            <img
                                src={'/images/meals/' + this.props.item.meal_pic}
                                className='modal-image'
                            />
                        </div>
                        <div className='col-12 col-md-6'>
                            <div className='col-12 mb-2'>
                                {this.props.item.meal_desc}
                            </div>
                            <div className='col-12'>
                                <strong>Price: </strong>
                                {this.props.item.price + this.props.currency}
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='d-block'>
                    <div className='row'>
                        <div className='col-3'>
                            <input
                                id='details-count'
                                type='number'
                                className='form-control'
                                value={this.state.count}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='col-5 text-left'>
                            <Button
                                color="primary"
                                data-id={this.props.item.id}
                                onClick={this.handleClick}
                            >
                                Add to cart
                            </Button>
                        </div>
                        <div className='col-4 text-right'>
                            <Button
                                color="secondary"
                                onClick={this.props.closeModal}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </ModalFooter>
            </Modal>
        )
    }
}
