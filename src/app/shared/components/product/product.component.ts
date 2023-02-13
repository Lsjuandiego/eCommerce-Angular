import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  // lo siguiente se comenta porque los valores vienen desde el padre
  //  product: Product = {
  //   id: '1',
  //   name: 'product1',
  //   image: './assets/images/toy.png',
  //   price: 100

  // }
  //opción mas limpia
  @Input() product!: Product;
  //opcion b
  // @Input() product: Product = {
  //   id : '',
  //   price: 0,
  //   image: '',
  //   name: ''
  // };
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();

  onAddToCart(){
    this.addedProduct.emit(this.product);
  }
  onShowDetail(){
    this.showProduct.emit(this.product.id);
  }
}
