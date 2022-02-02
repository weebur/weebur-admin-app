import api from './';

export const fetchWorkshop = async (workshopId) => {
    return api.get(`/workshops/${workshopId}`).then((res) => res.data);
};
