import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  model: "",
  text: "",
  translatedtext: "",
};
const translatorSlice = createSlice({
  name: "translator",
  initialState,
  reducers: {
    setModel: (state, action) => {
      state.model = action.payload.model;
    },
    setText: (state, action) => {
      state.text = action.payload.text;
    },
    setTranslatedText: (state, action) => {
      state.translatedtext = action.payload.translatedtext;
    },
  },
});
export const { setText, setTranslatedText, setModel } = translatorSlice.actions;
export default translatorSlice.reducer;
