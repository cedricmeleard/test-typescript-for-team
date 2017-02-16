import * as ko from "knockout";
import { component } from "../../utils/decorators";
import { Training } from "./component-how-to";
import { Notifications } from "../../services/notification.service";

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
        images : Number[];
        
        constructor() {
            this.name = ko.observable('');
            this.trainings = ko.observableArray([
                new Training("", "", "", null),
                new Training("", "", "", null),
                new Training("", "", "", null),
                new Training("", "", "", null)
            ]);
            this.length = this.trainings().length;
            this.index = 0;
            this.images = [];

            let mytrainings = [
                    new Training("Knockout de A à Z", "From zero to hero, avec knockout",
                        `https://randomuser.me/api/portraits/women/${this.randDomImage()}.jpg`,
                        ['subscribe']),
                    new Training("Embarquez avec TypeScript", "Découvrez TypeScript, et comment il peut vous sauvez la vie",
                        `https://randomuser.me/api/portraits/women/${this.randDomImage()}.jpg`,
                        ['subscribe']),
                    new Training("Quel avenir pour Webforms ?", "Web quoi?",
                        `https://randomuser.me/api/portraits/women/${this.randDomImage()}.jpg`,
                        ['launch', 'like']),
                    new Training("Become progressive", "C'est la fin des haricots",
                        `https://randomuser.me/api/portraits/women/${this.randDomImage()}.jpg`,
                        ['launch']),
                    new Training("Vue Js", "Framework Js orienté composant",
                        `https://randomuser.me/api/portraits/women/${this.randDomImage()}.jpg`,
                        ['launch']),
                    new Training("Angular", "La réinvention de AngularJS",
                        `https://randomuser.me/api/portraits/women/${this.randDomImage()}.jpg`,
                        ['launch']),
                    new Training("ICallBackEventHandler", "Une fonctionalité de .net qui est de la m...",
                        `https://randomuser.me/api/portraits/women/${this.randDomImage()}.jpg`,
                        ['launch']),
                    new Training("Knockout i snot dead", "Knockout avec Aurelia",
                        `https://randomuser.me/api/portraits/women/${this.randDomImage()}.jpg`,
                        ['launch'])
                ];

                this.loadDynamic(mytrainings);
        }

        randDomImage() : string {
            const unwanted = [1, 5, 9, 13, 14, 16, 30, 36, 37, 41, 42, 52, 69, 75, 80, 81, 89, 92, 98];

            let random = Math.floor(Math.random() * 100);
            while ( unwanted.indexOf(random) !== -1 || this.images.indexOf(random) !== -1) {
                random = Math.floor(Math.random() * 100);
            }
            
            this.images.push(random);
            return random.toString();
        }

        loadDynamic(mytrainings : Training[]): void {
            if( mytrainings.length === 0) {
                
                //new Notifications();//.notify("", "");

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

                this.loadDynamic(mytrainings);
            }, 200);
        }
       
    }

}