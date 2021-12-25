import { Typography } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';

import styled from 'styled-components';

const StyledHeader = styled(Header)`
    background: transparent;
`;

const StyledContent = styled(Content)`
    padding: 0 50px;
`;

function ContentLayout({ title, children }) {
    return (
        <>
            <StyledHeader>
                <Typography.Title level={3}>{title}</Typography.Title>
            </StyledHeader>
            <StyledContent>{children}</StyledContent>
        </>
    );
}

export default ContentLayout;
