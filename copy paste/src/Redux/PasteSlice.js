import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Paste:localStorage.getItem("Paste")
   ? JSON.parse(localStorage.getItem("Paste"))
   : []
    
}

export const PasteSlice = createSlice({
  name: 'Paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
      
    },
    updateToPastes: (state,action) => {
      
    },
    resetAllPastes: (state, action) => {
      
    },
    removeFromPastes: (state,action) =>{

    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes,removeFromPastes } = PasteSlice.actions

export default PasteSlice.reducer