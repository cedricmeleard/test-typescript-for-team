"use strict";
class NotificationsService{

    constructor() {

    }

     notify(message, imageUrl) {
        if('Notification' in window){
            Notification.requestPermission(permission => {
                if (permission === 'granted') {
                    var notification = new Notification('Max Koder',{
                        body : message,
                        icon : imageUrl
                    });
                } 
                else if (permission === 'denied') {
                    alert("Vous n'avez pas accepté les notifications, votre navigation peut en être affecté.");
                }
                else {
                    alert("Veuillez accepter les notifications");
                }
            });
        }
        else {
            alert("Mon navigateur est un dinosaure");
        }
    }
}
exports.default = NotificationsService;
