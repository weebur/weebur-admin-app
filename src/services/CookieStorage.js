import { CookieStorage } from 'cookie-storage';
const cookieStorage = new CookieStorage();

export const setCookie = (key, value) => {
    cookieStorage.setItem(key, value);
};

export const getCookie = (key) => {
    return cookieStorage.getItem(key);
};

export const removeCookie = (key) => {
    cookieStorage.removeItem(key);
};
