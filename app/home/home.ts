/**
 * Created by CMeleard on 23/01/2017.
 */
import * as ko from "knockout";
import { component } from "../utils/decorators";

/// <reference path="knockout/knockout.d.ts" />
export class Home {
    name: KnockoutObservable<string>;
    users: KnockoutObservableArray<any>;
    opened: KnockoutObservable<boolean>;
    openClass: KnockoutComputed<string>;
    firstUser: KnockoutComputed<any>;

    constructor() {
        this.name = ko.observable('');
        this.users = ko.observableArray();
        this.opened = ko.observable(false);

        this.openClass = ko.computed(() => this.opened() ? 'opened' : '');
        this.firstUser =ko.computed(() => this.users()[0]);
    }

    addUser(): void {
        if (this.name() !== "") {
            const user: any = {
                id: guid(),
                url: `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg`,
                name: this.name()
            };
            this.users.push(user);
            //reset name
            this.name('');
        }
    }

    openMenu(): void {
        //toggle
        this.opened(!this.opened());
    }

}

///http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function guid(): string {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

@component({
    selector: "user-component",
    template: `<div class="user-template">
                    <img class="user-image" data-bind="attr : { src : url }" />
                    <div class="user-name" data-bind="text : name"></div>
                </div>`
    // templateUrl : './views/user.html'
})
class UserComponent {
    name: KnockoutObservable<string>;
    url: string;

    constructor(private params: any) {
        this.name = params.name;
        this.url = params.url;
    }
}

@component({
    selector: 'side-nav',
    template: `
    <div class="side-menu" data-bind="css : openedClass">
        <div class="icon-menu" data-bind="click : closeMenu">close</div>
    </div>`
})
class SideMenu {
    opened: KnockoutObservable<boolean>;
    openedClass: KnockoutComputed<string>;

    constructor(private params: any) {
        //j'ai un doute ici si params n'est pas directement injecté
        this.opened = params.opened;
        this.openedClass = ko.computed(() => params.opened() ? 'opened' : '');
    }

    closeMenu(): void {
        this.opened(false);
    }
}

