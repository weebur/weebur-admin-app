export const setItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return value;
    } catch (e) {
        return '';
    }
};

export const getItem = (key) => {
    try {
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    } catch (e) {
        return '';
    }
};

export const removeItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        /**
         * TODO: error handling
         */
    }
};
