import React from 'react';
import dynamic from 'next/dynamic';
// import Estimate from '../../component/page-components/Estimate';
const Estimate = dynamic(() => import('../../component/page-components/Estimate'), { ssr: false });

function EstimatePage(props) {
    // if (typeof window !== 'undefined') return null;
    console.log('render');
    return <Estimate />;
}

export const getServerSideProps = () => {
    return {
        props: {
            withoutContext: true,
        },
    };
};

export default EstimatePage;
