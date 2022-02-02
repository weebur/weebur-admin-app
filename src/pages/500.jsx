import { Result, Button } from 'antd';
import Link from 'next/link';
import ContentLayout from '../component/Layout/ContentLayout';

function InternalServerError() {
    return (
        <ContentLayout>
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
                extra={
                    <Link href={'/'} passHref={true}>
                        <Button type="primary">Back Home</Button>
                    </Link>
                }
            />
        </ContentLayout>
    );
}

export const getStaticProps = () => {
    return {
        props: { withoutSidebar: true },
    };
};

export default InternalServerError;
