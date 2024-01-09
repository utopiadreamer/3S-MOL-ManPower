import { configureStore} from '@reduxjs/toolkit';
import languageReducer from '../language/languageSlice';
import layoutHeaderReducer from '../layout/layoutHeaderSlice';
//"Ducks" pattern or feature-based structure.
// Store

  const store = configureStore({
    reducer: {
      reduxLanguage: languageReducer,      
      layoutHeader: layoutHeaderReducer
    },
  });

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  export default store;