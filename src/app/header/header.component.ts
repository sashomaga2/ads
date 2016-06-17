import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NavService } from './../shared/services/nav.service';
import { NotifyService, INotify } from './../shared/services/notify.service';
import { AuthService, User } from './../shared/services/auth.service';
import { AppRoutes } from './../ads-app.component';

@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class HeaderComponent implements OnInit {

    isMain: boolean = true;
    btnWidth: number = 100;

    notification: string;
    notificationType: string;
    notificationInProgress: boolean = false;
    profileName: string;

    subscription: Subscription;

    constructor(private _navService: NavService,
                private _notifyService: NotifyService,
                private _authService: AuthService) {
    }

    newAdClicked() :void {
        this.isMain = false;
    }

    backClicked() :void {
        this.isMain = true;
    }

    ngOnInit() {
        this.subscription = this._navService.selectedRoute$
            .subscribe(item => {
                console.log('item', item);
                this.isMain = false;
            });

        this.subscription = this._authService.loginStatus$
            .subscribe(status => {
                // TODO hack fix
                if(typeof status === 'boolean') {
                    let user:User = this._authService.getLoggedUser();
                    this.profileName = `${user.firstName} ${user.lastName}`;
                }
            });


        this.subscription = this._notifyService.notify$
            .subscribe((n: INotify) => {
                this.notification = n.msg;
                this.notificationType = n.type;
                this.notificationInProgress = true;
                setTimeout(()=> {
                    console.log('%c notificationInProgress = false', 'color: brown');
                    this.notificationInProgress = false;
                }, 5000);
            });
    }
}
