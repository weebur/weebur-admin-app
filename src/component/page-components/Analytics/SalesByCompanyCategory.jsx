import React, { useEffect, useState } from 'react';
import { Col, Row, Table, Typography } from 'antd';
import { defaultColumns } from './lib/column';
import RangePicker from '../../Form/DatePicker/RangePicker';
import Button from '../../Button';
import SelectBox from '../../Form/SelectBox';
import { companyCategories } from '../../../constants/company';
import { TableWrapper } from './lib/styles';

function SalesByCompanyCategory({ data, title, onChange, onDownloadClick, ...props }) {
    const [from, setFrom] = useState(props.from);
    const [to, setTo] = useState(props.to);
    const [companyCategory, setCompanyCategory] = useState(props.companyCategory);

    return (
        <TableWrapper>
            <Table
                pagination={false}
                columns={defaultColumns}
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
                        <Col flex={'0 0 200px'}>
                            <SelectBox
                                name="type"
                                onChange={(_, v) => setCompanyCategory(v)}
                                value={companyCategory}
                                options={Object.values(companyCategories)}
                            />
                        </Col>
                        <Col>
                            <Button small inline onClick={() => onChange(from, to, companyCategory)}>
                                불러오기
                            </Button>
                        </Col>
                        <Col>
                            <Button small inline onClick={() => onDownloadClick(from, to, companyCategory)}>
                                엑셀 다운로드
                            </Button>
                        </Col>
                    </Row>
                )}
            />
        </TableWrapper>
    );
}

export default SalesByCompanyCategory;
