import React, { useEffect, useState } from 'react';
import { StyleSheet, BlobProvider } from '@react-pdf/renderer';
import ApplicationDocuments from './lib/ApplicationDocuments';
import CommonButton from '../../../Button';

import DocumentsList from './lib/DocumentsList';
import { uploadWorkshopDocuments } from '../../../../services/fileService';
import { message, Spin } from 'antd';
import { reverse } from 'lodash-es';
import useWorkshopsStore from '../../../../stores/workshop';
import { deleteWorkshopDocument } from '../../../../api/WorkshopAPI';
import OrderSelectList from './lib/OrderSelectList';

function Application() {
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
                <BlobProvider document={<ApplicationDocuments workshop={targetWorkshop} />}>
                    {({ blob, url, loading, error }) => (
                        <CommonButton
                            onClick={async () => {
                                try {
                                    const docs = await uploadWorkshopDocuments(
                                        'applications',
                                        blob,
                                        `?????????????????????_${workshop.companyName}_${workshop.clientName}???.pdf`,
                                        workshop._id,
                                        selectedOrders.map((order) => order._id),
                                    );

                                    updateWorkshopDocuments('applications', docs);

                                    message.success('?????? ????????? ?????????????????????.');
                                } catch (e) {
                                    message.error('?????? ????????? ?????????????????????.');
                                }
                            }}
                        >
                            {loading ? <Spin /> : '?????? ????????????'}
                        </CommonButton>
                    )}
                </BlobProvider>
            </div>
            <DocumentsList
                list={reverse(workshop.applications?.slice() || [])}
                label={'?????? ?????????'}
                onRemove={async (key) => {
                    try {
                        const docs = await deleteWorkshopDocument(workshop._id, 'applications', key);
                        updateWorkshopDocuments('applications', docs);

                        message.success('????????? ?????????????????????.');
                    } catch (e) {
                        message.success('?????? ????????? ?????????????????????.');
                    }
                }}
            />
        </div>
    );
}

export default Application;
