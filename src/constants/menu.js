import {
    SettingOutlined,
    DollarCircleOutlined,
    GlobalOutlined,
    EditOutlined,
    UserOutlined,
    MenuOutlined,
    CalendarOutlined,
    ShopOutlined,
    SkinOutlined,
} from '@ant-design/icons/lib/icons';

export const menu = [
    {
        key: 'newWorkshop',
        name: '워크샵 생성',
        path: '/workshops/new',
        Icon: EditOutlined,
    },
    { key: 'orders', name: '주문 목록', path: '/orders', Icon: MenuOutlined },
    {
        key: 'workshopCalendar',
        name: '워크샵 캘린더',
        path: '/workshops/calendar',
        Icon: CalendarOutlined,
    },
    {
        key: 'clients',
        name: '회원 관리(ok)',
        path: '/clients',
        Icon: UserOutlined,
    },
    {
        key: 'companies',
        name: '회사 관리(ok)',
        path: '/companies',
        Icon: GlobalOutlined,
    },
    {
        key: 'products',
        name: '상품 관리(ok)',
        path: '/products',
        Icon: SkinOutlined,
    },
    {
        key: 'suppliers',
        name: '업체 관리',
        path: '/suppliers',
        Icon: ShopOutlined,
    },
    {
        key: 'settlements',
        name: '정산',
        path: '/settlements',
        Icon: DollarCircleOutlined,
    },
    {
        key: 'admins',
        name: '어드민(ok)',
        path: '/admins',
        Icon: SettingOutlined,
    },
];
