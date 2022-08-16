import { logout } from '@ledathemis/odin-blog-library/Users';
import { useNavigate } from 'react-router-dom';

import { StyledSubmitButton } from '../styled/StyledSubmitButton';

const LogoutPrompt = () => {
    const navigate = useNavigate();

    return (
        <div>
            <p>Are you sure you want to log out?</p>
            <StyledSubmitButton
                onClick={() => {
                    logout();
                    navigate('/');
                }}
            >
                Yes
            </StyledSubmitButton>
        </div>
    );
};

export default LogoutPrompt;
