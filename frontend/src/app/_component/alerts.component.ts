import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/app/_services/alerts.service';
import { Alert, AlertType } from '../_models/alert.model';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
})
export class AlertsComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = []
  alertSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(
    private router: Router,
    private alertsService: AlertsService,
  ){}

  ngOnInit(){
    // subscribe to new alert notifications
    this.alertSubscription = this.alertsService.onAlert(this.id)
    .subscribe(alert => {
      // if no alert, clear
      if(!alert.message){
        // filter out alerts that dont have keepAfterRouteChange
        this.alerts = this.alerts.filter(x => x.keepAfterRouteChange)

        // remove KeepAfterRouteChange on the rest
        this.alerts.forEach(x => delete x.keepAfterRouteChange);
        return;
      }
      // add alert to array 
      this.alerts.push(alert)

      //auto close if required 
      if(alert.autoClose) {
        setTimeout(() => this.removeAlert(alert), 3000);
      }
    });

    this.routeSubscription = this.router.events.subscribe(event => {
      if( event instanceof NavigationStart) {
        this.alertsService.clear(this.id)
      }
    });
  }
  ngOnDestroy(){
    // to avoid memory leak
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert){
    // check if already removed on auto close
    if (!this.alerts.includes(alert)) return;

    if(this.fade){
      // fade out alert
      alert.fade = true;

      // remove alert after faded out
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    }else{
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }
  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable', 'mt-4', 'container'];
            
    const alertTypeClass = {
        [AlertType.Success]: 'alert alert-success',
        [AlertType.Error]: 'alert alert-danger',
        [AlertType.Info]: 'alert alert-info',
        [AlertType.Warning]: 'alert alert-warning'
    }

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
        classes.push('fade');
    }

    return classes.join(' ');
}

}
