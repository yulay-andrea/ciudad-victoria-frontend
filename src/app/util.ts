'use strict';
import {HttpHeaders} from '@angular/common/http';

export const ruta: string='/ciudadvictoria';
export const producto: string='/producto';
export const cliente: string='/cliente';
export const pedido: string='/pedido';
export const usuario: string='/usuario';
export const sesion: string='/sesion';
export const buscar: string='/buscar';
export const consultarporcliente: string='/consultarporcliente';
export const obtenerporcodigo: string='/obtenerporcodigo';
export const confirmar: string='/confirmar'


export const headers= new HttpHeaders({'Content-Type':'application/json'});
export const options = {headers: headers};
export const headersImagen= new HttpHeaders({});
export const optionsImagen = {headers: headersImagen};