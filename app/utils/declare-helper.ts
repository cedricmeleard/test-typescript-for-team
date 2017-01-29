import * as ko from "knockout";

export function declareTransclude({ handler, template}: { handler: string, template: string }) {

    if (!ko.bindingHandlers[handler]) {
        ko.bindingHandlers[handler] = {
            init: (element): any => {
                return { controlsDescendantBindings: true };
            },
            update: (element, valueAcessor, allBindingAccessor, model) => {
                const uniqueId = ko.utils.unwrapObservable(valueAcessor());
                var script = document.querySelector(`#${uniqueId}`);
                if (!script) {
                    const content = document.createElement("script");
                    content.type = "text/html";
                    content.id = uniqueId;
                    content.innerHTML = element.innerHTML;
                    document.querySelector("body").appendChild(content);
                }
                ko.renderTemplate(template, {
                    name: uniqueId,
                    model: model
                }, null, element, "replaceChildren");

            }
        };
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
}
