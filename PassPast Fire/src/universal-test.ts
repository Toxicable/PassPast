import { enableProdMode, ReflectiveInjector, Type, NgModule, NgModuleFactory } from '@angular/core';
import { COMPILER_PROVIDERS, JitCompiler, ResourceLoader } from '@angular/compiler';
import { renderModuleFactory, ServerModule } from '@angular/platform-server';
import 'reflect-metadata';
import 'zone.js';
import * as fs from 'fs';

import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';

class FileLoader implements ResourceLoader {
  get(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(fs.readFileSync(url).toString());
    });
  }
}
export function compileModule<T>(module: Type<T>): Promise<NgModuleFactory<T>> {
  let injector = ReflectiveInjector.resolveAndCreate([
    COMPILER_PROVIDERS,
    { provide: ResourceLoader, useValue: new FileLoader() }
  ]);
  const compiler = injector.get(JitCompiler) as JitCompiler;
  return compiler.compileModuleAsync(module);
}
@NgModule({
  bootstrap: [AppComponent],
  imports: [AppModule, ServerModule],
})
class AppServerModule { }
const document = fs.readFileSync('index.universal.html').toString();
// URL to render
const url = '/';
compileModule(AppServerModule)
  .then(factory => renderModuleFactory(factory, { document, url }))
  .then(html => fs.writeFileSync('index.universal.html', html));
