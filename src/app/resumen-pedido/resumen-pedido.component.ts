import { Component, OnInit } from '@angular/core';
import { Pedido } from '../modelos/pedido';
import { PedidoService } from '../servicios/pedido.service';
import Swal from 'sweetalert2';
import * as constantes from '../constantes';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-resumen-pedido',
  templateUrl: './resumen-pedido.component.html',
  styleUrls: ['./resumen-pedido.component.css']
})
export class ResumenPedidoComponent implements OnInit {

  pedido: Pedido = new Pedido;
  constructor(private pedidoService: PedidoService, private sesionService: SesionService) { }

  ngOnInit(): void {
    this.construirPedido();
  }


  construirPedido(){
    this.pedido=this.sesionService.getPedido();
    console.log(this.pedido);
    let total: number=0;
    for(let i=0; i<this.pedido.lineasPedido.length; i++){
      total=total+(this.pedido.lineasPedido[i].producto.precio*this.pedido.lineasPedido[i].cantidad);
    }
    this.pedido.total=total;
  }

  confirmarPedido(){
    console.log(this.pedido);
    this.pedidoService.crear(this.pedido).subscribe(
      res => {
        if (res!=null){
          Swal.fire(constantes.exito, constantes.exito_crear_producto, constantes.exito_swal);
        }
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  ngOnDestroy(): void {
    this.sesionService.eliminarPedido();
  }

}
