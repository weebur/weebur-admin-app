import Layout, { Content } from 'antd/lib/layout/layout';
import SideBar from './SideBar';

import styled from 'styled-components';

const StyledLayout = styled(Layout)``;

const StyledContentLayout = styled(Layout)`
    min-height: 100vh;
    margin-left: 200px;
`;

const StyledContent = styled(Content)`
    margin: 24px 46px 0;
    overflow: initial;
`;

const LayoutBackground = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px;
`;

function AppLayout({ children }) {
    return (
        <StyledLayout>
            <SideBar />
            <StyledContentLayout className="site-layout">
                <StyledContent>
                    <LayoutBackground className="site-layout-background">
                        {children}
                    </LayoutBackground>
                </StyledContent>
            </StyledContentLayout>
        </StyledLayout>
    );
}

export default AppLayout;
