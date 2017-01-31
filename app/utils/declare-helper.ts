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
}
