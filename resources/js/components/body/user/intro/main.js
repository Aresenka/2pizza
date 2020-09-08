import React from 'react'
import Item from './item'

export default props => {
    let indicators = [],
        items = []

    //Init indicators (lines in the bottom of intro show which item is showed) and intro items
    props.items.map((item, i) => {
        indicators.push(
            <li
                key={'indicator_' + i}
                data-target="#introCarousel"
                data-slide-to={i}
                className='active'
            />
        )
        items.push(
            <Item
                key={'intro_' + i}
                item_id={i}
                src={"url(" + item.src + ")"}
                title={item.title}
                text={item.text}
            />
        )
    })

    return (
        <section id="intro">
            <div className="intro-container">
                <div
                    id="introCarousel"
                    className="carousel slide carousel-fade"
                    data-ride="carousel"
                >
                    <ol className="carousel-indicators">
                        {indicators}
                    </ol>
                    <div
                        className="carousel-inner"
                        role="listbox"
                    >
                        {items}
                    </div>
                    <a
                        className="carousel-control-prev"
                        href="#introCarousel"
                        role="button"
                        data-slide="prev"
                    >
                        <ion-icon name="chevron-back-outline"/>
                        <span className="sr-only">
                            Previous
                        </span>
                    </a>
                    <a
                        className="carousel-control-next"
                        href="#introCarousel"
                        role="button"
                        data-slide="next"
                    >
                        <ion-icon name="chevron-forward-outline"/>
                        <span className="sr-only">
                            Next
                        </span>
                    </a>
                </div>
            </div>
        </section>
    )
}
