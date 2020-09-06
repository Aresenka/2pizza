import React from 'react'
import Deals from './deals/main'
import About from './about/main'
import Menu from './menu/main'

export default props => {
    return (
        <main id='main'>
            <Deals
                id='deals'
                items={[
                    {
                        icon: 'flame-outline',
                        title: 'Two drinks for two pizzas',
                        text: 'Order two pizzas and get two free drinks for your choice!'
                    },
                    {
                        icon: 'pizza-outline',
                        title: 'Every third pizza for free',
                        text: 'Doesn\'t matter, how and when you bought two pizzas - third one will cost nothing!'
                    },
                    {
                        icon: 'thumbs-up-outline',
                        title: 'Pizza with drink for review',
                        text: 'Get us a review in any of your social media accounts and we will give you free pizza and drink!'
                    }
                ]}
            />
            <Menu
                id='menu'
                data={props.menu}
                currencies={props.currencies}
                currency={props.currency}
                addToCart={props.addToCart}
                changeCurrency={props.changeCurrency}
            />
            <About
                text='We are probably the best pizzeria in this city.
                We work hard to make to please you.
                We love our every client and do our best to you can have the best food you ever can imagine.
                We use only natural ingredients, only authentic recipes from Italy and try to do as less harm to environment as we can.
                What are you waiting for? Order some pizza!'
                items={[
                    {
                        title: 'Our mission',
                        text: 'All we want is to make such a delicious meal that you will want to kiss our chef!',
                        icon: 'heart-outline'
                    },
                    {
                        title: 'Our philosophy',
                        text: 'It is simple as one-two-three:' +
                            '\n1) Use only natural ingredients;' +
                            '\n2) Use only authentic recipes and instruments;' +
                            '\n3) Do our job with love and care of environment!',
                        icon: 'bulb-outline'
                    },
                    {
                        title: 'Our team',
                        text: 'Our chefs studied in Italy, our staff always happy to see you and every (not) team member is happy to work in such place!',
                        icon: 'boat-outline'
                    }
                ]}
            />
        </main>
    )
}
