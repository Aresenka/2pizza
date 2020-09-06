import React, {useState} from 'react'

export default props => {
    if (props.empty) {
        return (
            <div className='cart-item-placeholder'>
                Your cart is empty!
            </div>
        )
    } else {
        let item=props.item

        const [value, setValue] = useState(item.count)

        function handleChange(e) {
            let item = e.target,
                value = item.value,
                id = props.item.id

            setValue(value)
            props.changeCount(id, value)
        }

        function handleClick(){
            props.removeItem(props.item.id)
        }

        return (
            <div className='cart-item row'>
                <div className='col-md-3 col-6 my-3 my-lg-0'>
                    <div className='cart-image position-relative'>
                        <img
                            src={'/images/meals/'+item.meal_pic}
                            alt={item.meal_title}
                        />
                        <div
                            className='cart-remove'
                            onClick={handleClick}
                        />
                    </div>
                </div>
                <div className='cart-title my-auto col-md-3 col-6 text-sm-right'>
                    {item.meal_title}
                </div>
                <div className='cart-count my-auto col-md-3 col-6'>
                    <input
                        type='number'
                        value={value}
                        min={1}
                        className='form-control cart-count'
                        onChange={handleChange}
                    />
                </div>
                <div className='cart-price my-auto col-md-3 col-6 text-right'>
                    {item.price * item.count + props.currency.data.symbol}
                </div>
            </div>
        )
    }
}
