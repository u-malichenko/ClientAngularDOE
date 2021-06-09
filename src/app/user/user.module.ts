import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UserLayoutComponent} from './shared/components/user-layout/user-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardEventPageComponent} from './event/dashboard-page/dashboard-event-page.component';
import {CreateEventPageComponent} from './event/create-page/create-event-page.component';
import {EditEventPageComponent} from './event/edit-event-page/edit-event-page.component';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from './shared/services/auth.guard';
import {SearchPipe} from './shared/pipe/search.pipe';
import { AlertComponent } from '../shared/components/alert/alert.component';
import {LocalizedCurrencyPipe} from './shared/pipe/localized-currency.pipe';
import { DashboardExpPageComponent } from './event/exp/dashboard-exp-page/dashboard-exp-page.component';
import { CreateExpPageComponent } from './event/exp/create-exp-page/create-exp-page.component';
import { EditExpPageComponent } from './event/exp/edit-exp-page/edit-exp-page.component';

@NgModule({
  declarations: [
    UserLayoutComponent,
    LoginPageComponent,
    DashboardEventPageComponent,
    CreateEventPageComponent,
    EditEventPageComponent,
    SearchPipe,
    LocalizedCurrencyPipe,
    AlertComponent,
    DashboardExpPageComponent,
    CreateExpPageComponent,
    EditExpPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: UserLayoutComponent, children: [
          {path: '', redirectTo: '/user/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardEventPageComponent, canActivate: [AuthGuard]},
          {path: 'create', component: CreateEventPageComponent, canActivate: [AuthGuard]},
          {path: 'event/:id/edit', component: EditEventPageComponent, canActivate: [AuthGuard]},
          {path: 'event/:id/exp', component: DashboardExpPageComponent, canActivate: [AuthGuard]},
          {path: 'event/:id/exp/create', component: CreateExpPageComponent, canActivate: [AuthGuard]},
          {path: 'event/:id/exp/:id/edit', component: EditExpPageComponent, canActivate: [AuthGuard]}
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class UserModule {

}
