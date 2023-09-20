import { ICartProduct, ReduxAction } from "@/types";
import {} from "redux";

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!!) : null,
  products: [],
  cartProducts: [],
};

const rootReducer = (state: any = initialState, action: ReduxAction) => {
  switch (action.type) {
    case "user/set":
      return {
        ...state,
        user: action.payload,
      };

    case "cartProducts/add": {
      if (
        state.cartProducts.find(
          (item: ICartProduct) => item._id === action.payload._id
        )
      ) {
        return {
          ...state,
          cartProducts: [...state.cartProducts.map((item: ICartProduct) =>
            item._id !== action.payload._id
              ? item
              : {
                  ...item,
                  amount: action.payload.amount,
                }
          )],
        };
      }
    
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload],
      };
    }
    case "cartProducts/update": {
      console.log(action)
      const newState = {
        ...state,
        cartProducts: [...state.cartProducts.map((item: ICartProduct) =>
          item._id !== action.payload._id
            ? item
            : {
                ...item,
                amount: action.payload.quantity,
              }
        )],
      }
      console.log(newState)
      return  newState
    }
    case "cartProducts/remove":
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          (item: ICartProduct) => item._id !== action.payload
        ),
      };
    case "cartProducts/set": {
      return {
        ...state,
        cartProducts: action.payload,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
