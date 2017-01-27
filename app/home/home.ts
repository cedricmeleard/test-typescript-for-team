/**
 * Created by CMeleard on 23/01/2017.
 */
import * as ko from "knockout";
import { component } from "../utils/decorators";

/// <reference path="knockout/knockout.d.ts" />
export class Home {
    name : KnockoutObservable<string>;
    users : KnockoutObservableArray<any>;
    opened : KnockoutObservable<boolean>;

    constructor(){
        this.name = ko.observable("a dude");
        this.users = ko.observableArray();
        this.opened = ko.observable(false);
    }

    addUser() : void {
        if ( this.name() !== "") {   
            const user : any = { name : this.name() };
            this.users.push(user);    
            //reset name
            this.name('');
        }
    }

    openMenu() : void {
        //toggle
        console.log(`menu is ${this.opened() ? 'open' : 'closed'}`);
        this.opened(!this.opened());
    }

}

@component( { 
    selector : 'user-component', 
    template : `<div class="user-template">
                    <div data-bind="text : name"></div>
                </div>`
})
class UserComponent {
    name : KnockoutObservable<string>;
    hello : KnockoutComputed<string>;

    constructor(private params: any){
        this.name = params.name;
    }
}

@component( {
    selector : 'side-nav',
    template : `
    <div class="side-menu" data-bind="css : openedClass    ">
        <div class="icon-menu" data-bind="click : closeMenu">close</div>
    </div>`
})
class SideMenu {
    opened : KnockoutObservable<boolean>;
    openedClass : KnockoutComputed<string>;

    constructor(private params : any){
        //j'ai un doute ici si params n'est pas directement injecté
        this.opened = params.opened;
        this.openedClass = ko.computed(() => params.opened() ? 'opened' : '' );
    }

    closeMenu() : void {
        console.log(`Closing menu`);
        this.opened(false);
    }
}

