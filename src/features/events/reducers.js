import * as thunks from './thunks';

export const reducers = {};

export const extraReducers = (builder) => {
  builder
    .addCase(thunks.fetchEvents.pending, (state) => {
      state.loading = true;
    })
    .addCase(thunks.fetchEvents.fulfilled, (state, action) => {
      state.loading = false;
      const { content, ...pageDetails } = action.payload;
      state.data = content;
      state.pageDetails = pageDetails;
    })
    .addCase(thunks.fetchEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  builder
    .addCase(thunks.createEvent.pending, (state) => {
      state.loading = true;
    })
    .addCase(thunks.createEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    })
    .addCase(thunks.createEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  builder
    .addCase(thunks.fetchEvent.pending, (state) => {
      state.loading = true;
    })
    .addCase(thunks.fetchEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload;
    })
    .addCase(thunks.fetchEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  builder
    .addCase(thunks.deleteEvent.pending, (state) => {
      state.loading = true;
    })
    .addCase(thunks.deleteEvent.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((event) => event.id !== action.payload.id);
    })
    .addCase(thunks.deleteEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
}
