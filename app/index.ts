/**
 * Created by CMeleard on 23/01/2017.
 */
import * as ko from "knockout";
import * as Home from "./home/home";

/// <reference path="knockout/knockout.d.ts" />
ko.applyBindings(new Home.Home(), document.getElementById("app"));

//IE8 HACK
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    }
}
