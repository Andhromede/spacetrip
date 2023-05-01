import { createSlice } from '@reduxjs/toolkit';

import { getPayloadToken, isTokenValid, setToken } from '../services/tokenServices';

/**
 * initial state: {
 *  - isAuthenticated:  check if the user is already authenticated when openning the Application
 *  - token: the token of the user
 *  - user: the user data
 */
const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
};

export const authenticationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action) => {
            const token = action.payload;
            state.token = token;
            const claims = getPayloadToken(token);
            const user = {
                email: claims.email,
                role: claims.role,
                id: claims.id,
            };
            state.user = user;
            state.isAuthenticated = isTokenValid(token);
            setToken(action.payload);
        },
        signOut: (state) => {
            localStorage.clear();
            sessionStorage.clear();
            state.isAuthenticated = false;
            state.user = null
            state.token = null
        },
    },
});

export const { signIn, signOut } = authenticationSlice.actions;

export const selectIsLogged = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectHasRole = (state) => state.auth.role;

// {
//     if (!selectHasRole || selectHasRole.length === 0) return true;
//     const user = state.auth.user;
//     if (!user) return false;
//     // console.log(user.role.some((role) => role.includes(role)));
//     return user.role.some((role) => role.includes(role));
// };

export default authenticationSlice.reducer;
