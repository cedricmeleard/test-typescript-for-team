import * as ko from "knockout";
import { component } from "../../utils/decorators";
import { QueryResult, QueryStatus } from "../../services/base.service";
import { Training, TrainingService } from "../../services/training.service";
import { declareTransclude } from "../../utils/declare-helper";
import { randomImage } from "../../utils/random-image-helper";

/// <reference path="knockout/knockout.d.ts" />

export function RegisterTrainingTemplate(): void {

    declareTransclude({ handler : 'testHandler', template : 'my-template' });

    @component({
        selector: "training-template-home",
        template: `
            <section class="container">
                <header>Template & Transculde</header>
                <article>
                    <h2>Voici un exemple avec des templates, on affiche la description:</h2>
                    <!-- ko if : trainings -->
                    <div class="trainings" data-bind="foreach : trainings">
                        <div data-bind="testHandler : 'training-desc'">
                            <div data-bind="text : description"></div>
                        </div>
                    </div>
                    <!-- /ko -->
                </article>
                
                <article>
                    <h2>on peut replacer le code inline, par exemple avec des actions:</h2>
                    <!-- ko if : trainings -->
                    <div class="trainings" data-bind="foreach : trainings">
                        <div data-bind="testHandler : 'training-act'">
                            <!-- ko foreach : actions -->
                                <button data-bind="text : $data"></button>
                            <!-- /ko -->
                        </div>
                    </div>
                    <!-- /ko -->
                </article>
            </section>            
<script type="text/html" id="my-template">
    <div class="training">
        <div class="training-template">
            <img class="training-image" data-bind="attr : { src : model.url }" />
            <div class="training-datas">
                <div class="training-title" data-bind="text : model.name"></div>
                <div class="training-secondary">
                    <div data-bind="template : { name : name, data : model }"></div>
                </div>
            </div>
        </div>
    </div>
</script> 
 `
    })
    class TrainingHome {
        name: KnockoutObservable<string>;
        trainings: KnockoutObservableArray<Training>;
        service: TrainingService;
        
        constructor() {
            this.name = ko.observable('');
            this.trainings = ko.observableArray<Training>();
            
            this.service = new TrainingService();             
            let result = this.service.get();
            if (result.status === QueryStatus.Ok){
                this.trainings(result.body);
            }  
        }

        toString() : string {
            return this.name();
        }
    }
}