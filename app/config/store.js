import { createStore, applyMiddleware, compose } from "redux";

import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";

import reducer from "../reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, thunk];

const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middleware)
    /*window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/
  )
);

sagaMiddleware.run(rootSaga);

export default store;
