import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const StyledLoader = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.1);
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
`;

function PageLoader() {
    return (
        <StyledLoader>
            <Spin tip="Loading..." size="large" />
        </StyledLoader>
    );
}

export default PageLoader;
