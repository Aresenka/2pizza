import React from 'react'

export default props => {
    //If component tagged as empty return div with placeholder
    if (props.empty) {
        return (
            <div className='cart-item-placeholder'>
                Your cart is empty!
            </div>
        )
    } else {
        //Else init content
        let item = props.item

        //Handle item's count change
        function handleChange(e) {
            let item = e.target,
                value = item.value,
                id = props.item.id

            //Filter [e0\+\-] values
            if(!value || value <= 0){
                e.preventDefault()
            }else{
                props.changeCount(id, value)
            }
        }

        //Handle remove item click
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
                        value={item.count}
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
