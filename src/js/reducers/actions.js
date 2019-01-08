export default {
    employWorker: function (worker) {
        return {
            type: 'EMPLOY_WORKER',
            worker: worker
        }
    },
    editWorkTime: function (worker) {
        return {
            type: 'EDIT_WORK_TIME',
            worker: worker,
        }
    },
    fireWorker: function (workerId) {
        return {
            type: 'FIRE_WORKER',
            id: workerId
        }
    }
};
