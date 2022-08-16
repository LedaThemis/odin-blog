import { updateComment } from '@ledathemis/odin-blog-library/Comments';
import { CommentType, ErrorType } from '@ledathemis/odin-blog-library/typings';
import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';

import { StyledSubmitButton } from '../styled/StyledSubmitButton';
import Errors from './Errors';

interface ICommentEdit {
    comment: CommentType;
    handleCancelEditing: () => void;
    handleSuccessEdit: (updatedComment: CommentType) => void;
}

const CommentEdit = ({
    comment,
    handleCancelEditing,
    handleSuccessEdit,
}: ICommentEdit) => {
    const [content, setContent] = useState<string>(comment.content);
    const [errors, setErrors] = useState<ErrorType[]>();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (content !== undefined) {
            const res = await updateComment({
                id: comment._id.toString(),
                content,
            });

            switch (res.state) {
                case 'success':
                    handleSuccessEdit(res.comment);
                    break;
                case 'failed':
                    setErrors(res.errors);
                    break;
            }
        } else {
            setErrors([
                {
                    msg: 'No comment provided.',
                },
            ]);
        }
    };

    return (
        <div>
            <StyledEditCommentForm onSubmit={handleSubmit} method="POST">
                <StyledLabel>
                    <StyledTextarea
                        id="content"
                        name="content"
                        value={content}
                        onChange={handleChange}
                    />
                </StyledLabel>
                <StyledSubmitButton
                    type="button"
                    onClick={() => handleCancelEditing()}
                >
                    Cancel
                </StyledSubmitButton>
                <StyledSubmitButton type="submit" disabled={!content}>
                    Update
                </StyledSubmitButton>
            </StyledEditCommentForm>
            {errors && <Errors errors={errors} />}
        </div>
    );
};

const StyledEditCommentForm = styled.form`
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

export default CommentEdit;
