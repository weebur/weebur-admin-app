import { useEffect } from 'react';
import { Button, Menu, Image, message } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { menu } from '../../constants/menu';
import useAdminsStore from '../../stores/admins';
import { adminRoles } from '../../constants/admin';
import Loader from '../Loader';
import NextImage from 'next/image';

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

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 16px;
    height: 16px;
    svg {
        ${({ primary, theme }) =>
            primary &&
            `
            color: ${theme.color.primary}
        `}
    }
`;

function SideBar({ user }) {
    const router = useRouter();
    const [selectedKeys, setSelectedKeys] = useState([]);

    const logout = useAdminsStore((state) => state.logout);

    useEffect(() => {
        setSelectedKeys([router.pathname]);
    }, [router.pathname]);

    return (
        <StyledSider>
            <Logo className="logo">
                <NextImage
                    width={150}
                    height={(150 * 48) / 210}
                    alt="logo"
                    src="/images/full_logo.png"
                    onClick={() => {
                        router.push('/');
                    }}
                />
            </Logo>
            <AdminUser>
                {user ? (
                    <>
                        <div>
                            <b>{user.name}</b> {`[${adminRoles[user.role]?.label}]`}
                        </div>
                        <div>{user.email}</div>
                        <div>
                            <Button
                                danger
                                size="small"
                                type="text"
                                onClick={async () => {
                                    try {
                                        await logout();
                                        router.push('/login');
                                    } catch (e) {
                                        message.warn('알 수 없는 문제가 발생하였습니다.');
                                    }
                                }}
                            >
                                로그아웃
                            </Button>
                        </div>
                    </>
                ) : (
                    <div>
                        <Loader />
                    </div>
                )}
            </AdminUser>
            <StyledMenu mode="inline" selectedKeys={selectedKeys} defaultSelectedKeys={[menu[2].path]}>
                {menu.map(({ name, Icon, path }) => {
                    return (
                        <Menu.Item
                            key={path}
                            icon={
                                <IconWrapper primary={selectedKeys.includes(path)}>
                                    <Icon />
                                </IconWrapper>
                            }
                            onClick={() => {
                                setSelectedKeys([path]);
                                router.push(path);
                            }}
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
