/**
 * Created by CMeleard on 23/01/2017.
 */
import * as ko from "knockout";
import { component } from "../utils/decorators";

import { RegisterTrainingComponents } from "./viewmodels/component-how-to";
import { RegisterTrainingComponentsDyn } from "./viewmodels/component-how-to-dynamic";
import { RegisterTrainingTemplate } from "./viewmodels/transclude-how-to";

const TrainingComponentView: any = { name: 'Training - Component', template: 'training-component-home' };
const TrainingComponentDynView: any = { name: 'Training Dyn - Component', template: 'training-component-home-dyn' };
const TrainingTemplateView: any = { name: 'Training - Template', template: 'training-template-home' };

//load components
RegisterTrainingTemplate();
RegisterTrainingComponents();
RegisterTrainingComponentsDyn();

/// <reference path="knockout/knockout.d.ts" />
export class Home {
    opened: KnockoutObservable<boolean>;
    openClass: KnockoutComputed<string>;
    currentView: KnockoutObservable<any>;
    currentViewName: KnockoutComputed<string>;

    constructor() {
        this.opened = ko.observable(false);
        this.currentView = ko.observable(TrainingComponentDynView);
        
        this.openClass = ko.computed(() => this.opened() ? 'opened' : '');
        this.currentViewName = ko.computed(() => this.currentView().template);
    }

    openMenu(): void {
        //toggle
        this.opened(!this.opened());
    }
}

@component({
    selector: 'side-nav',
    template: `
    <div class="side-menu" data-bind="css : openedClass">
        <div class="menu-header">
            <button class="icon-menu" data-bind="click : closeMenu">close</button>
        </div>
        <ul role="menu" class="menu-items" data-bind="foreach : views">
            <li role="menuitem" class="nav-item" data-bind="click : $parent.chooseMenu">
                <span class="nav-item-title" data-bind="text : name"></span>
            </li>    
        </ul>
    </div>`
})
class SideMenu {
    opened: KnockoutObservable<boolean>;
    openedClass: KnockoutComputed<string>;
    currentView : KnockoutObservable<any>;
    views: Array<any>;

    constructor(private params: any) {
        //j'ai un doute ici si params n'est pas directement injecté
        this.opened = params.opened;
        this.currentView = params.view;
        this.views = [TrainingComponentView,TrainingComponentDynView, TrainingTemplateView];

        this.openedClass = ko.computed(() => params.opened() ? 'opened' : '');
    }
    //methods
    chooseMenu = (data : any) =>  {  
        this.currentView(data);
        this.opened(false);
     }
    closeMenu = () => { this.opened(false) }
}

