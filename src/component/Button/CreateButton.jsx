import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import theme from '../../theme';
import Button from './index';

const ButtonWrapper = styled.div`
    display: flex;
    color: ${({ theme }) => theme.color.primary};
    gap: 11px;
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSize.xLarge};
    & > button {
        ${({ full }) =>
            full &&
            `
              width: 100%;
          `}
    }
`;

const StyledButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 7px;
    border-radius: 8px;
    border: solid 1px ${({ theme }) => theme.color.light};
`;

function CreateButton({ children, full, color, ...props }) {
    return (
        <ButtonWrapper full={full}>
            <Button inline small primary {...props}>
                {children}
                <PlusOutlined
                    style={{
                        color: color || '#fff',
                        fontSize: theme.fontSize.xLarge,
                    }}
                />
            </Button>
        </ButtonWrapper>
    );
}

export default CreateButton;
