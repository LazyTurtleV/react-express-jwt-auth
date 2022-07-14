import { Routes, Route, Link } from 'react-router-dom';

import RegistrationForm from '../RegistrationForm';
import LoginForm from '../LoginForm';
import UserData from '../User';

export default function Router() {
    return (
        <>  
            <Link to="/registration">Reg</Link>
            <Link to="/login">Log</Link>
            <Link to="/user">User</Link>
            <Routes>
                <Route path="/registration" element={<RegistrationForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/user" element={<UserData />} />
            </Routes>
        </>
    )
}