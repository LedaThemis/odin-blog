import styled from 'styled-components';

import Posts from '../components/Posts';

const Home = () => {
    return (
        <StyledHome>
            <h1>Home</h1>
            <Posts />
        </StyledHome>
    );
};

const StyledHome = styled.div`
    display: grid;
    text-align: center;
`;

export default Home;
