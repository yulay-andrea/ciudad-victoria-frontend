import { Component, OnInit } from '@angular/core';
import { Pedido } from '../modelos/pedido';
import { PedidoService } from '../servicios/pedido.service';

@Component({
  selector: 'app-resumen-pedido',
  templateUrl: './resumen-pedido.component.html',
  styleUrls: ['./resumen-pedido.component.css']
})
export class ResumenPedidoComponent implements OnInit {

  pedido: Pedido= null as any;
  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
  }


  construirPedido(){
    this.pedidoService.currentMessage.subscribe(message => this.pedido = message);
  }

}
