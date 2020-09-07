import React from 'react'

export default props => {
    let item = props.item

    function handleChange(e) {
        let value = e.target.value

        if(!value || value <= 0){
            e.preventDefault()
        }else{
            props.changeItemCount(props.item.id, value)
        }
    }

    function handleClick() {
        props.removeFromCart(props.item.id)
    }

    return (
        <div className='row order-item'>
            <div className='col-6 col-md-3 mb-3 mb-lg-0'>
                <div className='order-item-image position-relative'>
                    <img
                        src={'/images/meals/' + item.meal_pic}
                        alt={item.meal_title}
                    />
                    <div
                        className='item-remove'
                        onClick={handleClick}
                    />
                </div>
            </div>
            <div className='col-6 col-md-3 order-item-title my-auto'>
                {item.meal_title}
            </div>
            <div className='col-6 col-md-3 my-auto order-item-count'>
                <input
                    type='number'
                    className='form-control'
                    min={1}
                    onChange={handleChange}
                    value={item.count}
                />
            </div>
            <div className='col-6 col-md-3 my-auto order-item-price'>
                {(item.price * item.count) + props.currency}
            </div>
        </div>
    )
}
