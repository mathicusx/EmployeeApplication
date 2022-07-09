import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { Alert, AlertType } from '../_models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
private subject = new Subject<Alert>();
private defaultAlert = 'default-alert'
private keepAfterRouteChange = false;

// enable subscribing to alert observable
onAlert(id = this.defaultAlert): Observable<Alert> {
  return this.subject.asObservable().pipe(filter(x => x && x.id === id));
}

success(message: string, options?: any){
  this.alert(new Alert({...options, type: AlertType.Success, message}));
}
  
error(message: string, options?: any){
  this.alert(new Alert({...options, type:AlertType.Error, message}));
}

info(message: string, options?: any){
  this.alert(new Alert({...options, type:AlertType.Info, message}));
}
warn(message: string, options?: any){
  this.alert(new Alert({...options, type:AlertType.Warning, message}));
}
alert(alert: Alert) {
    alert.id = alert.id || this.defaultAlert;
    this.subject.next(alert);
  }
clear(id = this.defaultAlert){
  this.subject.next(new Alert({ id }));
}
}
