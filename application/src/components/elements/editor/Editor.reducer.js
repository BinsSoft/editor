const EditorReducer = (state = [], action) => {
    switch (action.type) {
        case "RUN_INIT":
            return state = {
                action: 'init',
                data: action.status
            };
        case "GENERATE_SNIPPET":
            return state = state = {
                action: 'generate',
                data: action.snippetData
            }
        case "RUN_COMPLETE":
            return state = state = {
                action: 'complete',
                data: action.data
            }
        default: return state;
    }
};

export default EditorReducer