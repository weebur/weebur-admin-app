import React from 'react';
import { Divider, List, Typography, Skeleton } from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';

const ListWrapper = styled.div`
    height: 700px;
    overflow: scroll;
    margin-bottom: 40px;
`;

const Description = styled.div`
    margin-bottom: 5px;
`;

function DocumentsList({ list, label, onRemove }) {
    return (
        <>
            <Divider orientation="left">{label} 발행 이력</Divider>
            <Typography.Text type={'secondary'}>
                폰트가 깨져서 저장된 경우에는 새로고침 후 다시 시도 해주세요.
            </Typography.Text>
            <ListWrapper>
                <List
                    bordered
                    dataSource={list}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <a key="list-loadmore-edit" href={item.url}>
                                    다운로드
                                </a>,
                                <a
                                    key="list-loadmore-more"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onRemove(item.key);
                                    }}
                                >
                                    삭제
                                </a>,
                            ]}
                        >
                            <List.Item.Meta
                                title={
                                    <a href={item.url}>{`${dayjs(item.createdAt).format(
                                        'YYYY-MM-DD HH:mm:ss',
                                    )} 발행`}</a>
                                }
                                description={item.orders.map((order) => (
                                    <Description key={order._id}>
                                        <div>{`${dayjs(order.reservationDate).format('YY-MM-DD HH:mm')} | ${
                                            order.productName
                                        }`}</div>
                                        <div>{`${order.participants}명 | ${
                                            order.supplierName
                                        } | ${order.total.toLocaleString()}원`}</div>
                                    </Description>
                                ))}
                            />
                        </List.Item>
                    )}
                />
            </ListWrapper>
        </>
    );
}

export default DocumentsList;
