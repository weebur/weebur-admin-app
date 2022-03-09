import React, { useEffect, useState } from 'react';
import SelectBox from '../../Form/SelectBox';
import CommonButton from '../../Button';
import dayjs from 'dayjs';
import { COMMON_FORMAT } from '../../../constants/date';
import TextArea from '../../Form/TextArea';
import ProductService from '../../../services/ProductService';
import ClipboardJS from 'clipboard';
import { message } from 'antd';
import { FieldSection } from './styles';

const getLabel = (order) =>
    `${dayjs(order.reservationDate).format(COMMON_FORMAT)} | ${order.productName} | ${order.supplierName}`;

function OrderClipboard({ workshop }) {
    const [text, setText] = useState('');
    const [order, setOrder] = useState('');

    useEffect(() => {
        const clipboard = new ClipboardJS('.btn');

        clipboard.on('success', function (e) {
            message.success('클립보드에 복사되었습니다.');

            e.clearSelection();
        });

        clipboard.on('error', function (e) {
            message.error('복사를 실패하였습니다.');
        });

        return () => {};
    }, []);

    useEffect(() => {
        setText(order ? ProductService.getSummaryForTeacher(workshop, order) : '');
    }, [order]);

    return (
        <div>
            <FieldSection>
                <SelectBox
                    label="대상 상품 선택"
                    name={'order'}
                    value={order}
                    onChange={(_, v) => setOrder(v)}
                    options={workshop.orders.map((order) => ({
                        key: order._id,
                        label: getLabel(order),
                        value: order._id,
                    }))}
                />
                <CommonButton className="btn" data-clipboard-target="#summary-for-teacher" inline>
                    클립보드 복사
                </CommonButton>
            </FieldSection>
            <FieldSection>
                <TextArea
                    id="summary-for-teacher"
                    rows={30}
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                />
            </FieldSection>
        </div>
    );
}

export default OrderClipboard;
