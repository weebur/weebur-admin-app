import styled from 'styled-components';

const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: bold;
    color: ${({ theme }) => theme.color.primary};
    border: solid 1px ${({ theme }) => theme.color.primary};
    background: #fff;

    padding: 10px 12px;
    height: 56px;
    min-width: 240px;
    font-size: ${({ theme }) => theme.fontSize.large};
    border-radius: 3px;

    cursor: pointer;

    ${({ small }) =>
        small &&
        `
        min-width: 160px;
    `}

    ${({ xSmall }) =>
        xSmall &&
        `
        min-width: 120px;
    `}

    ${({ inline }) =>
        inline &&
        `
        height: 44px;
    `}

    ${({ primary, theme }) =>
        primary &&
        `
        background: ${theme.color.primary};
        color: #fff;
    `}

    ${({ light, theme }) =>
        light &&
        `
        border: solid 1px ${theme.color.light};
        color: ${theme.color.text};
    `}

    :disabled {
        cursor: not-allowed;
        border: none;
        background: ${({ theme }) => theme.color.lightBackground};
        color: ${({ theme }) => theme.color.light};

        ${({ primary, theme }) =>
            primary &&
            `
            border: none;
            background: ${theme.color.light};
            color: ${theme.color.lightText};
        `}
    }
`;

function CommonButton({ children, ...props }) {
    return (
        <StyledButton type="button" {...props}>
            {children}
        </StyledButton>
    );
}

export default CommonButton;
