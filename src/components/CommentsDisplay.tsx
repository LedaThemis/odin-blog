import { CommentType } from '@ledathemis/odin-blog-library/typings';
import styled from 'styled-components';

import CommentDisplay from './CommentDisplay';

const CommentsDisplay = ({ comments }: { comments: CommentType[] }) => {
    return (
        <StyledCommentsDisplay>
            {comments.map((comment) => (
                <CommentDisplay key={comment._id} comment={comment} />
            ))}
        </StyledCommentsDisplay>
    );
};

const StyledCommentsDisplay = styled.div`
    display: flex;
    flex-direction: column;
`;

export default CommentsDisplay;
