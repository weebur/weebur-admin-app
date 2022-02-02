import React from 'react';
import ContentLayout from '../../component/Layout/ContentLayout';
import WorkshopForm from '../../component/ModifyForms/Workshop';

function NewWorkshop(props) {
    return (
        <ContentLayout>
            <WorkshopForm />
        </ContentLayout>
    );
}

export default NewWorkshop;
