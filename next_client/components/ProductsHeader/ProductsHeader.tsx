import React from 'react'
import UserAccount from '../UserAccount/UserAccount'
import './style.css'
const ProductsHeader = () => {
    return (
        <div className='products-section'>
            <ul className="products-header">
                <li><a href="#" className="active">sofas</a></li>
                <li><a href="#">chairs</a></li>
                <li><a href="#">tables</a></li>
                <li><a href="#">storage</a></li>
                <li><a href="#">beds</a></li>
                <li><a href="#">Accesible</a></li>
                <li>
                    <UserAccount />
                </li>
            </ul>


        </div>
    )
}

export default ProductsHeader