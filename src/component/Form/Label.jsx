import styled from 'styled-components';

const Label = styled.label`
    color: ${({ theme }) => theme.color.light};
    font-size: ${({ theme }) => theme.fontSize.small};

    ${({ focused, theme }) =>
        focused &&
        `
        color: ${theme.color.text}
    `}
`;

export default Label;
