import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension'; // Ajusta la importación
import { thunk } from 'redux-thunk';

import rootReducer from '../Reducer/reducer/index'; // Ajusta la ruta si es necesario

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
