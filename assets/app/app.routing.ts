import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {IntroductionComponent} from './components/introduction.component';
import {TaskOneComponent} from './components/task-one.component';
import {TaskTwoComponent} from './components/task-two.component';
import {TaskThreeComponent} from './components/task-three.component';

const appRoutes: Routes = [
    {
        path:'',
        component: IntroductionComponent
    },
    {
        path:'task-one',
        component: TaskOneComponent
    },
    {
        path:'task-two',
        component: TaskTwoComponent
    },
    {
        path:'task-three',
        component: TaskThreeComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });