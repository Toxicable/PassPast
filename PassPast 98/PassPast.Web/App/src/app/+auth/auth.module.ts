import { NgModule }            from '@angular/core';
import { AuthComponent }       from './auth.component';
import { authRouting }         from './auth.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        authRouting,
        SharedModule
    ],
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent
    ]
})
export class AuthModule { }
