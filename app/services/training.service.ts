import { BaseService, QueryResult, QueryStatus } from "./base.service";
import { randomImage} from "../utils/random-image-helper";

export class Training {
    name: string;
    description: string;
    url: string;
    actions: [string];

    constructor(name?: string, description?: string, url?: string, actions?: [string]) {
        this.name = name;
        this.description = description;
        this.url = url;
        this.actions = actions;
    }

    loading(): boolean {
        return this.name === "" && this.description === "" && this.url === "" && this.actions === null;
    }
}

export class TrainingService extends BaseService {
    url : "/api/trainings/";
    //image deja utilisées
    images : Number[];

    constructor() {
        super();
        this.images = [];
    }
    
    get() {
        //datas
        const mytrainings =  [
                    new Training("Knockout de A à Z", "From zero to hero, avec knockout",
                        randomImage(this.images),
                        ['subscribe']),
                    new Training("Embarquez avec TypeScript", "Découvrez TypeScript, et comment il peut vous sauvez la vie",
                        randomImage(this.images),
                        ['subscribe']),
                    new Training("Quel avenir pour Webforms ?", "Web quoi?",
                        randomImage(this.images),
                        ['launch', 'like']),
                    new Training("Become progressive", "C'est la fin des haricots",
                        randomImage(this.images),
                        ['launch']),
                    new Training("Vue Js", "Framework Js orienté composant",
                        randomImage(this.images),
                        ['launch']),
                    new Training("Angular", "La réinvention de AngularJS",
                        randomImage(this.images),
                        ['launch']),
                    new Training("ICallBackEventHandler", "Une fonctionalité de .net qui est de la m...",
                        randomImage(this.images),
                        ['launch']),
                    new Training("Knockout i snot dead", "Knockout avec Aurelia",
                        randomImage(this.images),
                        ['launch'])
                ]


        const promise = new Promise<QueryResult>((resolve, reject) => {
            //delay 1sec before resolve
            setTimeout(() => {
                //result
                const result = new QueryResult();
                result.status = QueryStatus.Ok;
                result.message = "Hell yeah";
                //ws datas
                result.body = mytrainings;
                if (result.status === QueryStatus.Ok) {
                    resolve(result);
                }
                else {
                    reject();
                }
            }, 2000 );
        });

        return promise;
    }

    post(){

    }
}