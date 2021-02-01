'use strict';
import {HttpHeaders} from '@angular/common/http';

export const ruta: string='/ciudadvictoria';
export const producto: string='/producto';
export const pedido: string='/pedido';
export const usuario: string='/usuario';
export const sesion: string='/sesion';

export const headers= new HttpHeaders({'Content-Type':'application/json'});
export const options = {headers: headers};
export const headersImagen= new HttpHeaders({});
export const optionsImagen = {headers: headersImagen};