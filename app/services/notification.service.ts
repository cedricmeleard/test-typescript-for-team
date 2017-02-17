import NotificationsService from "../utils/notifications-service";

/// <reference path="../utils/notifications-service.d.ts" />
export class Notifications {
    service : any;

    constructor() {
        this.service = new NotificationsService();
    }
 
    notify(message : String, imageUrl : String) : void {
        this.service.notify(message, imageUrl);
    }
   
}