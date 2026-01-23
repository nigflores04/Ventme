import { RootState } from '../index'

export const selectUser = (state: RootState) => state.user.user
export const selectToken = (state: RootState) => state.user.token
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated
export const selectIsLoading = (state: RootState) => state.user.isLoading
export const selectUserState = (state: RootState) => state.user
