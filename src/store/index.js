import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './Auth'
import expenseSlice from './Expense';
import themeSlice from "./themeSlice";


const store = configureStore({
    reducer : {auth : AuthSlice, expense:expenseSlice, theme : themeSlice}
})

export default store