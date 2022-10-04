
export const getItem = async (key: string) => {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        return null;
    }
};

export const setItem = async (key: string, value: string | object) => {
    const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value;
    try {
        localStorage.setItem(key, valueToStore);
    } catch (error) {}
};

export const removeItem = async (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {}
};
