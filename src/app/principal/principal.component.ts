import { Component, OnInit } from '@angular/core';
import { Producto } from '../modelos/producto';
import { ProductoService } from '../servicios/producto.service';
import Swal from 'sweetalert2';
import * as constantes from '../constantes';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  productos: Producto[]=[];

  productosEnc: any[]=[];
  
  constructor(private productoService : ProductoService) { }

  ngOnInit(): void {
    this.productoService.consultar().subscribe(
      res => {
        this.productos = res
        let productosRec: Producto[]=[];
        for(let i=0; i<this.productos.length; i++){
          productosRec.push(this.productos[i]);
          if(productosRec.length==3){
            this.productosEnc.push(productosRec);
            productosRec=[];
          }
        }
        if(productosRec.length>0){
          this.productosEnc.push(productosRec);
        }
        console.log(this.productosEnc);
      },
      err => {
        Swal.fire(constantes.error, err.error.mensaje, constantes.error_swal)
      }
    );
  }

  bolsos(event:any){

  }
  trajesDeportivos(event:any){

  }
  zapatos(event:any){

  }

}
