import * as ko from "knockout";
import { component } from "../../utils/decorators";
import { declareTransclude } from "../../utils/declare-helper";
import { randomImage } from "../../utils/random-image-helper";

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
        trainings: KnockoutObservableArray<any>;
        images: Number[]
        
        constructor() {
            this.name = ko.observable('');
            this.images = [];
            this.trainings = ko.observableArray([
                {
                    name: 'Knockout de A à Z',
                    description: "From zero to hero, avec knockout",
                    url: `https://randomuser.me/api/portraits/women/${randomImage(this.images)}.jpg`, 
                    actions : [ 'subscribe']
                },
                {
                    name: 'Embarquez avec TypeScript',
                    description: "Découvrez TypeScript, et comment il peut vous sauvez la vie",
                    url: `https://randomuser.me/api/portraits/women/${randomImage(this.images)}.jpg`,
                    actions : [ 'subscribe']
                },
                {
                    name: 'Quel avenir pour Webforms ?',
                    description: "Web quoi?",
                    url: `https://randomuser.me/api/portraits/women/${randomImage(this.images)}.jpg`,
                    actions : [ 'launch', 'like']
                },
                {
                    name: 'Become progressive',
                    description: "C'est la fin des haricots",
                    url: `https://randomuser.me/api/portraits/women/${randomImage(this.images)}.jpg`,
                    actions : [ 'launch']
                }
            ]);
        }

        toString() : string {
            return this.name();
        }
    }
}