import React, { useState } from 'react';
import { StyleSheet, BlobProvider } from '@react-pdf/renderer';
import ApplicationDocuments from './lib/ApplicationDocuments';
import CommonButton from '../../../Button';

import DocumentsList from './lib/DocumentsList';
import { uploadWorkshopDocuments } from '../../../../services/fileService';
import { message } from 'antd';
import { reverse } from 'lodash-es';
import useWorkshopsStore from '../../../../stores/workshop';
import { deleteWorkshopDocument } from '../../../../api/WorkshopAPI';

function Application() {
    const workshop = useWorkshopsStore((state) => state.workshop);
    const updateWorkshopDocuments = useWorkshopsStore((state) => state.updateWorkshopDocuments);

    return (
        <div>
            <div>
                <BlobProvider document={<ApplicationDocuments workshop={workshop} />}>
                    {({ blob, url, loading, error }) => (
                        <CommonButton
                            onClick={async () => {
                                try {
                                    const docs = await uploadWorkshopDocuments(
                                        'applications',
                                        blob,
                                        `위버예약신청서_${workshop.companyName}_${workshop.clientName}님.pdf`,
                                        workshop._id,
                                        workshop.orders.map((order) => order._id),
                                    );

                                    updateWorkshopDocuments('applications', docs);

                                    message.success('문서 저장을 성공하였습니다.');
                                } catch (e) {
                                    message.error('문서 저장을 실패하였습니다.');
                                }
                            }}
                        >
                            {loading ? 'Loading document...' : '새로 저장하기'}
                        </CommonButton>
                    )}
                </BlobProvider>
            </div>
            <DocumentsList
                list={reverse(workshop.applications?.slice() || [])}
                label={'예약 신청서'}
                onRemove={async (key) => {
                    try {
                        const docs = await deleteWorkshopDocument(workshop._id, 'applications', key);
                        updateWorkshopDocuments('applications', docs);

                        message.success('문서가 삭제되었습니다.');
                    } catch (e) {
                        message.success('문서 삭제를 실패하였습니다.');
                    }
                }}
            />
        </div>
    );
}

export default Application;
