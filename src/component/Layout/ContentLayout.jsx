import { Content } from 'antd/lib/layout/layout';
import styled from 'styled-components';

const StyledContent = styled(Content)`
    padding: 50px 50px 100px;

    @media only screen and (max-width: 768px) {
        padding: 15px 10px;
    }
`;

function ContentLayout({ children }) {
    return <StyledContent>{children}</StyledContent>;
}

export default ContentLayout;
