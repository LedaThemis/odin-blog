import { getPostComments } from '@ledathemis/odin-blog-library/Posts';
import {
    CommentType,
    ErrorType,
    PostType,
} from '@ledathemis/odin-blog-library/typings';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import CommentsDisplay from './CommentsDisplay';
import Errors from './Errors';

const PostDisplay = ({ post }: { post: PostType }) => {
    const [comments, setComments] = useState<CommentType[]>();
    const [errors, setErrors] = useState<ErrorType[]>();

    useEffect(() => {
        (async () => {
            try {
                const res = await getPostComments({ id: post._id.toString() });

                switch (res.state) {
                    case 'success':
                        setComments(res.comments);
                        break;
                    case 'failed':
                        setErrors(res.errors);
                        break;
                }
            } catch {
                setErrors([
                    { msg: 'An error occurred while processing request.' },
                ]);
            }
        })();
    }, []);

    return (
        <StyledPostDisplay>
            <StyledH2>{post.title}</StyledH2>
            <hr />
            <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
            <StyledH3>Comments</StyledH3>
            {errors ? (
                <Errors errors={errors} />
            ) : (
                comments && <CommentsDisplay comments={comments} />
            )}
        </StyledPostDisplay>
    );
};

const StyledPostDisplay = styled.div`
    width: 100%;
`;

const StyledH2 = styled.h2`
    text-align: center;
`
const StyledH3 = styled.h3`
    text-align: center;
`

export default PostDisplay;
