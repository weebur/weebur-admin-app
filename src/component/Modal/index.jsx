import React, { useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import Title from '../Text/Title';

const StyledModal = styled(Modal)`
    padding: 55px 40px;
    border-radius: 20px;
    background: #ffffff;
    min-width: 700px;
    min-height: 400px;
    max-height: calc(100vh - 100px);
    overflow: scroll;

    ${({ defaultBackground, theme }) =>
        defaultBackground &&
        `
        background: ${theme.color.defaultBackground};
    `}
`;

const Content = styled.div`
    padding: 20px 0 0;
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
                    zIndex: 99999,
                },
            }}
            contentLabel="Example Modal"
        >
            <Title level={4}>{title}</Title>
            <Content>{children}</Content>
        </StyledModal>
    );
}

export default BasicModal;
