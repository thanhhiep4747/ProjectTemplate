import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
    declarations: [UserComponent, LoginComponent, RegisterComponent, ForgotPasswordComponent, ChangePasswordComponent],
    imports: [CommonModule, UsersRoutingModule]
})
export class UsersModule {}
