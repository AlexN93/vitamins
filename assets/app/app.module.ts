import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent }   from './components/app.component';
import { IntroductionComponent }   from './components/introduction.component';
import { TaskOneComponent }   from './components/task-one.component';
import { TaskTwoComponent }   from './components/task-two.component';
import { TaskThreeComponent }   from './components/task-three.component';

import {routing} from './app.routing';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, routing ],
    declarations: [ AppComponent, IntroductionComponent, TaskOneComponent, TaskTwoComponent, TaskThreeComponent ],
    bootstrap:    [ AppComponent ],
})

export class AppModule {}
