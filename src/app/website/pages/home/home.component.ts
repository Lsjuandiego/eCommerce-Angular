import { Product } from './../../../models/product.model';
import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  limit = 10;
  offset = 0;
  products: Product[] = [];
  productId: string | null = null;

  constructor(private productsService: ProductsService,
    private route:ActivatedRoute){

  }

  ngOnInit(): void {
    this.loadMore();
    this.productsService.getAllProducts(10,0).subscribe(
      data=>{
        // console.log(data);
        this.products = data;
        this.offset += this.limit;
      }
    );
    this.route.queryParamMap.subscribe(params =>{
      this.productId = params.get('product');
      console.log(this.productId);
    })
  }

  loadMore(): void {
    this.productsService.getAllProducts(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data.filter(product => product.images.length > 0));
        this.offset += this.limit;
      });
  }



}
