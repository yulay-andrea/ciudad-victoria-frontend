'use strict';
import {HttpHeaders} from '@angular/common/http';

export const ruta: string='/ciudadvictoria';
export const producto: string='/producto';
export const usuario: string='/usuario';

export const headers= new HttpHeaders({'Content-Type':'application/json'});
export const options = {headers: headers};