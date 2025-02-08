import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companies:[],
        searchComapnyByText:'',
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany=action.payload;
        },
        setComapnies:(state,action)=>{
            state.companies=action.payload;
        },
        setSearchCompanyByText:(state,action)=>{
            state.searchComapnyByText=action.payload;
        }
    }
});
export const {setSingleCompany, setComapnies, setSearchCompanyByText }=companySlice.actions;
export default companySlice.reducer;