import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { bootloader } from "@angularclass/hmr";

export function main() {
    return platformBrowserDynamic().bootstrapModule(AppModule);
}

if (process.env.ENV === 'production') {
    enableProdMode();
    if (document.readyState === 'complete') {
        main()
    } else {
        document.addEventListener('DOMContentLoaded', main);
    }
}else{
    bootloader(main);
}
