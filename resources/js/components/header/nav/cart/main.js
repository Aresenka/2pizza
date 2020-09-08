import React from 'react'
import {Popover, PopoverHeader, PopoverBody} from 'reactstrap'
import Item from './item'
import Button from './orderButton'

export default props => {
    let button = null, items, total = null

    //If cart is not empty
    if (props.items.filter(el => el).length > 0) {
        let total_price = 0

        //Init checkout button component
        button = <Button checkoutOrder={props.checkoutOrder}/>

        //Map filtered items to math total price and init item components
        items = props.items.filter(i => i).map(item => {
            item.meal_prices.map(price_item => {
                if(+price_item.currency_id === +props.currency.id){
                    item.price = +price_item.meal_price
                }
            })

            total_price += item.price * item.count

            return (
                <div key={'cart_'+item.id}>
                    <Item
                        item={item}
                        currency={props.currency}
                        empty={false}
                        changeCount={props.changeCount}
                        removeItem={props.removeItem}
                    />
                    <hr/>
                </div>
            )
        })

        //Init row with total price
        total = (
            <div className='cart-total row'>
                <div className='col-6 text-left'>
                    Total:
                </div>
                <div className='col-6 text-right'>
                    {total_price+props.currency.data.symbol}
                </div>
            </div>
        )
    } else {
        //If cart is empty return empty item without both checkout button and total price row
        items = <Item empty={true}/>
    }

    return (
        <Popover
            placement="bottom"
            isOpen={props.cartIsOpen}
            toggle={props.toggleCart}
            target="cart"
        >
            <PopoverHeader>
                Your cart
            </PopoverHeader>
            <PopoverBody>
                {items}
                {total}
                {button}
            </PopoverBody>
        </Popover>
    )
}
