import api from './index';

export const sendEmail = ({ senderName, senderAddress, senderPassword, receiver, subject, textBody, htmlBody }) => {
    return api
        .post('/email', { senderName, senderAddress, senderPassword, receiver, subject, textBody, htmlBody })
        .then((res) => res.data);
};
