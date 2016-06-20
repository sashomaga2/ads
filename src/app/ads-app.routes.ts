import { provideRouter, RouterConfig } from '@angular/router';
import { AdListComponent } from './body/ad-list/ad-list.component';
import { HeaderComponent } from './header/header.component';
import { NewAdComponent } from './body/new-ad/new-ad.component';
import { AdDetailComponent } from './body/ad-detail/ad-detail.component';
import { LoginComponent } from './body/auth/login.component';
import { RegisterComponent } from './body/auth/register.component';
import { ProfileComponent } from './body/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { HTTP_PROVIDERS } from '@angular/http';

export const routes: RouterConfig = [
    {path: 'ads', component: AdListComponent},
    {path: 'newAd',  component: NewAdComponent},
    {path: 'adDetail/:id',  component: AdDetailComponent},
    {path: 'login',  component: LoginComponent}, //, canDeactivate:[AuthGuard]
    {path: 'register',  component: RegisterComponent}, //, canDeactivate: [AuthGuard]
    {path: 'profile',  component: ProfileComponent, canActivate: [AuthGuard]}, // ,
    //TODO remove below when index:true is fixed
    {path: '*',  component: AdListComponent},
    {path: '',  component: AdListComponent}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    AuthGuard,
    AuthService,
    HTTP_PROVIDERS
];