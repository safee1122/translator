import { configureStore } from "@reduxjs/toolkit";
import translatorReducer from "../features/translator/reducer";
import api from "./middleware/apiTranslator";

export const store = configureStore({
  reducer: {
    translator: translatorReducer,
  },
  middleware: [api],
});
