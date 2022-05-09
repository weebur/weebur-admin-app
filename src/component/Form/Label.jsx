import styled from 'styled-components';

const StyledLabel = styled.label`
    color: ${({ theme }) => theme.color.text};
    font-size: ${({ theme }) => theme.fontSize.small};
`;

const Required = styled.span`
    color: ${({ theme }) => theme.color.primary};
    padding: 0 2px;
`;

function Label({ required, children }) {
    return (
        <StyledLabel>
            {children}
            {required && <Required>*</Required>}
        </StyledLabel>
    );
}

export default Label;
