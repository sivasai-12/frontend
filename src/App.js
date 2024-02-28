import React from 'react';
import Login from './components/Login';
import Logout from './components/Logout';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import { selectUser } from './redux/userslice'; // Import selectUser from userslice

const App = () => {
    const user = useSelector(selectUser);

    return (
        <div>
            {user ? <Logout /> : <Login />}
        </div>
    );
};

export default App;
