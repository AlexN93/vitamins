"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var introduction_component_1 = require("./components/introduction.component");
var task_one_component_1 = require("./components/task-one.component");
var task_two_component_1 = require("./components/task-two.component");
var task_three_component_1 = require("./components/task-three.component");
var appRoutes = [
    {
        path: '',
        component: introduction_component_1.IntroductionComponent
    },
    {
        path: 'task-one',
        component: task_one_component_1.TaskOneComponent
    },
    {
        path: 'task-two',
        component: task_two_component_1.TaskTwoComponent
    },
    {
        path: 'task-three',
        component: task_three_component_1.TaskThreeComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });
//# sourceMappingURL=app.routing.js.map