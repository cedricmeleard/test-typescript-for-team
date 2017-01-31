/**
 * Created by CMeleard on 23/01/2017.
 */
import * as ko from "knockout";
import * as Home from "./home/home";

/// <reference path="knockout/knockout.d.ts" />
ko.applyBindings(new Home.Home(), document.getElementById("app"));