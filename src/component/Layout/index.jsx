import Layout, { Content } from 'antd/lib/layout/layout';
import SideBar from './SideBar';

import styled from 'styled-components';

const StyledLayout = styled(Layout)``;

const StyledContentLayout = styled(Layout)`
    min-height: 100vh;
    margin-left: 200px;
`;

const StyledContent = styled(Content)`
    margin: 24px auto 0;
    width: 100%;
    max-width: 1600px;
    overflow: initial;
`;

const LayoutBackground = styled.div`
    display: flex;
    flex-direction: column;
`;

function AppLayout({ withSidebar, children }) {
    return (
        <StyledLayout>
            {withSidebar && <SideBar />}
            <StyledContentLayout>
                <StyledContent>
                    <LayoutBackground>{children}</LayoutBackground>
                </StyledContent>
            </StyledContentLayout>
        </StyledLayout>
    );
}

export default AppLayout;
