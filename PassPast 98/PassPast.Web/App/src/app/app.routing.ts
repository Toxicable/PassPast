import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const appRoutes: Routes = [
    {
      path: '',
      redirectTo: '/courses',
      pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: './+auth/auth.module#AuthModule'
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent,
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules
});
