import * as ko from "knockout";
import { QueryResult, QueryStatus } from "../../services/base.service";
import { Training, TrainingService } from "../../services/training.service";
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
        service: TrainingService;

        constructor() {
            this.name = ko.observable('');
            this.service = new TrainingService();
            this.trainings = ko.observableArray([
                new Training("", "", "", null),
                new Training("", "", "", null),
                new Training("", "", "", null),
                new Training("", "", "", null)
            ]);

            this.service.get().then( result => {
                if (result.status === QueryStatus.Ok){
                    this.trainings(result.body);
                }   
            });
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