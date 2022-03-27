import React, { useEffect, useState } from 'react';
import { Col, Row, Table, Typography } from 'antd';
import { defaultColumns } from './lib/column';
import RangePicker from '../../Form/DatePicker/RangePicker';
import Button from '../../Button';
import { cloneDeep } from 'lodash-es';
import { TableWrapper } from './lib/styles';

const columns = cloneDeep(defaultColumns);

columns.splice(0, 1, {
    title: '업체명',
    dataIndex: 'supplierName',
    key: 'supplierName',
});

function SalesBySupplier({ data, title, onChange, onDownloadClick, ...props }) {
    const [from, setFrom] = useState(props.from);
    const [to, setTo] = useState(props.to);

    useEffect(() => {
        onChange(from, to);
    }, [from, to]);

    return (
        <TableWrapper>
            <Table
                columns={columns}
                dataSource={data}
                title={() => (
                    <Row align={'middle'} gutter={40}>
                        <Col>
                            <Typography.Title level={5}>{title}</Typography.Title>
                        </Col>
                        <Col>
                            <RangePicker
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

export default SalesBySupplier;
