import { CommentType } from '@ledathemis/odin-blog-library/typings';
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs';
import styled from 'styled-components';

const CommentDisplay = ({
    comment,
    handleCommentDelete,
}: {
    comment: CommentType;
    handleCommentDelete: (comment: CommentType) => Promise<void>;
}) => {
    const createdAt = new Date(comment.createdAt).toLocaleDateString();
    const updatedAt = new Date(comment.createdAt).toLocaleDateString();

    const currentUserId = localStorage.getItem('userId');
    return (
        <StyledComment>
            {currentUserId === comment.author._id.toString() && (
                <StyledActionButtons>
                    <StyledPostEditButton />
                    <StyledPostDeleteButton
                        onClick={() => handleCommentDelete(comment)}
                    />
                </StyledActionButtons>
            )}
            <StyledHeader>
                <strong>{comment.author.username}</strong>
                <span>{createdAt}</span>
                {createdAt !== updatedAt && (
                    <span>
                        <em>Last Updated {updatedAt}</em>
                    </span>
                )}
            </StyledHeader>
            <StyledContent>{comment.content}</StyledContent>
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

const StyledActionButtons = styled.div`
    position: absolute;
    align-self: flex-end;
    display: flex;
    gap: 5px;
`;

const StyledPostDeleteButton = styled(BsFillTrashFill)`
    cursor: pointer;
`;

const StyledPostEditButton = styled(BsPencilFill)`
    cursor: pointer;
`;

const StyledHeader = styled(StyledP)`
    display: flex;
    gap: 5px;
`;

const StyledContent = styled(StyledP)`
    padding-left: 5px;
`;

export default CommentDisplay;
