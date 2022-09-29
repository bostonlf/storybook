import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const DEBUG=true;
const configureStore=preloadedState => {
  const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
  const sagaMiddleware=createSagaMiddleware();

  const store = 
    DEBUG?
    createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(sagaMiddleware, logger))):
    createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(sagaMiddleware)));

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

export default configureStore;
