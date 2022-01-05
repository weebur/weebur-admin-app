import { Image, Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { useState } from 'react';
import styled from 'styled-components';
import { menu } from '../../constants/menu';

const Logo = styled.div`
    margin-top: 40px;
    padding: 10px 24px;
`;

const AdminUser = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    padding: 10px 0;
`;

const StyledSider = styled(Sider)`
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
    background: #ffffff;
    border-right: none;
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
