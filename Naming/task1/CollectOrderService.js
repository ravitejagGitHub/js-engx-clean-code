const { msg } = require('./lib/constants');
const INFO_NOTIFICATION_LEVEL = 4;
const CRITICAL_NOTIFICATION_LEVEL = 4;
module.exports = class CollectOrderService {
    constructor(collectionService, notifyService) {
        this.collectionService = collectionService;
        this.notifyService = notifyService;
    }

    submitOrder(order) {
        if (this.collectionService.isEligibleForCollection(order))
            this.notifyService.notifyCustomer(msg.READY_FOR_COLLECT, INFO_NOTIFICATION_LEVEL);
        else
            this.notifyService.notifyCustomer(msg.IMPOSSIBLE_TO_COLLECT, CRITICAL_NOTIFICATION_LEVEL);
    }

    setCollectionService(collectionService) {
        this.collectionService = collectionService;
    }

    setNotifyService(notifyService) {
        this.notifyService = notifyService;
    }
};
