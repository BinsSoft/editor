const LoaderReducer = (state=[],action)=>{
    switch(action.type) {
        case "SHOW_HIDE":
            return state = action.status;
    }
    return state;
};

export default LoaderReducer;