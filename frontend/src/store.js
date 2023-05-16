import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { productsReducers,productsDetailsReducers } from './reducers/productsReducers';
import { authReducer,userReducer,forgotPasswordReducer } from './reducers/userReducers';
import {cartReducer} from './reducers/cartReducers';
const reducer = combineReducers({
   products:productsReducers ,
   productDetails:productsDetailsReducers,
   auth:authReducer,
   user: userReducer,
   cart: cartReducer,
   forgotPassword: forgotPasswordReducer,
})

let initialState = {
   cart: {
      cartItems: localStorage.getItem('cartItems')
          ? JSON.parse(localStorage.getItem('cartItems'))
          : [],
      shippingInfo: localStorage.getItem('shippingInfo')
          ? JSON.parse(localStorage.getItem('shippingInfo'))
          : {}
  }
    
}
const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;