import React, {useState} from 'react'
import {Alert} from 'reactstrap'

export default props => {
    return (
        <Alert
            color={props.color}
            isOpen={props.isOpen}
        >
            {props.text}
        </Alert>
    )
}
