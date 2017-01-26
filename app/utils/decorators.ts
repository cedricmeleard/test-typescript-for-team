import * as ko from "knockout";

export function component({ selector, template } : { selector : string, template : string }) {
    return function (constructor : any) {
        ko.components.register(selector, {
            viewModel: constructor.length < 2 ? constructor : {
                createViewModel: function (params : any, _a : any) {
                    return new constructor(params);
                }
            },
            template: template || "<!---->",
        });
    };
}