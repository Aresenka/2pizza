import React, {Component} from 'react'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import Alert from '../../../body/alert'

export default class Login extends Component{
    constructor(props) {
        super(props)

        this.state = {
            error: this.props.error
        }

        this.handleClick = this.handleClick.bind(this)
    }

    //Auth user after submit button click
    handleClick(){
        let email = document.getElementById('auth_email').value,
            password = document.getElementById('auth_password').value

        //Try to auth user
        this.props.authUser(email, password)

        //If user authed without errors close login modal
        setTimeout(()=>{
            if(!this.props.error.show){
                this.props.closeModal()
            }
        }, 100)
    }

    render(){
        const error = this.props.error

        return (
            <Modal
                isOpen={this.props.showModal}
                toggle={this.props.closeModal}
            >
                <ModalHeader toggle={this.props.closeModal}>
                    Log in
                </ModalHeader>
                <ModalBody>
                    <div className='row'>
                        <div className='col-12 text-center'>
                            <Alert
                                isOpen={error.show}
                                color='danger'
                                text={error.text}
                            />
                        </div>
                        <div className='col-12 mb-2'>
                            <label htmlFor='auth_email'>
                                Email
                            </label>
                            <input
                                id='auth_email'
                                type='text'
                                className='form-control'
                                placeholder='your@email.com'
                            />
                        </div>
                        <div className='col-12'>
                            <label htmlFor='auth_password'>
                                Password
                            </label>
                            <input
                                id='auth_password'
                                type='password'
                                className='form-control'
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className='d-block'>
                    <div className='col-12 text-right'>
                        <Button
                            color="success"
                            onClick={this.handleClick}
                        >
                            Submit
                        </Button>
                    </div>
                </ModalFooter>
            </Modal>
        )
    }
}
