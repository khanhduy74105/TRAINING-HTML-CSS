// import addProduct from "./addProduct";
// import getCartProducts from "./getCartProducts";
// import getUserInfo from "./getUserInfo";
// import updateCartProduct from "./updateCartProduct";
// import getProducts from "./getProducts";
// import deleteCartProduct from "./deleteCartProduct";
// import logoutUser from "./logoutUser";
import myFetch from "@/hooks/myFetch";

const addProduct = (product_id: string) =>
  myFetch("cart-products", "POST", {
    product_id: product_id,
  });
const getCartProducts = async () => {
  const response = await myFetch("cart-products/my", "GET");
  const items = response.data.map((current: any) => ({
    item: current.product_id,
    amount: current.quantity,
    _id: current._id,
  }));
  return items;
};
const getUserInfo = () => myFetch("users/me", "GET");
const updateCartProduct = (_id: string, amount: number) =>
  myFetch("cart-products", "PUT", {
    cart_product_id: _id,
    quantity: amount,
  });
const getProducts = () => myFetch("products", "GET");
const logoutUser = () => myFetch("users/logout", "POST");
const deleteCartProduct = (id: string) =>
  myFetch(`cart-products/${id}`, "DELETE");

const loginUser =  (body: any) => {
  const response = myFetch('users/login', 'POST', body)
  
  
  return response

}
const registerUser =  (body: any) => {
  const response = myFetch('users/register', 'POST', body)
  
  
  return response

}

const ClientService = {
  addProduct,
  getCartProducts,
  getUserInfo,
  updateCartProduct,
  getProducts,
  deleteCartProduct,
  loginUser,
  logoutUser,
  registerUser
};
export default ClientService;
