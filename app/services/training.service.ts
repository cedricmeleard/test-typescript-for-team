interface Criterias {
}

class ServiceParam {
    constructor( public query? : String, private params? : Criterias){
    }
}

enum QueryStatus { Ok, Error, Pending }
class QueryResult {
    status : QueryStatus;
    message: String;
    //TODO peut-être a revoir
    body : any;

    constructor(){
        this.status = QueryStatus.Pending;
    }
}

interface IReadOnlyService {
    url : String;

    get(params? : ServiceParam) : QueryResult
}

interface IGenericService extends IReadOnlyService {
    post(data : any, params? : ServiceParam) : void
}

class BaseService implements IGenericService {
    url : String;

    constructor() {
    }

    get() {
        return new QueryResult();
    }

    post(data : any, params? : ServiceParam) {

    }
}


class ServiceTest extends BaseService {
    url : "/api/test/";

    constructor() {
        super();
    }
    
    get() {
        var result = new QueryResult();
        result.status = QueryStatus.Ok;
        result.message = "Hell yeah";

        return result;
    }

    post(){

    }
}

class MyClass {
    service : ServiceTest;

    constructor(service? : ServiceTest ){
        this.service = service ? service : new ServiceTest();
    }

    run() : void {
        var temp = this.service.get();

        console.log(temp.message);
    }
}

const test = new MyClass(new ServiceTest());
test.run();