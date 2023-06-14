import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuarios';
import { Cliente } from '../interfaces/clientes';
import { Informe } from '../interfaces/informes';

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

  getClientes():Observable<any>{

    return this.http.get<Cliente>('https://serveringroup.herokuapp.com/clientes', {
                                  headers: {"auth": "auth"}
    });

  }

  getInformes(): Observable<any>{
    return this.http.get<Informe>('https://serveringroup.herokuapp.com/informes', {
      headers: { "auth": "auth"}
    });
  }

}
