import Home from '../pages/Home.component';
import Editor from '../pages/Editor.component';
import Profile from '../pages/Profile.component';
const routeCollection = [
    {
        path: '/',
        component: Home,
        layout: 'DefaultLayout'
    },
    {
        path: '/user/me',
        component: Profile,
        layout: 'DefaultLayout'
    },
    {
        path: '/editor/:code',
        component: Editor,
        layout: 'DefaultLayout'
    },

];
export default routeCollection;