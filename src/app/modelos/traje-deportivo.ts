import { Producto } from "./producto";

export class TrajeDeportivo extends Producto {
    talla: string;

    constructor(){
        super();
        this.talla="";
    }
}