import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  datos: string[] = [];
  _body: {} = {};

  constructor( private http: HttpClient) { }

  getUsuarios():Observable<any>{
    return this.http.get<Usuario>('https://serveringroup.herokuapp.com/usuarios/tabla');
  }

}
