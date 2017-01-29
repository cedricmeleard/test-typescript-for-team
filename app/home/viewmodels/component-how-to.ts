import * as ko from "knockout";
import { component } from "../../utils/decorators";

export function RegisterUserComponents(): void {

    @component({
        selector: "user-home",
        template: `
            <section class="container">
                <header>Composant & Decorateur</header>
                <article>
                    <input type="text" data-bind="value : name, valueUpdate : 'input'" placeholder="Entrer un nom">
                    <button data-bind="click : addUser">Ajouter</button>
                    <!-- ko if : users -->
                    <div class="users" data-bind="foreach : users">
                        <user-component params="{ name : $data.name, url : $data.url }"></user-component>
                    </div>
                    <!-- /ko -->
                </article>
            </section>`
    })
    class UserHome {
        name: KnockoutObservable<string>;
        users: KnockoutObservableArray<any>;

        constructor() {
            this.name = ko.observable('');
            this.users = ko.observableArray();
        }

        addUser(): void {
            if (this.name() !== "") {
                const user: any = {
                    url: `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg`,
                    name: this.name()
                };
                this.users.push(user);
                //reset name
                this.name('');
            }
        }

    }

    @component({
        selector: "user-component",
        template: `
            <div class="user-template">
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
}