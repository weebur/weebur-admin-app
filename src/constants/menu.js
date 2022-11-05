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
    BarChartOutlined,
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
        name: '회원 관리',
        path: '/clients',
        Icon: UserOutlined,
    },
    {
        key: 'companies',
        name: '회사 관리',
        path: '/companies',
        Icon: GlobalOutlined,
    },
    {
        key: 'products',
        name: '상품 관리',
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
        name: '어드민',
        path: '/admins',
        Icon: SettingOutlined,
    },
    {
        key: 'dashboard',
        name: '대시보드',
        path: '/dashboard',
        Icon: BarChartOutlined,
    },
];
