import { Color } from "./color";
import { Producto } from "./producto";
import { Talla } from "./talla";

export class LineaPedido {
    id: number;
    cantidad: number;
    disponible: boolean;
    reservado: boolean; 
    entrega: boolean;
    talla: Talla;
    color: Color;
    producto: Producto;

    constructor(){
        this.id=0;
        this.cantidad=0;
        this.disponible=false;
        this.reservado=false;
        this.entrega=false;
        this.talla=new Talla();
        this.color=new Color();
        this.producto=new Producto();
    }
}