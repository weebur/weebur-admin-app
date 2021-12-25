import { UserOutlined } from '@ant-design/icons/lib/icons';

export const menu = [
    {
        key: 'newWorkshop',
        name: '워크샵 생성',
        path: '/workshops/new',
        Icon: UserOutlined,
    },
    { key: 'orders', name: '주문 목록', path: '/orders', Icon: UserOutlined },
    {
        key: 'workshopCalendar',
        name: '워크샵 캘린더',
        path: '/workshops/calendar',
        Icon: UserOutlined,
    },
    { key: 'clients', name: '회원 관리', path: '/clients', Icon: UserOutlined },
    {
        key: 'companies',
        name: '회사 관리',
        path: '/companies',
        Icon: UserOutlined,
    },
    {
        key: 'products',
        name: '상품 관리',
        path: '/products',
        Icon: UserOutlined,
    },
    {
        key: 'suppliers',
        name: '업체 관리',
        path: '/suppliers',
        Icon: UserOutlined,
    },
    {
        key: 'settlements',
        name: '정산',
        path: '/settlements',
        Icon: UserOutlined,
    },
    { key: 'admins', name: '어드민', path: '/admins', Icon: UserOutlined },
];
