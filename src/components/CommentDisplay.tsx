import { CommentType } from '@ledathemis/odin-blog-library/typings';
import styled from 'styled-components';

const CommentDisplay = ({ comment }: { comment: CommentType }) => {
    return (
        <StyledComment>
            <StyledP>
                <strong>{comment.author.username}</strong>
            </StyledP>
            <StyledP>{comment.content}</StyledP>
        </StyledComment>
    );
};

const StyledComment = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 5px;
    border: 1px solid black;
`;

const StyledP = styled.p`
    margin: 0;
`;

export default CommentDisplay;
