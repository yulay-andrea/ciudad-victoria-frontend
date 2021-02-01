import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as util from '../util';
import { environment } from '../../environments/environment';
import { Pedido } from '../modelos/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private messageSource = new BehaviorSubject(new Pedido());
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  enviar(pedido: Pedido) {
    this.messageSource.next(pedido);
  }

  crear(pedido: Pedido): Observable<Pedido> {
    return this.http.post(environment.host + util.ruta + util.pedido, pedido, util.options).pipe(
      map(response => response as Pedido),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  consultar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(environment.host + util.ruta + util.pedido, util.options).pipe(
      map(response => response as Pedido[]),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  async consultarAsync(): Promise<Pedido[]> {
    return await this.http.get<Pedido[]>(environment.host + util.ruta + util.pedido, util.options).pipe(
      map(response => response as Pedido[]),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  obtener(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(environment.host + util.ruta + util.pedido + '/' + id, util.options).pipe(
      map(response => response as Pedido),
      catchError(err => {
        return throwError(err);
      }));
  }

  async obtenerAsync(id: number): Promise<Pedido> {
    return await this.http.get<Pedido>(environment.host + util.ruta + util.pedido + '/' + id, util.options).pipe(
      map(response => response as Pedido),
      catchError(err => {
        return throwError(err);
      })).toPromise();
  }

  actualizar(pedido: Pedido): Observable<Pedido> {
    return this.http.put(environment.host + util.ruta + util.pedido, pedido, util.options).pipe(
      map(response => response as Pedido),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  eliminar(id: number): Observable<Pedido> {
    return this.http.delete(environment.host + util.ruta + util.pedido + '/' + id, util.options).pipe(
      map(response => response as Pedido),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  crearImagen(imagen: File, id: number): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('imagen', imagen, imagen.name);
    return this.http.post(environment.host + util.ruta + util.pedido + '/imagen' + '/' + id, formData, util.optionsImagen).pipe(
      map(response => response as any),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}