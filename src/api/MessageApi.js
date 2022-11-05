import api from './index';

export const sendMessage = async ({ to, content, cc }) => {
    return api.post(`/messages/send`, { to, content, cc }).then((res) => res.data);
};
