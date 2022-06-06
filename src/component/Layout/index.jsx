import Layout, { Content } from 'antd/lib/layout/layout';
import SideBar from './SideBar';

import styled from 'styled-components';

const StyledLayout = styled(Layout)``;

const StyledContentLayout = styled(Layout)`
    min-height: 100vh;
    margin-left: 200px;

    @media only screen and (max-width: 768px) {
        margin: 0;
    }
`;

const CenteredLayout = styled(Layout)`
    min-height: 100vh;

    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const StyledContent = styled(Content)`
    margin: 24px auto 0;
    width: 100%;
    max-width: 1600px;
    overflow: initial;

    ${({ wide }) =>
        wide &&
        `
        max-width: none;
        margin: 24px 10px 0;
  `}
`;

const LayoutBackground = styled.div`
    display: flex;
    flex-direction: column;
`;

function AppLayout({ children, withoutSidebar, me, wide }) {
    if (withoutSidebar) {
        return (
            <StyledLayout>
                <CenteredLayout>{children}</CenteredLayout>
            </StyledLayout>
        );
    }

    return (
        <StyledLayout>
            <SideBar user={me} />
            <StyledContentLayout>
                <StyledContent wide={wide}>
                    <LayoutBackground>{children}</LayoutBackground>
                </StyledContent>
            </StyledContentLayout>
        </StyledLayout>
    );
}

export default AppLayout;
