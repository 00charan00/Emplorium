import { Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { EmpHomeComponent } from './emp-home/emp-home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AboutComponent} from './about/about.component';
import {EventsComponent} from './events/events.component';
import {AdminGuard} from './guards/admin.guard';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: EmpHomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'events', component: EventsComponent , canActivate:[AuthGuard]},
  { path: 'signup', component: RegisterComponent },
  { path: 'admin', component: AdminHomeComponent, canActivate: [AdminGuard] },  // Protect admin route
  { path: 'employee', component: EmpHomeComponent },  // Protect employee route
  { path: '**', redirectTo: '' }
];
