import jwt_decode from 'jwt-decode';

const TOKEN_NAME = 'token';

export function setToken(token) {
    localStorage.setItem(TOKEN_NAME, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN_NAME);
}

export function removeToken() {
    localStorage.removeItem(TOKEN_NAME);
}

export function getPayloadToken(token) {
    return jwt_decode(token);
}

/**
 * To check if the current user is authenticated
 * Check the token, and it's validity
 * @return {boolean} true if user is authenticated
 */
export function isTokenValid(token) {
    try {
        const payload = getPayloadToken(token);
        const role = payload.role;
        const expirationDate = payload.exp;
        const email = payload.email;
        const dateNow = new Date();

        return token && role && email && expirationDate < dateNow.getTime();
    } catch {
        return false;
    }
}
