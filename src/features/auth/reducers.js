import * as thunks from "./thunks";

export const reducers = {};

export const extraReducers = (builder) => {
  builder
    .addCase(thunks.register.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunks.register.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    })
    .addCase(thunks.register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  builder
    .addCase(thunks.refresh.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunks.refresh.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    })
    .addCase(thunks.refresh.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  builder
    .addCase(thunks.login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunks.login.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    })
    .addCase(thunks.login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
}
