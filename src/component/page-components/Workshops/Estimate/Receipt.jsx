import React, { useEffect, useState } from 'react';
import { PDFDownloadLink, BlobProvider, StyleSheet } from '@react-pdf/renderer';
import ReceiptDocuments from './lib/ReceiptDocuments';
import CommonButton from '../../../Button';
import useWorkshopsStore from '../../../../stores/workshop';
import { uploadWorkshopDocuments } from '../../../../services/fileService';
import DocumentsList from './lib/DocumentsList';
import { reverse } from 'lodash-es';
import { deleteWorkshopDocument } from '../../../../api/WorkshopAPI';
import { message, Spin } from 'antd';
import OrderSelectList from './lib/OrderSelectList';

function Receipt() {
    const workshop = useWorkshopsStore((state) => state.workshop);
    const updateWorkshopDocuments = useWorkshopsStore((state) => state.updateWorkshopDocuments);

    const [selectedOrders, setSelectedOrders] = useState(workshop.orders);
    const [targetWorkshop, setTargetWorkshop] = useState(workshop);

    const onToggleOrderChecked = (checked, order) => {
        if (checked) {
            setSelectedOrders([...selectedOrders, order]);
        } else {
            setSelectedOrders(selectedOrders.filter((selected) => selected._id !== order._id));
        }
    };

    useEffect(() => {
        setTargetWorkshop({ ...targetWorkshop, orders: selectedOrders });
    }, [selectedOrders]);

    useEffect(() => {
        setTargetWorkshop(workshop);
    }, [workshop]);

    return (
        <div>
            <OrderSelectList
                orders={workshop.orders}
                selectedOrders={selectedOrders}
                handleToggle={onToggleOrderChecked}
            />
            <div>
                <BlobProvider document={<ReceiptDocuments workshop={targetWorkshop} />}>
                    {({ blob, url, loading, error }) => (
                        <CommonButton
                            onClick={async () => {
                                try {
                                    const docs = await uploadWorkshopDocuments(
                                        'receipts',
                                        blob,
                                        `위버거래명세서_${workshop.companyName}_${workshop.clientName}님.pdf`,
                                        workshop._id,
                                        selectedOrders.map((order) => order._id),
                                    );

                                    updateWorkshopDocuments('receipts', docs);

                                    message.success('문서 저장을 성공하였습니다.');
                                } catch (e) {
                                    message.error('문서 저장을 실패하였습니다.');
                                }
                            }}
                        >
                            {loading ? <Spin /> : '새로 저장하기'}
                        </CommonButton>
                    )}
                </BlobProvider>
            </div>
            <DocumentsList
                list={reverse(workshop.receipts?.slice() || [])}
                label={'거래명세서'}
                onRemove={async (key) => {
                    try {
                        const docs = await deleteWorkshopDocument(workshop._id, 'receipts', key);
                        updateWorkshopDocuments('receipts', docs);

                        message.success('문서가 삭제되었습니다.');
                    } catch (e) {
                        message.success('문서 삭제를 실패하였습니다.');
                    }
                }}
            />
        </div>
    );
}

export default Receipt;
