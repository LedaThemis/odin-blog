import { deleteComment } from '@ledathemis/odin-blog-library/Comments';
import { isLoggedIn } from '@ledathemis/odin-blog-library/Users';
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

    const removeComment = (comment: CommentType) => {
        setCurrentComments((prevComments) =>
            prevComments.filter(
                (c) => c._id.toString() !== comment._id.toString(),
            ),
        );
    };

    const handleCommentDelete = async (comment: CommentType) => {
        const res = await deleteComment({ id: comment._id.toString() });

        switch (res.state) {
            case 'success':
                removeComment(comment);
                break;
            case 'failed':
                break;
        }
    };

    return (
        <StyledCommentsDisplay>
            {isLoggedIn() ? (
                <CommentForm pushComment={pushComment} />
            ) : (
                <StyledP>You need to be logged in to comment.</StyledP>
            )}
            {currentComments.map((comment) => (
                <CommentDisplay
                    key={comment._id}
                    comment={comment}
                    handleCommentDelete={handleCommentDelete}
                />
            ))}
        </StyledCommentsDisplay>
    );
};

const StyledCommentsDisplay = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledP = styled.p`
    text-align: center;
`;

export default CommentsDisplay;
