import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { SuperAdminAuthGuard } from '../core/guards/super-admin-auth-guard.service';

const appRoutes: Routes = [
    {
      path: '',
      redirectTo: '/courses',
      pathMatch: 'full'
    },
    {
        path: 'admin',
        loadChildren: './+admin/admin.module#AdminModule',
        canLoad: [SuperAdminAuthGuard]
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
