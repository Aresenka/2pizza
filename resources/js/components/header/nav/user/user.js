import React, {Component} from 'react'
import Popover from '../profile/main'
import Modal from '../profile/modal'

export default class User extends Component{
    constructor(props){
        super(props)

        this.state = {
            isOpen: false,
            isAdmin: false
        }
    }

    render(){
        return (
            <li>
                <a
                    id="profile"
                    className='profile pointer'
                >
                    <ion-icon
                        name="person-circle-outline"
                        size='large'
                    />
                </a>
            </li>
        )
    }
}
