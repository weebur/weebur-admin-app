import React from 'react';
import styled from 'styled-components';
import SubmitButton from '../Form/SubmitButton';
import CommonButton from './index';

const Buttons = styled.div`
    display: flex;
    gap: 15px;
`;

function SearchButtons({ disabled, submitButtonText, onReset }) {
    return (
        <Buttons centered>
            <SubmitButton disabled={disabled} small primary text={submitButtonText || '검색'} />
            <CommonButton
                small
                light
                onClick={() => {
                    onReset && onReset();
                }}
            >
                초기화
            </CommonButton>
        </Buttons>
    );
}

export default SearchButtons;
