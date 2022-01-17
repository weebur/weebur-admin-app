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
`;

const Content = styled.div`
    padding: 20px 0 0;
`;

function BasicModal({ isOpen, onClose, children, title }) {
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
            ariaHideApp={false}
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                overlay: {
                    background: 'rgba(49, 49, 49, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
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
