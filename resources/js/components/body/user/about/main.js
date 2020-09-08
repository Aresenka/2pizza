import React from 'react'
import Item from './item'

export default props => {
    //It should be only three sections displayed
    let items = props.items.map((item, i) => {
        if(i < 3){
            return <Item
                key={'about_'+i}
                title={item.title}
                text={item.text}
                src={'images/about/'+i+'.jpg'}
                icon={item.icon}
            />
        }
    })

    return (
        <section id="about">
            <div className="container aos-init aos-animate">
                <header className="section-header">
                    <h3>
                        About Us
                    </h3>
                    <p>
                        {props.text}
                    </p>
                </header>
                <div className="row about-cols">
                    {items}
                </div>
            </div>
        </section>
)
}
