import {NgModule, ApplicationRef}                             from '@angular/core';
import {BrowserModule}                                        from "@angular/platform-browser";
import {AppComponent}                                         from "./app.component";
import {routing}                                              from "./app.routing";
import {ReactiveFormsModule}                                  from "@angular/forms";
import {SharedModule}                                         from "../shared/shared.module";
import {CoreModule}                                           from "../core/core.module";
import {createNewHosts, createInputTransfer, removeNgStyles}  from "@angularclass/hmr";
import {HomeComponent}                                        from "./home/home.component";
import {NotFoundComponent}                                    from "./not-found/not-found.component";
import {NavigationComponent}                                  from "./navigation/navigation.component";
import {UnauthorizedComponent}                                from "./unauthorized/unauthorized.component";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {providedStore} from './app-store';


@NgModule({
    imports:      [
        BrowserModule ,
        ReactiveFormsModule,
        SharedModule,
        CoreModule,
        routing,
        providedStore,
        StoreDevtoolsModule.instrumentOnlyWithExtension()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        NavigationComponent,
        UnauthorizedComponent
    ],

    bootstrap:    [ AppComponent ]
})
export class AppModule {
    constructor(public appRef: ApplicationRef ) {}

    hmrOnInit(store: any) {
        if (!store || !store.state) return;
        // inject AppStore here and update it
        // this.AppStore.update(store.state)
        if ('restoreInputValues' in store) {
            store.restoreInputValues();
        }
        // change detection
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
        console.clear();
    }
    hmrOnDestroy(store: any) {
        var cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // recreate elements
        store.disposeOldHosts = createNewHosts(cmpLocation)
        // inject your AppStore and grab state then set it on store
        // var appState = this.AppStore.get()
        //store.state = {data: 'yolo'};
        // store.state = Object.assign({}, appState)
        // save input values
        store.restoreInputValues  = createInputTransfer();
        // remove styles
        removeNgStyles();
    }
    hmrAfterDestroy(store: any) {
        // display new elements
        store.disposeOldHosts()
        delete store.disposeOldHosts;
        // anything you need done the component is removed
    }
}
