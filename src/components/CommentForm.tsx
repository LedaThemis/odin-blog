import { createPostComment } from '@ledathemis/odin-blog-library/Posts';
import { CommentType, ErrorType } from '@ledathemis/odin-blog-library/typings';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { StyledSubmitButton } from '../styled/StyledSubmitButton';
import Errors from './Errors';

const CommentForm = ({
    pushComment,
}: {
    pushComment: (comment: CommentType) => void;
}) => {
    const [content, setContent] = useState<string>();
    const [errors, setErrors] = useState<ErrorType[]>();

    const { postId } = useParams();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (postId && content !== undefined) {
            const res = await createPostComment({ id: postId, content });

            switch (res.state) {
                case 'success':
                    pushComment(res.comment);
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
    };

    return (
        <div>
            <StyledCommentForm onSubmit={handleSubmit} method="POST">
                <StyledLabel>
                    <StyledTextarea
                        id="content"
                        name="content"
                        onChange={handleChange}
                    />
                </StyledLabel>
                <StyledSubmitButton type="submit">
                    Post Comment
                </StyledSubmitButton>
            </StyledCommentForm>
            {errors && <Errors errors={errors} />}
        </div>
    );
};

const StyledCommentForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 10px;
`;

const StyledLabel = styled.label`
    display: flex;
    flex-direction: column;
`;

const StyledTextarea = styled.textarea`
    resize: none;
`;

export default CommentForm;
