export enum QueryStatus { Ok, Error, Pending }
export class QueryResult {
    status : QueryStatus;
    message: String;
    body : any;

    constructor(){
        this.status = QueryStatus.Pending;
    }
}

interface Criterias {
}

class ServiceParam {
    constructor( public query? : String, private params? : Criterias){
    }
}


interface IReadOnlyService {
    url : String;

    get(params? : ServiceParam) : Promise<QueryResult>
}

interface IGenericService extends IReadOnlyService {
    post(data : any, params? : ServiceParam) : void
}

export class BaseService implements IGenericService {
    url : String;

    constructor() {
    }

    get(params? : ServiceParam )  {
        const promise = new Promise((resolve, reject) => {
            //call fetch then resolve
            resolve( null );
        });
        return promise;
    }

    post(data : any, params? : ServiceParam) {
     
    }
}
