import { withToken } from '../services/SsrService';

function Home() {
    return <div></div>;
}

export const getServerSideProps = withToken();

export default Home;
