import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
];