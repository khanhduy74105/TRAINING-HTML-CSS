'use client'

import React, { useState } from 'react'
import './style.css'
import {
    IoCaretForwardOutline,
    IoCaretBackOutline
} from 'react-icons/io5'

const slidesData = [
    {
        id: 1,
        name: 'Danseka design sofa',
        price: 100,
        image: './assets/products/1.webp'
    },
    {
        id: 2,
        name: 'Lorem ipsum dolor snt exri',
        price: 1300,
        image: './assets/products/3.webp'
    },
    {
        id: 3,
        name: 'Magnam laborum adipisci.',
        price: 200,
        image: './assets/products/4.webp'
    },
    {
        id: 4,
        name: 'Cante Amet consectetur ',
        price: 500,
        image: './assets/products/7.webp'
    },
    {
        id: 5,
        name: 'Amet consectetur adipisicing elit',
        price: 430,
        image: './assets/products/6.webp'
    },

]


const CartSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(1)
    const setOnChangeSLide = (type: number) => {
        if (type === -1) {
            console.log('decreas')
            setCurrentSlide(prev => prev === 1 ? 5 : prev - 1)
        }
        if (type === 1) {
            console.log('increas')

            setCurrentSlide(prev => prev === 5 ? 1 : prev + 1)

        }
    }

    return (
        <div className="cart-slider">
            <h6>You may also like</h6>
            <div className="slider">
                {slidesData.map(item => (
                    <div key={item.id} className={`slide row ${item.id === currentSlide && 'show'}`}>
                        <img src={item.image} alt="" className="col-4" />
                        <div className="content col-8">
                            <p>{item.name}</p>
                            <span>{item.price} $</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="slider-control">
                <div className="back-btn btn" onClick={() => setOnChangeSLide(-1)}>
                    <IoCaretBackOutline size={28} />
                </div>
                <div className="dots">
                    <span className="choosen"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="next-btn btn" onClick={() => setOnChangeSLide(1)}>
                    <IoCaretForwardOutline size={28} />
                </div>
            </div>
        </div>
    )
}

export default CartSlider