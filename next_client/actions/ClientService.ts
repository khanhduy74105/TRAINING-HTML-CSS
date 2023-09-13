// import addProduct from "./addProduct";
// import getCartProducts from "./getCartProducts";
// import getUserInfo from "./getUserInfo";
// import updateCartProduct from "./updateCartProduct";
// import getProducts from "./getProducts";
// import deleteCartProduct from "./deleteCartProduct";
// import logoutUser from "./logoutUser";
import useFetch from "@/hooks/useFetch";
import { ICartProduct } from "@/types";

const addProduct = (product_id: string) =>  useFetch('cart-products', 'POST', {
    product_id: product_id
})
const getCartProducts =()=> useFetch('cart-products/my','GET')
const getUserInfo = () => useFetch('users/me', 'GET')
const updateCartProduct = (_id: string, amount: number) => useFetch('cart-products', 'PUT',{
    cart_product_id: _id,
    quantity: amount,
})
const getProducts = (currentCartItems: ICartProduct[]) => useFetch('products','GET')
const logoutUser = () => useFetch('users/logout','POST')
const deleteCartProduct = (id: string) => useFetch(`cart-products/${id}`,'DELETE')
export default {
    addProduct,
    getCartProducts,
    getUserInfo,
    updateCartProduct,
    getProducts,
    deleteCartProduct,
    logoutUser
}