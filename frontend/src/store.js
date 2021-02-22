import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  arotdarRegisterReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailReducer,
  productReducer,
  productUpdateReducer,
} from './reducers/productReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  productCreate: productCreateReducer,
  productDetails: productDetailReducer,
  productList: productReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderMyList: orderListMyReducer,
  cart: cartReducer,
  orderList: orderListReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
