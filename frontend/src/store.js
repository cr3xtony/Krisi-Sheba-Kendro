import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userDeleteReducer,
  userListReducer,
  userLoginReducer,
} from './reducers/userReducers';
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailReducer,
  productReducer,
  productUpdateReducer,
} from './reducers/productReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,
  productCreate: productCreateReducer,
  productDetails: productDetailReducer,
  productList: productReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
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
