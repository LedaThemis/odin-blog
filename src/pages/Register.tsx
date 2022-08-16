import { isLoggedIn } from '@ledathemis/odin-blog-library/Users';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

import RegisterForm from '../components/RegisterForm';

const Login = () => {
    return (
        <StyledRegister>
            {isLoggedIn() && <Navigate to="/" />}
            <h1>Register Page</h1>
            <RegisterForm />
        </StyledRegister>
    );
};

const StyledRegister = styled.div`
    display: grid;
    place-items: center;
`;

export default Login;
