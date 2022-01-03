import styled from 'styled-components';

const StyledSpace = styled.div`
    display: flex;
    background: #ffffff;
    width: 100%;
    border-radius: 5px;
    padding: 10px 20px;
    flex-direction: column;
    align-items: ${({ align }) => (align ? align : 'flex-start')};
`;

function ContentSpace({ align, children }) {
    return <StyledSpace align={align}>{children}</StyledSpace>;
}

export default ContentSpace;
