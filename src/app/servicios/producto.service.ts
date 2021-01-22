import { Injectable } from '@angular/core';
import { Producto } from '../modelos/producto';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient, private router: Router) { }

  crear(producto: Producto): Observable<Producto> {
    return this.http.post(environment.host + util.ruta + util.producto, producto, util.options).pipe(
      map(response => response as Producto),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(environment.host + util.ruta + util.producto, util.options).pipe(
      map(response => response as Producto[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }
  
  async consultarAsync(): Promise<Producto[]> {
    return await this.http.get<Producto[]>(environment.host + util.ruta + util.producto, util.options).pipe(
      map(response => response as Producto[]),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  obtener(producto_id: number): Observable<Producto> {
    return this.http.get<Producto>(environment.host + util.ruta + util.producto + '/' + producto_id, util.options).pipe(
      map(response => response as Producto),
      catchError(err => {
        return throwError(err);
      }));
  }

  async obtenerAsync(producto_id: number): Promise<Producto> {
    return await this.http.get<Producto>(environment.host + util.ruta + util.producto + '/' + producto_id, util.options).pipe(
      map(response => response as Producto),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  actualizar(producto: Producto): Observable<Producto> {
    return this.http.put(environment.host+util.ruta+util.producto, producto, util.options).pipe(
      map(response => response as Producto),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(producto: Producto): Observable<Producto> {
    return this.http.delete(environment.host+util.ruta+util.producto + '/' + producto.id, util.options).pipe(
      map(response => response as Producto),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}