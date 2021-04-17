const hasPrefix = (action, prefix) => action.type.startsWith(prefix);
const isPending = (action) => action.type.endsWith("/pending");
const isFulfilled = (action) => action.type.endsWith("/fulfilled");
const isRejected = (action) => action.type.endsWith("/rejected");

export const isPendingAction = (prefix) => (action) => {
  return hasPrefix(action, prefix) && isPending(action);
};

export const isRejectedAction = (prefix) => (action) => {
  return hasPrefix(action, prefix) && isRejected(action);
};

export const isFulfilledAction = (prefix) => (action) => {
  return hasPrefix(action, prefix) && isFulfilled(action);
};

export const withErrorHandler = (payloadCreator) => async (args, thunkAPI) => {
  try {
    return await payloadCreator(args, thunkAPI);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
};
