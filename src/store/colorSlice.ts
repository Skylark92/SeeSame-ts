import { createSlice } from '@reduxjs/toolkit';

/*
파랑 = '#6bbfff', '#268fdf'; // 밸런스
초록 = '#99e150', '#34a300'; // 호불호
보라 = '#ce9cf6', '#7e5ed9'; // VS, 음식
분홍 = '#ffa6bc', '#ea6f8d'; // 커플, 사랑
*/

const initialState: ColorState = {
  cardColor: '#268fdf',
  backgroundColor: '#6bbfff',
};

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    CHANGE(state, action) {
      state.cardColor = action.payload.cardColor || '#268fdf';
      state.backgroundColor = action.payload.backgroundColor || '#6bbfff';
      document.body.style.backgroundColor =
        action.payload.backgroundColor || '#6bbfff';
    },
  },
});

export const { CHANGE } = colorSlice.actions;
export default colorSlice.reducer;

interface ColorState {
  cardColor: string;
  backgroundColor: string;
}
