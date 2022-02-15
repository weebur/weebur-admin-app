import dynamic from 'next/dynamic';
import dayjs from 'dayjs';

const DayjsCalendar = dynamic(() => import('./index'), { ssr: false });

dayjs.locale('ko');

export default DayjsCalendar;
