// features/theme/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false, // default is light
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("theme", state.darkMode ? "dark" : "light");
    },
    loadTheme: (state) => {
      const saved = localStorage.getItem("theme");
      state.darkMode = saved === "dark";
      // console.log("darkmode",darkMode)
    },
  },
});

export const { toggleTheme, loadTheme } = themeSlice.actions;
export default themeSlice.reducer;
