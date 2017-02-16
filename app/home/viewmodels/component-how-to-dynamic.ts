import * as ko from "knockout";
import { component } from "../../utils/decorators";
import { Training } from "./component-how-to";
import { randomImage } from "../../utils/random-image-helper";

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
                        `https://randomuser.me/api/portraits/women/${randomImage(this.images)}.jpg`,
                        ['subscribe']),
                    new Training("Embarquez avec TypeScript", "Découvrez TypeScript, et comment il peut vous sauvez la vie",
                        `https://randomuser.me/api/portraits/women/${randomImage(this.images)}.jpg`,
                        ['subscribe']),
                    new Training("Quel avenir pour Webforms ?", "Web quoi?",
                        `https://randomuser.me/api/portraits/women/${randomImage(this.images)}.jpg`,
                        ['launch', 'like']),
                    new Training("Become progressive", "C'est la fin des haricots",
                        `https://randomuser.me/api/portraits/women/${randomImage(this.images)}.jpg`,
                        ['launch']),
                    new Training("Vue Js", "Framework Js orienté composant",
                        `https://randomuser.me/api/portraits/women/${randomImage(this.images)}.jpg`,
                        ['launch']),
                    new Training("Angular", "La réinvention de AngularJS",
                        `https://randomuser.me/api/portraits/women/${randomImage(this.images)}.jpg`,
                        ['launch']),
                    new Training("ICallBackEventHandler", "Une fonctionalité de .net qui est de la m...",
                        `https://randomuser.me/api/portraits/women/${randomImage(this.images)}.jpg`,
                        ['launch']),
                    new Training("Knockout i snot dead", "Knockout avec Aurelia",
                        `https://randomuser.me/api/portraits/women/${randomImage(this.images)}.jpg`,
                        ['launch'])
                ];

                this.loadDynamic(mytrainings);
        }

        loadDynamic(mytrainings : Training[]): void {
            if( mytrainings.length === 0)
            return;

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