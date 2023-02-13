import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location:Location
  ){
  }
  ngOnInit(): void {
    //recuperar el id de las categorias para traer los productos que correspondan a esa
    this.route.paramMap
    .pipe(
      switchMap(params =>{
        this.productId = params.get('id');//'id' debe coincidir con lo que se pone en el router de category
        if(this.productId){
          return this.productsService.getProduct(this.productId)
        }
        return [null] //si no hay producto por mostrar
      })
    )
    .subscribe((data)=>{
      this.product = data;
    });
  }

  goToBack(){
    this.location.back();
  }
}
