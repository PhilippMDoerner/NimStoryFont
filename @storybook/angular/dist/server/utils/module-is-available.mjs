export const moduleIsAvailable = (moduleName) => {
    try {
        require.resolve(moduleName);
        return true;
    }
    catch (e) {
        return false;
    }
};
