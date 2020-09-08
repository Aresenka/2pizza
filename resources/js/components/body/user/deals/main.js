import React from 'react'
import Item from './item'

export default props => {
    let deals = props.items.map((item, i) => {
        let icon = <ion-icon name={item.icon}/>

        return (
            <Item
                key={'deal_'+i}
                icon={icon}
                title={item.title}
                text={item.text}
            />
        )
    })

    return (
        <section id="deals">
            <div className="container">
                <div className="row">
                    {deals}
                </div>
            </div>
        </section>
    )
}
