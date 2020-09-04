import React from 'react'
import Item from './formItem'

export default props => {
        return (
            <div className='order-form row'>
                <Item
                    className='col-12 col-md-6 order-form-name'
                    input_id='form-name'
                    label='Name*'
                    placeholder='Enter your name'
                    error={props.errors.name.value}
                    error_text={props.errors.name.text}
                />
                <Item
                    className='col-12 col-md-6 order-form-phone'
                    input_id='form-phone'
                    label='Phone number'
                    placeholder='Enter your phone'
                    error={props.errors.phone.value}
                    error_text={props.errors.phone.text}
                />
                <Item
                    className='col-12 mt-2 order-form-address'
                    input_id='form-address'
                    label='Delivery address'
                    placeholder='Enter delivery address'
                    error={props.errors.address.value}
                    error_text={props.errors.address.text}
                />
            </div>
        )
}
