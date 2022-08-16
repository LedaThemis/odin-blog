import { deletePost } from '@ledathemis/odin-blog-library/Posts';
import { getUserPosts } from '@ledathemis/odin-blog-library/Users';
import {
    ErrorType,
    PostType,
    PostsResponse,
} from '@ledathemis/odin-blog-library/typings';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Errors from './Errors';
import PreviewPost from './PreviewPost';

const Posts = () => {
    const [posts, setPosts] = useState<PostType[]>();
    const [errors, setErrors] = useState<ErrorType[]>();

    useEffect(() => {
        (async () => {
            const res: PostsResponse = await getUserPosts(
                process.env.REACT_APP_BLOG_AUTHOR_ID,
            );

            switch (res.state) {
                case 'success':
                    setPosts(res.posts);
                    break;
                case 'failed':
                    setErrors(res.errors);
                    break;
            }
        })();
    }, []);

    const handlePostDelete = async (id: string) => {
        await deletePost({ id });

        setPosts(posts?.filter((post) => post._id !== id));
    };

    const getOulet = () => {
        if (errors) {
            return (
                <div>
                    <Errors errors={errors} />
                </div>
            );
        } else if (posts) {
            return (
                <StyledPostsContainer>
                    {posts.length === 0 ? (
                        <p>There are no posts available currently.</p>
                    ) : (
                        posts.map((post) => (
                            <PreviewPost
                                key={post._id}
                                post={post}
                                handleDelete={() => handlePostDelete(post._id)}
                            />
                        ))
                    )}
                </StyledPostsContainer>
            );
        } else {
            return <div></div>;
        }
    };

    return (
        <StyledContainer>
            <h2>Posts</h2>
            {getOulet()}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    width: 100%;
`;

const StyledPostsContainer = styled.div`
    display: grid;
    place-content: center;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
    width: 100%;
`;

export default Posts;
