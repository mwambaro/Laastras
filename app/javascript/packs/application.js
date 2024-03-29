// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import "bootstrap"
/** If followed instructions to add bootstrap, jquery, and popover using yarn or npm ***
require("@popperjs/core")
import {Tooltip, Popover} from "bootstrap"
require("../stylesheets/application.scss")
document.addEventListener("turbolinks:load", () => {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('data-bs-toggle="tooltip"'))
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl){
        return new Tooltip(tooltipTriggerEl)
    })
    var popoverTriggerList = [].slice.call(document.querySelectorAll('data-bs-toggle="popover"'))
    var popoverList = popoverTriggerList.map(function(popoverTriggerEl){
        return new Popover(popoverTriggerEl)
    })
})
/** END */
import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()
// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
