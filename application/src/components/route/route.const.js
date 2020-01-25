import Home from '../pages/Home.component';
import Editor from '../pages/Editor.component';
const routeCollection = [
    {
        path: '/',
        component: Home,
        layout: 'DefaultLayout'
    },
    {
        path: '/editor/:code',
        component: Editor,
        layout: 'DefaultLayout'
    },

];
export default routeCollection;