import { Color } from "./color";
import { Imagen } from "./imagen";
import { Talla } from "./talla";

export class Producto {
    id: number;
    nombre: string;
    descripcion: string; 
    material: string;
    marca: string;
    estilo: string;
    tipo: string;
    precio: number;
    garantia: string;
    tallas: Talla[];
    imagenes: Imagen[];
    colores: Color[];
    disponible: boolean;

    constructor(){
        this.id=0;
        this.nombre="";
        this.descripcion="";
        this.material="";
        this.marca="";
        this.estilo="";
        this.tipo="";
        this.precio=0;
        this.garantia="";
        this.tallas=[];
        this.colores=[];
        this.imagenes=[];
        this.disponible=false;
    }
}