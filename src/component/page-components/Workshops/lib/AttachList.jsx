import React from 'react';
import { List } from 'antd';
import dayjs from 'dayjs';

function AttachList({ dataSource, renderActions, label }) {
    return (
        <List
            bordered
            dataSource={dataSource}
            renderItem={(item) => (
                <List.Item actions={renderActions(item)}>
                    <List.Item.Meta
                        title={
                            <a href={item.url}>{`${label} - ${dayjs(item.createdAt).format(
                                'YYYY-MM-DD HH:mm:ss',
                            )} 발행`}</a>
                        }
                        description={
                            item.orders ? (
                                item.orders.map((order) => (
                                    <div key={order._id}>
                                        <div>{`${dayjs(order.reservationDate).format('YY-MM-DD HH:mm')} | ${
                                            order.productName
                                        }`}</div>
                                        <div>{`${order.participants}명 | ${
                                            order.supplierName
                                        } | ${order.total.toLocaleString()}원`}</div>
                                    </div>
                                ))
                            ) : (
                                <div />
                            )
                        }
                    />
                </List.Item>
            )}
        />
    );
}

export default AttachList;
