import { LineaPedido } from "./linea-pedido";
import { Talla } from "./talla";

export class Pedido {
    id: number;
    codigo: string;
    qr: string;
    qrCantidad: number; 
    total: number;
    pagado: boolean;
    lineasPedido: LineaPedido[];

    constructor(){
        this.id=0;
        this.codigo="";
        this.qr="";
        this.qrCantidad=0;
        this.total=0;
        this.pagado=false;
        this.lineasPedido=[];
    }
}