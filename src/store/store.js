const store = {
    isReady: false,
    dispatch: () => {
        console.error("store is NOT ready");
    }
};

export default store;
