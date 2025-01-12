import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, RouterModule.forRoot(routes)],
    providers: [ provideHttpClient(),],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }