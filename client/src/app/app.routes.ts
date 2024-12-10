import { Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { EmpHomeComponent } from './emp-home/emp-home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AboutComponent} from './about/about.component';
import {EventsComponent} from './events/events.component';
import {AdminGuard} from './guards/admin.guard';
import {AuthGuard} from './guards/auth.guard';
import {EmpCrudComponent} from './emp-crud/emp-crud.component';
import {MeetingComponent} from './meeting/meeting.component';

export const routes: Routes = [
  { path: '', component: EmpHomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'meeting', component: MeetingComponent,canActivate:[AuthGuard] },
  { path: 'empcrud', component: EmpCrudComponent,canActivate:[AdminGuard] },
  { path: 'events', component: EventsComponent , canActivate:[AuthGuard]},
  { path: 'admin', component: AdminHomeComponent,canActivate:[AdminGuard] },
  { path: 'employee', component: EmpHomeComponent },
  { path: '**', redirectTo: '' }



];
