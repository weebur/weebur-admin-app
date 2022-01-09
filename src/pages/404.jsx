import { Result, Button } from 'antd';
import Link from 'next/link';
import ContentLayout from '../component/Layout/ContentLayout';

function NotFound() {
    return (
        <ContentLayout>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
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

export default NotFound;
