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

    get(params? : ServiceParam) : QueryResult
}

interface IGenericService extends IReadOnlyService {
    post(data : any, params? : ServiceParam) : void
}

export class BaseService implements IGenericService {
    url : String;

    constructor() {
    }

    get() {
        return new QueryResult();
    }

    post(data : any, params? : ServiceParam) {

    }
}
