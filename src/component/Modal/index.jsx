import React, { useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Title from '../Text/Title';
import Button from '../Button';

const StyledModal = styled(Modal)`
    padding: 55px 40px;
    border-radius: 20px;
    background: #ffffff;
    min-width: 700px;
    min-height: 400px;
    max-height: calc(100vh - 100px);
    overflow: scroll;
    max-width: 80%;

    ${({ defaultBackground, theme }) =>
        defaultBackground &&
        `
        background: ${theme.color.defaultBackground};
    `}

    @media only screen and (max-width: 768px) {
        position: absolute;
        min-width: 0;
        max-width: none;
        width: 100%;
        border-top-right-radius: 36px;
        border-top-left-radius: 36px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        font-size: ${({ theme }) => theme.fontSize.medium};
        height: 640px;
        bottom: 0;
        animation: 0.2s slide-from-bottom ease;
        padding: 25px 25px 75px;
    }

    @keyframes slide-from-bottom {
        0% {
            transform: translateY(100%);
        }
        100% {
            transform: translateY(0);
        }
    }
`;

const Content = styled.div`
    padding: 20px 0 0;
`;

const ButtonsWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    & > button {
        background-color: #313131;
        color: #ffffff;
        border: none;
        width: 100%;
        border-radius: 0;
    }
`;

function BasicModal({ isOpen, onClose, children, title, defaultBackground }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <StyledModal
            defaultBackground={defaultBackground}
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                overlay: {
                    background: 'rgba(49, 49, 49, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2,
                },
            }}
            contentLabel="Example Modal"
        >
            <Title level={4}>{title}</Title>
            <Content>{children}</Content>
            <ButtonsWrapper>
                <Button onClick={onClose}>닫기</Button>
            </ButtonsWrapper>
        </StyledModal>
    );
}

export default BasicModal;
