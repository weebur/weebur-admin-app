import { Button } from 'antd';

import styled from 'styled-components';

const StyledButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 10px 12px;
    height: 40px;
    width: 150px;
    font-size: 15px;
`;

function CommonButton({ children, ...props }) {
    return <StyledButton {...props}>{children}</StyledButton>;
}

export default CommonButton;
