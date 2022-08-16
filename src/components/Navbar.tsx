import { isLoggedIn } from '@ledathemis/odin-blog-library/Users';
import styled from 'styled-components';

import { StyledLink } from '../styled/StyledLink';

const Navbar = () => {
    return (
        <StyledNavBar>
            <StyledH1>
                <StyledLink to="/">Blog</StyledLink>
            </StyledH1>
            <StyledLinks>
                <li>
                    <StyledLink to="/">Home</StyledLink>
                </li>
                {!isLoggedIn() && (
                    <li>
                        <StyledLink to="register">Register</StyledLink>
                    </li>
                )}
                {!isLoggedIn() ? (
                    <li>
                        <StyledLink to="login">Login</StyledLink>
                    </li>
                ) : (
                    <li>
                        <StyledLink to="logout">Logout</StyledLink>
                    </li>
                )}
            </StyledLinks>
        </StyledNavBar>
    );
};

const StyledNavBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;

    background-color: var(--primary-color);
    color: white;
`;

const StyledH1 = styled.h1`
    margin: 0;
`;

const StyledLinks = styled.ul`
    display: flex;
    list-style-type: none;
    gap: 16px;
`;

export default Navbar;
