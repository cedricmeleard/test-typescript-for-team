import * as ko from "knockout";
import * as jquery from "jquery";

export function declareTransclude({ handler, template}: { handler: string, template: string }) {

    if (!ko.bindingHandlers[handler]) {
        ko.bindingHandlers[handler] = {
            init: (element): any => {
                return { controlsDescendantBindings: true };
            },
            update: (element, valueAcessor, allBindingAccessor, model) => {
                const uniqueId = ko.utils.unwrapObservable(valueAcessor());
                
                const script = document.querySelector(`#${uniqueId}`);
                let content : any;
                if (!script) {
                    try {
                        content = document.createElement("script");
                        content.type = "text/html";
                        content.id = uniqueId;
                        content.innerHTML = element.innerHTML;
                    }
                    catch (error) {
                        //in order to works on IE8 only - such a bad thing :'(
                        content = document.createElement(`<script type="text/html" id="${uniqueId}">${element.innerHTML}</script>`);
                    }
                    document.querySelector("#app").appendChild(content);
                }
                ko.renderTemplate(template, {
                    name: uniqueId,
                    model: model
                }, null, element, "replaceChildren");

            }
        };
    }
}
