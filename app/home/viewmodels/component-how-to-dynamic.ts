import * as ko from "knockout";
import { component } from "../../utils/decorators";
import { QueryResult, QueryStatus } from "../../services/base.service";
import { Training, TrainingService } from "../../services/training.service";

import { randomImage } from "../../utils/random-image-helper";
//import { Notifications } from "../../services/notification.service";
declare var NotificationsService : any;

/// <reference path="knockout/knockout.d.ts" />

export function RegisterTrainingComponentsDyn(): void {

    @component({
        selector: "training-component-home-dyn",
        template: `
            <section class="container">
                <header>Composant & Decorateur</header>
                <article>
                    <!-- ko if :trainings -->
                    <div class="trainings" data-bind="foreach : trainings">
                        <!-- ko component : { name : 'user-component', params : $data } --><!-- /ko -->
                    </div>
                    <!-- /ko -->
                </article>
            </section>`
    })
    class TrainingDynamicHome {
        name: KnockoutObservable<string>;
        trainings: KnockoutObservableArray<Training>;
        length : any;
        index : any;
        notifications : any;
        service : TrainingService;
        
        constructor() {
            this.notifications = new NotificationsService();
            this.service = new TrainingService();

            this.name = ko.observable('');
            //Create a squeleton
            this.trainings = ko.observableArray([
                new Training("", "", "", null),
                new Training("", "", "", null),
                new Training("", "", "", null),
                new Training("", "", "", null)
            ]);
            this.length = this.trainings().length;
            this.index = 0;

            let result = this.service.get();
            if (result.status === QueryStatus.Ok){
                this.loadDynamic(result.body);
            }                
        }

        loadDynamic(mytrainings : Training[]): void {
            if( mytrainings.length === 0) {
                this.notifications.notify('Hello, vos formations sont disponibles ;)', randomImage());
                return;
            }
            
            let temp =  mytrainings.pop();
            setTimeout(() => {
                if (this.index < this.length) {
                    //this.trainings.shift();
                    this.trainings.splice(this.index, 0, temp);
                    this.index++;
                    this.trainings.pop();
                }
                else 
                    this.trainings.push(temp);    

                //this.notifications.notify(`La formation ${temp.name} est disponible`, temp.url);

                this.loadDynamic(mytrainings);
            }, 200);
        }
       
    }

}