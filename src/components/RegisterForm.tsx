import { register } from '@ledathemis/odin-blog-library/Users';
import {
    ErrorType,
    RegisterResponse,
} from '@ledathemis/odin-blog-library/typings';
import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';

import { StyledSubmitButton } from '../styled/StyledSubmitButton';
import Errors from './Errors';

const RegisterForm = () => {
    const initialFormData = {
        username: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState<ErrorType[]>();
    const [successMessage, setSuccessMessage] = useState<string>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,

            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res: RegisterResponse = await register({
            username: formData.username,
            password: formData.password,
        });

        switch (res.state) {
            case 'success':
                setErrors(undefined);
                setSuccessMessage(
                    'Successfully registered account, you can now login!',
                );
                break;
            case 'failed':
                setSuccessMessage(undefined);
                setErrors(res.errors);
                break;
        }
    };

    return (
        <div>
            <StyledRegisterForm onSubmit={handleSubmit} method="POST">
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
                <StyledSubmitButton type="submit">Register</StyledSubmitButton>
            </StyledRegisterForm>
            {successMessage && (
                <StyledSuccessMessage>{successMessage}</StyledSuccessMessage>
            )}
            {errors && <Errors errors={errors}></Errors>}
        </div>
    );
};

const StyledSuccessMessage = styled.p`
    color: green;
`;

const StyledRegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
`;

export default RegisterForm;
