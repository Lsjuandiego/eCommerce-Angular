import { switchMap } from 'rxjs/operators';
// import { Product } from './../../models/product.model';
import { Product } from 'src/app/models/product.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  //pa que funcionara importe el sharedmodule
  template: `<app-products [productId]="productId" [products]="products" (onLoadMore)="loadMore()"></app-products>`,
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit  {

  @Output() onLoadMore: EventEmitter<string> = new EventEmitter<string>();
  loadMore() {
    this.onLoadMore.emit();
  }

  products: Product[] = [];
  limit = 10;
  offset = 0;
  categoryId: string | null = null;
  productId: string | null = null;

  constructor(private route: ActivatedRoute,
    private productsService:ProductsService){

  }

  ngOnInit(): void {
    //recuperar el id de las categorias para traer los productos que correspondan a esa
      this.route.paramMap
      .pipe(
        switchMap(params =>{
          this.categoryId = params.get('id');//'id' debe coincidir con lo que se pone en el router de category
          if(this.categoryId){
            return this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
          }
          return [] //si no hay productos por mostrar
        })
      )
      .subscribe((data)=>{
        this.products = data;
      });
      this.route.queryParamMap.subscribe((params) => {
        this.productId = params.get('product');
      });
  }
}
