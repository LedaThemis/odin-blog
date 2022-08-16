import { PostType } from '@ledathemis/odin-blog-library/typings';
import styled from 'styled-components';

import { StyledLink } from '../styled/StyledLink';

interface IPreviewPost {
    post: PostType;
    handleDelete: () => void;
}

const PreviewPost = ({ post }: IPreviewPost) => {
    return (
        <StyledPost>
            <StyledH3>
                <StyledBlogTitleLink to={`posts/${post._id}`}>{post.title}</StyledBlogTitleLink>
            </StyledH3>
            <StyledP>Author: {post.author.username}</StyledP>
            <StyledP>
                Created: {new Date(post.createdAt).toLocaleDateString()}
            </StyledP>
            <StyledP>
                Updated: {new Date(post.updatedAt).toLocaleDateString()}
            </StyledP>
        </StyledPost>
    );
};

const StyledBlogTitleLink = styled(StyledLink)`
    text-decoration: underline;
    color: #0000EE;
`;

const StyledPost = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    border: 1px solid black;
    gap: 6px;
`;

const StyledH3 = styled.h3`
    margin: 0;
`;

const StyledP = styled.p`
    margin: 0;
`;

export default PreviewPost;
