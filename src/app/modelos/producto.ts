export class Producto {
    id: number;
    codigo: string;
    material: string;
    marca: string;
    estilo: string;
    precio: number;
    garantia: string;
    imagenes: string[];
    colores: string[];
    disponible: boolean;

    constructor(){
        this.id=0;
        this.codigo="";
        this.material="";
        this.marca="";
        this.estilo="";
        this.precio=0;
        this.garantia="";
        this.colores=[];
        this.imagenes=[];
        this.disponible=false;
    }
}