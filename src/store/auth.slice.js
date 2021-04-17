import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
  withErrorHandler,
} from "../helpers/store";
import { loginService } from "../services/auth.service";

export const AUTH_FEATURE_KEY = "auth";

const initialState = {
  authenticated: false,
  loading: false,
  error: null,
  token: null,
};

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(login())
 * }, [dispatch]);
 * ```
 */
export const login = createAsyncThunk(
  "auth/login",
  withErrorHandler(async (data) => {
    const res = await loginService(data);

    return res;
  })
);

export const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState,
  reducers: {
    logout: (state) => {
      state.authenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.authenticated = true;
        state.token = action;
      })
      .addMatcher(isFulfilledAction(AUTH_FEATURE_KEY), (state) => {
        state.loading = false;
      })
      .addMatcher(isPendingAction(AUTH_FEATURE_KEY), (state) => {
        state.loading = true;
      })
      .addMatcher(isRejectedAction(AUTH_FEATURE_KEY), (state, payload) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

/*
 * Export reducer for store configuration
 */
export const authReducer = authSlice.reducer;

/*
 * Export actions creator to be dispatched.
 *  e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * //...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(authAction.logout())
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const authActions = authSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 *  \\...
 *
 * const authState = useSelector(getAuthState);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
export const getAuthState = (rootState) => rootState[AUTH_FEATURE_KEY];
