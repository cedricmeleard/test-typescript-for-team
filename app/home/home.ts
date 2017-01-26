/**
 * Created by CMeleard on 23/01/2017.
 */
import * as ko from "knockout";
import { component } from "../utils/decorators";

/// <reference path="knockout/knockout.d.ts" />
export class Home {
    name : KnockoutObservable<string>;
    users : KnockoutObservableArray<any>;

    constructor(){
        this.name = ko.observable("a dude");
        this.users = ko.observableArray();
    }

    addUser() : void {
        if ( this.name() !== "") {   
            const user : any = { name : this.name() };
            this.users.push(user);    
            //reset name
            this.name('');
        }
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

