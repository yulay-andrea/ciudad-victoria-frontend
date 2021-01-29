import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { Sesion } from '../modelos/sesion';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(sesion: Sesion): Observable<Sesion> {
    return this.http.post(environment.host + util.ruta + util.sesion, sesion, util.options).pipe(
      map(response => response as Sesion),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  setSesion(sesion: Sesion) {
    sessionStorage.setItem('sesion', JSON.stringify(sesion));

  }

  getSesion(): Sesion {
    return JSON.parse(sessionStorage.getItem('sesion') || '{}');
  }

  clienteLogueado(){
    let sesion=JSON.parse(sessionStorage.getItem('sesion') || null as any);
    return sesion!=null;
  }

  cerrarSesion(){
    sessionStorage.removeItem('sesion');
  }
}