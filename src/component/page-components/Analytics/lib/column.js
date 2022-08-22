export const defaultColumns = [
    {
        title: '년-월',
        dataIndex: '_id',
        key: '_id',
    },
    {
        title: '주문수',
        dataIndex: 'orderCount',
        key: 'orderCount',
        align: 'right',
        render: (text) => text.toLocaleString(),
    },
    {
        title: '매출',
        dataIndex: 'total',
        key: 'total',
        align: 'right',
        render: (text) => text.toLocaleString(),
    },
    {
        title: '정산액',
        dataIndex: 'totalSettlement',
        key: 'totalSettlement',
        align: 'right',
        render: (text) => text.toLocaleString(),
    },
    {
        title: '순매출',
        dataIndex: 'totalIncome',
        key: 'totalIncome',
        align: 'right',
        render: (text) => text.toLocaleString(),
    },
];
