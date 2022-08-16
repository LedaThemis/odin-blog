import styled from 'styled-components';

const Footer = () => {
    return (
        <StyledFooter>
            <p>
                <em>
                    This project was made by{' '}
                    <a
                        href="http://github.com/LedaThemis"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Leda
                    </a>
                </em>
            </p>
        </StyledFooter>
    );
};

const StyledFooter = styled.footer`
    width: 100%;
    text-align: center;
    padding: 0;
    margin-top: auto;
`;

export default Footer;
