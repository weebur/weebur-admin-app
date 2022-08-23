import React, { useEffect, useState } from 'react';
import { Col, Row, Table, Typography } from 'antd';
import RangePicker from '../../Form/DatePicker/RangePicker';
import Button from '../../Button';
import { TableWrapper } from './lib/styles';

const columns = [
    {
        title: '년-월',
        dataIndex: '_id',
        key: '_id',
    },
    {
        title: '문의수',
        dataIndex: 'totalLength',
        key: 'totalLength',
        align: 'right',
        render: (text) => text,
    },
    {
        title: '예약수',
        dataIndex: 'reservedLength',
        key: 'reservedLength',
        align: 'right',
        render: (text) => text,
    },
    {
        title: '예약전환율',
        dataIndex: 'conversionRate',
        key: 'conversionRate',
        align: 'right',
        render: (text) => `${text}%`,
    },
    {
        title: '예약매출액',
        dataIndex: 'salesTotal',
        key: 'salesTotal',
        align: 'right',
        render: (text) => text.toLocaleString(),
    },
    {
        title: '구매자수',
        dataIndex: 'totalBuyers',
        key: 'totalBuyers',
        align: 'right',
        render: (text) => text,
    },
    {
        title: '신규구매자수',
        dataIndex: 'newBuyers',
        key: 'newBuyers',
        align: 'right',
        render: (text) => text,
    },
    {
        title: '재구매자수',
        dataIndex: 'repeatBuyers',
        key: 'repeatBuyers',
        align: 'right',
        render: (text) => text,
    },
    {
        title: '구매기업수',
        dataIndex: 'totalCompanies',
        key: 'totalCompanies',
        align: 'right',
        render: (text) => text,
    },
    {
        title: '신규구매기업수',
        dataIndex: 'newCompanies',
        key: 'newCompanies',
        align: 'right',
        render: (text) => text,
    },
    {
        title: '재구매기업수',
        dataIndex: 'repeatCompanies',
        key: 'repeatCompanies',
        align: 'right',
        render: (text) => text,
    },
];

function Buyers({ data, title, onChange, onDownloadClick, ...props }) {
    const [from, setFrom] = useState(props.from);
    const [to, setTo] = useState(props.to);

    return (
        <TableWrapper>
            <Table
                pagination={false}
                columns={columns}
                dataSource={data}
                title={() => (
                    <Row align={'middle'} gutter={40}>
                        <Col>
                            <Typography.Title level={5}>{title}</Typography.Title>
                        </Col>
                        <Col>
                            <RangePicker
                                mode={'month'}
                                picker={'month'}
                                format={'YYYY-MM'}
                                onChange={(name, v) => {
                                    if (name === 'from') {
                                        setFrom(v);
                                    }
                                    if (name === 'to') {
                                        setTo(v);
                                    }
                                }}
                                from={from}
                                to={to}
                                fromName={'from'}
                                toName={'to'}
                            />
                        </Col>
                        <Col>
                            <Button small inline onClick={() => onChange(from, to)}>
                                불러오기
                            </Button>
                        </Col>
                        <Col>
                            <Button small inline onClick={() => onDownloadClick(from, to)}>
                                엑셀 다운로드
                            </Button>
                        </Col>
                    </Row>
                )}
            />
        </TableWrapper>
    );
}

export default Buyers;
