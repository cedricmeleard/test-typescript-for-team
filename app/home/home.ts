/**
 * Created by CMeleard on 23/01/2017.
 */
import * as ko from "knockout";
import { component } from "../utils/decorators";

import { RegisterUserComponents } from "./viewmodels/component-how-to";
import { RegisterTrainingComponents } from "./viewmodels/transclude-how-to";

const UserView: any = { name: 'User', template: 'user-home' };
const TrainingView: any = { name: 'Training', template: 'training-home' };

//load components
RegisterUserComponents();
RegisterTrainingComponents();

/// <reference path="knockout/knockout.d.ts" />
export class Home {
    opened: KnockoutObservable<boolean>;
    openClass: KnockoutComputed<string>;
    currentView: KnockoutObservable<any>;
    currentViewName: KnockoutComputed<string>;

    constructor() {
        this.opened = ko.observable(false);
        this.currentView = ko.observable(UserView);
        
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
            <div class="icon-menu" data-bind="click : closeMenu">close</div>
        </div>
        <div class="menu-items" data-bind="foreach : views">
            <nav class="nav-item" data-bind="click : $parent.chooseMenu">
                <div class="nav-item-title" data-bind="text : name"></div>
            </nav>
        </div>
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
        this.views = [UserView, TrainingView];

        this.openedClass = ko.computed(() => params.opened() ? 'opened' : '');
    }
    //methods
    chooseMenu = (data : any) =>  {  
        this.currentView(data);
        this.opened(false);
     }
    closeMenu = () => { this.opened(false) }
}

