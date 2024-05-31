import * as thunks from './thunks';

export const reducers = {};

export const extraReducers = (builder) => {
  builder
    .addCase(thunks.fetchVolunteers.pending, (state) => {
      state.loading = true;
    })
    .addCase(thunks.fetchVolunteers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(thunks.fetchVolunteers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  builder
    .addCase(thunks.createVolunteer.pending, (state) => {
      state.loading = true;
    })
    .addCase(thunks.createVolunteer.fulfilled, (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    })
    .addCase(thunks.createVolunteer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  builder
    .addCase(thunks.fetchVolunteer.pending, (state) => {
      state.loading = true;
    })
    .addCase(thunks.fetchVolunteer.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload;
    })
    .addCase(thunks.fetchVolunteer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  builder
    .addCase(thunks.updateVolunteer.pending, (state) => {
      state.loading = true;
    })
    .addCase(thunks.updateVolunteer.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.map((volunteer) => {
        if (volunteer.id === action.payload.id) {
          return action.payload;
        }
        return volunteer;
      });
    })
    .addCase(thunks.updateVolunteer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  builder
    .addCase(thunks.deleteVolunteer.pending, (state) => {
      state.loading = true;
    })
    .addCase(thunks.deleteVolunteer.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter((volunteer) => volunteer.id !== action.payload);
    })
    .addCase(thunks.deleteVolunteer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

  builder
    .addCase(thunks.fetchVolunteerProfile.pending, (state) => {
      state.loading = true;
    })
    .addCase(thunks.fetchVolunteerProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    })
    .addCase(thunks.fetchVolunteerProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
}
