import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const PasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      // Defensive check
      if (!paste.title || !paste.content) {
        toast.error("Cannot create empty paste.");
        return;
      }

      const alreadyExists = state.pastes.find(p => p.title === paste.title && p.content===paste.content);

      if (alreadyExists) {
        toast("Paste already exists. Skipping...");
        console.log("paste is already exist");
        return;
      }


     
      const updated = [...state.pastes, paste];
      state.pastes = updated; 
      
      // console.log("State Pastes:", state.pastes);/// stuck  for 3 hours
      
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully");
    },
    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;

      // Defensive check to ensure that both title and content are valid
      if (!updatedPaste.title || !updatedPaste.content) {
        toast.error("Cannot update to empty paste.");
        return;
      }
    
      // Find the index of the paste that needs to be updated by matching _id
      const index = state.pastes.findIndex(p => p._id === updatedPaste._id);
    
      if (index === -1) {
        // Paste not found, handle as needed (e.g., show an error)
        toast.error("Paste not found. Cannot update.");
        return;
      }
    
      // Update the paste at the found index
      state.pastes[index] = updatedPaste;
    
      // Update the local storage with the new state
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    
      toast.success("Paste Updated Successfully");
    
      console.log("Updated Paste:", updatedPaste);
      console.log("Updated State:", state.pastes);
    },
    resetAllPastes: (state, action) => {
      state.pastes =[];
      localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload; // The ID of the paste to remove

  // Defensive check if pasteId is valid
  if (!pasteId) {
    toast.error("Invalid paste ID.");
    return;
  }

  // Find the index of the paste to be removed by matching the _id
  const pasteIndex = state.pastes.findIndex(p => p._id === pasteId);

  if (pasteIndex === -1) {
    // Paste not found, handle as needed (e.g., show an error)
    toast.error("Paste not found. Cannot remove.");
    return;
  }

  // Remove the paste at the found index
  state.pastes.splice(pasteIndex, 1);

  // Update local storage with the updated state
  localStorage.setItem("pastes", JSON.stringify(state.pastes));

  // toast.success("Paste Removed Successfully");

  console.log("State after removal:", state.pastes);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  PasteSlice.actions;

export default PasteSlice.reducer;
