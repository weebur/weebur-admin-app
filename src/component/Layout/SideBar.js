import { Image, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { useState } from 'react';
import styled from 'styled-components';
import { menu } from '../../constants/menu';

const Logo = styled.div`
    padding: 20px;
`;

const AdminUser = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    min-height: 100px;
`;

const StyledSider = styled(Sider)`
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    background: #ffffff;
    border-right: 1px solid ${({ theme }) => theme.color.lightBorder};
`;

const StyledMenu = styled(Menu)`
    border-right: 0;
`;

function SideBar() {
    const [selectedKeys, setSelectedKeys] = useState([]);

    return (
        <StyledSider>
            <Logo className="logo">
                <Image alt="logo" src="/logo.png" />
            </Logo>
            <AdminUser>
                <div>
                    <b>테스트 유저</b>
                </div>
                <div>dev@weebur.com</div>
            </AdminUser>
            <StyledMenu
                mode="inline"
                selectedKeys={selectedKeys}
                defaultSelectedKeys={[menu[2].path]}
            >
                {menu.map(({ key, name, Icon }) => {
                    return (
                        <Menu.Item
                            key={key}
                            icon={<Icon />}
                            onClick={() => setSelectedKeys([key])}
                        >
                            {name}
                        </Menu.Item>
                    );
                })}
            </StyledMenu>
        </StyledSider>
    );
}

export default SideBar;