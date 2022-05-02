import fileDownload from 'js-file-download';
import { message } from 'antd';

export const download = async (fetcher, filename) => {
    try {
        const data = await fetcher();

        const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) {
            // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) {
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }

        // fileDownload(data, `${filename}.csv`);
    } catch (e) {
        message.error(JSON.stringify(e));
    }
};
