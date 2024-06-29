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
      state.error = null;
    })
    .addCase(thunks.register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  builder
    .addCase(thunks.refresh.pending, (state) => {
      state.username = null;
      state.token = null;
      state.role = null;
      state.loading = true;
      state.error = null;
    })
    .addCase(thunks.refresh.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    })
    .addCase(thunks.refresh.rejected, (state, action) => {
      state.token = null;
      state.role = null;
      state.loading = false;
      state.error = action.error.message;
    });

  builder
    .addCase(thunks.login.pending, (state) => {
      state.username = null;
      state.token = null;
      state.role = null;
      state.loading = true;
      state.error = null;
    })
    .addCase(thunks.login.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.role = "ROLE_USER";
      state.loading = false;
      state.error = null;
    })
    .addCase(thunks.login.rejected, (state, action) => {
      state.username = null;
      state.token = null;
      state.role = null;
      state.loading = false;
      state.error = action.error.message;
    });
}
