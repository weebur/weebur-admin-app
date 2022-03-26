import api from './index';

export const sendEmail = ({
    senderName,
    senderAddress,
    senderPassword,
    receiver,
    subject,
    textBody,
    htmlBody,
    fileKeys,
}) => {
    return api
        .post('/email', { senderName, senderAddress, senderPassword, receiver, subject, textBody, htmlBody, fileKeys })
        .then((res) => res.data);
};
