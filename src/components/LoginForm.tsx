import { login } from '@ledathemis/odin-blog-library/Users';
import {
    AccessResponse,
    ErrorType,
} from '@ledathemis/odin-blog-library/typings';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { StyledSubmitButton } from '../styled/StyledSubmitButton';
import Errors from './Errors';

const LoginForm = () => {
    const initialFormData = {
        username: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState<ErrorType[]>();

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,

            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res: AccessResponse = await login({
            username: formData.username,
            password: formData.password,
        });

        switch (res.state) {
            case 'success':
                navigate('/');
                break;
            case 'failed':
                setErrors(res.errors);
                break;
        }
    };

    return (
        <div>
            <StyledLoginForm onSubmit={handleSubmit} method="POST">
                <StyledLabel>
                    Username:
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                    ></input>
                </StyledLabel>
                <StyledLabel>
                    Password:
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                    ></input>
                </StyledLabel>
                <StyledSubmitButton type="submit">Login</StyledSubmitButton>
            </StyledLoginForm>
            {errors && <Errors errors={errors}></Errors>}
        </div>
    );
};

const StyledLoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
`;

export default LoginForm;
