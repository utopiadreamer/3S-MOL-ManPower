import { IBreadcrumbItem } from "@fluentui/react";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LayoutHeaderState {
  pageBreadcrumbItems?: IBreadcrumbItem[];
  maxDisplayedItems?: number;
  overflowIndex?: number;
}

const initialState: LayoutHeaderState = {
  pageBreadcrumbItems: [],
  maxDisplayedItems: 0,
  overflowIndex: 0,
};

const layoutHeaderSlice = createSlice({
  name: "layoutHeader",
  initialState,
  reducers: {
    changeBreadcrumb: (state, action: PayloadAction<IBreadcrumbItem[]>) => {
      return {
        pageBreadcrumbItems: action.payload,
        maxDisplayedItems: undefined,
        overflowIndex: undefined,
      };
    },
  },
});

export const { changeBreadcrumb } = layoutHeaderSlice.actions;
export default layoutHeaderSlice.reducer;
