import React from 'react'
import {Link} from 'react-router-dom'
import {Popover, PopoverBody, PopoverHeader, Button} from 'reactstrap'

export default props => {
    return (
        <Popover
            placement="bottom"
            isOpen={props.isOpen}
            toggle={props.toggle}
            target="profile"
        >
            <PopoverHeader>
                Welcome!
            </PopoverHeader>
            <PopoverBody>
                <div className='profile-body'>
                    <Link to='/admin/orders'>
                        Orders list
                    </Link>
                    <hr/>
                    <div className='col-12 text-center'>
                        <Button
                            className='btn btn-sm btn-primary'
                            onClick={props.logout}
                        >
                            Log out
                        </Button>
                    </div>
                </div>
            </PopoverBody>
        </Popover>
    )
}
