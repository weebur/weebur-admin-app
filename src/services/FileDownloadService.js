import fileDownload from 'js-file-download';
import { message } from 'antd';

export const download = async (fetcher, filename) => {
    try {
        const data = await fetcher();
        fileDownload(data, `${filename}.csv`);
    } catch (e) {
        message.error(JSON.stringify(e));
    }
};
