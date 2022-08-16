import { CommentType } from '@ledathemis/odin-blog-library/typings';
import { useState } from 'react';
import styled from 'styled-components';

import CommentDisplay from './CommentDisplay';
import CommentForm from './CommentForm';

const CommentsDisplay = ({ comments }: { comments: CommentType[] }) => {
    const [currentComments, setCurrentComments] =
        useState<CommentType[]>(comments);

    const pushComment = (comment: CommentType) => {
        setCurrentComments((prevComments) => [...prevComments, comment]);
    };

    return (
        <StyledCommentsDisplay>
            <CommentForm pushComment={pushComment} />
            {currentComments.map((comment) => (
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
