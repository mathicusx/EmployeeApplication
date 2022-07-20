import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user.model';
import { environment } from 'src/environments/environment';



@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiServer}/user`);
    }
    findOne(id: number){
        return this.http.get<User>(`${environment.apiServer}/user/${id}`)
    }
}