import { useEffect } from 'react';
import useAdminsStore from '../stores/admins';
import { message } from 'antd';
import { useRouter } from 'next/router';

const whiteList = ['/login', '/signup', '/workshops/calendar/[supplierId]'];

function useAdminUser() {
    const router = useRouter();
    const me = useAdminsStore((state) => state.me);
    const fetchMe = useAdminsStore((state) => state.fetchMe);

    const fetchAdminUser = async () => {
        try {
            await fetchMe();
        } catch (e) {
            message.error('유저 정보를 불러오지 못했습니다.');
        }
    };

    useEffect(() => {
        if (whiteList.includes(router.route)) {
            return;
        }
        fetchAdminUser();
    }, []);

    return { me };
}

export default useAdminUser;
