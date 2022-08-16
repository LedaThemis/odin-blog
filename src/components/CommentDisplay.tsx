import { CommentType } from '@ledathemis/odin-blog-library/typings';
import styled from 'styled-components';

const CommentDisplay = ({ comment }: { comment: CommentType }) => {
    const createdAt = new Date(comment.createdAt).toLocaleDateString();
    const updatedAt = new Date(comment.createdAt).toLocaleDateString();

    return (
        <StyledComment>
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

const StyledHeader = styled(StyledP)`
    display: flex;
    gap: 5px;
`;

const StyledContent = styled(StyledP)`
    padding-left: 5px;
`;

export default CommentDisplay;
