import * as ko from "knockout";
import { component } from "../../utils/decorators";

/// <reference path="knockout/knockout.d.ts" />

export function RegisterAnimationFieldComponents(): void {

    @component({
        selector: 'animation-field-component-home',
        template: `
        <section class="container">
            <header>Test animations</header>
            <article class="animated-fields">
                <div class="sample-zone">
                    <a href="#">Effet sur lien hypertext</a>
                </div>

                <div class="sample-zone">
                    <button data-bind="click : clickBtn">Effet sur un bouton</button>
                </div>

                <div class="sample-zone">
                    <!-- ko component : { name : 'input-field', params : text } --><!-- /ko -->
                </div>
            </article>
        </section>`
    })
    class AnimationFieldPage {
        text: KnockoutObservable<String>;
        
        constructor() {
            this.text = ko.observable("");
        }

        clickBtn() {
            console.log('button clicked');
        }
    }

    @component({
        selector: 'input-field',
        template: `
         <div class="input-field">
             <div data-bind="text : placeholder, css : placeholderClass"></div>
             <input data-bind="value: text, valueUpdate: 'input', attr : { 'placeholder' : placeholder }" type="text"  />
         </div>`
    })
    class InputField {
        isWriting: KnockoutObservable<Boolean>;
        placeholder: KnockoutObservable<String>;
        text: KnockoutObservable<String>;
        placeholderClass: KnockoutComputed<String>;

        constructor(params: String) {
            this.isWriting = ko.observable(false);
            this.placeholder = ko.observable("Nom");
            this.text = ko.observable(params);

            this.text.subscribe((newValue : String) => {
                 this.isWriting(newValue ? true : false);
            });

            this.placeholderClass = ko.computed(()=> {
                return this.isWriting() ? 
                    'input-field__placeholder' : 
                    'input-field__placeholder-hide';
            });
        }
    }
}