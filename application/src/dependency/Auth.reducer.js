const AuthReducer = (state=[], action)=>{
    // console.log(action);
    switch (action.type) {
        case "GUEST_USER":
            return state = {status: (sessionStorage.getItem('_u'))?false:true};
        default : return state;
    }
};
export default AuthReducer;