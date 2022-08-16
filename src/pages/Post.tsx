import { getPost } from '@ledathemis/odin-blog-library/Posts';
import { ErrorType, PostType } from '@ledathemis/odin-blog-library/typings';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Errors from '../components/Errors';
import PostDisplay from '../components/PostDisplay';

const Post = () => {
    const [currentPost, setCurrentPost] = useState<PostType>();
    const [errors, setErrors] = useState<ErrorType[]>();
    const { postId } = useParams();

    useEffect(() => {
        (async () => {
            try {
                if (postId) {
                    const res = await getPost({ id: postId });

                    switch (res.state) {
                        case 'success':
                            setCurrentPost(res.post);
                            break;
                        case 'failed':
                            setErrors(res.errors);
                            break;
                    }
                } else {
                    setErrors([
                        {
                            msg: 'No post id provided.',
                        },
                    ]);
                }
            } catch {
                setErrors([
                    { msg: 'An error occurred while processing request.' },
                ]);
            }
        })();
    }, []);

    return (
        <StyledPost>
            {currentPost && <PostDisplay post={currentPost} />}
            {errors && <Errors errors={errors} />}
        </StyledPost>
    );
};

const StyledPost = styled.div`
    display: grid;
    place-items: center;
`;

export default Post;
