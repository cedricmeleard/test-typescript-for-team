import * as ko from "knockout";
import { component } from "../../utils/decorators";
import { randomImage } from "../../utils/random-image-helper";

/// <reference path="knockout/knockout.d.ts" />

export function RegisterTrainingComponents(): void {

    @component({
        selector: "training-component-home",
        template: `
            <section class="container">
                <header>Composant & Decorateur</header>
                <article>
                    <!-- ko if : trainings -->
                    <div class="trainings" data-bind="foreach : trainings">
                        <!-- ko component : { name : 'user-component', params : $data } --><!-- /ko -->
                    </div>
                    <!-- /ko -->
                </article>
                <img src="http://p8.storage.canalblog.com/80/36/968865/87973459_o.jpg">
            </section>`
    })
    class UserHome {
        name: KnockoutObservable<string>;
        trainings: KnockoutObservableArray<Training>;
        images: Number[];

        constructor() {
            this.name = ko.observable('');
            this.images = [];
            this.trainings = ko.observableArray([
                new Training("", "", "", null),
                new Training("", "", "", null),
                new Training("", "", "", null),
                new Training("", "", "", null)
            ]);

            setTimeout(() => {
                this.trainings([
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
                        ['launch'])
                ]);
            }, 1500);
        }

    }

    @component({
        selector: "user-component",
        template: `
<div class="training" data-bind="css : trainingLoading">
    <div class="training-template">
        <img class="training-image" data-bind="attr : { src : params.url }, css : imageClass" />
        <div class="training-datas">
            <div class="training-title" data-bind="css : textClass">
                <span  data-bind="text : params.name"></span>
            </div>
            <div class="training-secondary">
                 <div data-bind="text : params.description, css : descriptionClass"></div>
            </div>
        </div>
    </div>
</div>`
    })
    class TrainingComponent {
        imageClass: KnockoutComputed<string>;
        textClass: KnockoutComputed<string>;
        descriptionClass: KnockoutComputed<string>;
        trainingLoading: KnockoutComputed<string>;

        constructor(private params: Training) {
            console.dir(params);

            this.imageClass = ko.computed(() => {
                return params.loading() ? 'no-image' : '';
            });

            this.textClass = ko.computed(() => {
                return params.loading() ? 'no-text' : '';
            });

            this.descriptionClass = ko.computed(() => {
                return params.loading() ? 'no-description' : '';
            });

            this.trainingLoading = ko.computed(() => {
                return params.loading() ? 'loading' : '';
            });
        }
    }
}


export class Training {
    name: string;
    description: string;
    url: string;
    actions: [string];

    constructor(name: string, description: string, url: string, actions: [string]) {
        this.name = name;
        this.description = description;
        this.url = url;
        this.actions = actions;
    }

    loading(): boolean {
        return this.name === "" && this.description === "" && this.url === "" && this.actions === null;
    }
}