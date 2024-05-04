import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isOpen: false,
  deleteInfo: { title: "", route: "", id: "" },
  reload: false,
  deletable: true,
};
const deleteSlicer = createSlice({
  name: "delete",
  initialState,
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.deleteInfo = action.payload;
      state.deletable = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
    reload(state) {
      state.reload = !state.reload;
    },
    canNotDelete(state) {
      state.deletable = false;
    },
  },
});

export default deleteSlicer.reducer;
export const deleteActions = deleteSlicer.actions;
