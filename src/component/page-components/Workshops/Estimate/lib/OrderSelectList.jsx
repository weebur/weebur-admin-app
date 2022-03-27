import React from 'react';
import { Checkbox, Col, Divider, List, Row } from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';

const SelectList = styled.div`
    margin-bottom: 10px;
`;

function OrderSelectList({ orders, selectedOrders, handleToggle }) {
    return (
        <SelectList>
            <Divider orientation="left">주문 선택하기</Divider>
            <List
                bordered
                dataSource={orders}
                renderItem={(order) => (
                    <List.Item>
                        <Row align="middle" gutter={20}>
                            <Col>
                                <Checkbox
                                    checked={!!selectedOrders.find((selected) => selected._id === order._id)}
                                    onChange={(e) => handleToggle(e.target.checked, order)}
                                />
                            </Col>
                            <Col>
                                <div key={order._id}>
                                    <div>{`${dayjs(order.reservationDate).format('YY-MM-DD HH:mm')} | ${
                                        order.productName
                                    }`}</div>
                                    <div>{`${order.participants}명 | ${
                                        order.supplierName
                                    } | ${order.payment.summary.total.toLocaleString()}원`}</div>
                                </div>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </SelectList>
    );
}

export default OrderSelectList;
