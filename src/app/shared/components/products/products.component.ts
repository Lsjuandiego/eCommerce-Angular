
//import { StoreService } from './../../services/store.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product, createProductDTO, UpdateProductDTO } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [

  ];
  //esto hace que el metodo se pueda llamar en el componente de products.html, estando
  //el metodo en home.component.ts
  @Output() onLoadMore: EventEmitter<string> = new EventEmitter<string>();
  loadMore() {
    this.onLoadMore.emit();
  }
  total = 0;

  // @Input() productId: string | null = null;
  @Input()
  set productId(id: string | null) {
    if (id){
      this.onShowDetail(id);
    }
  }
  @Input() products: Product[] = [
    // ya no necesitamos tenerlos ahi quemados porque se estan trayendo
    // los productos desde la api
    // {
    //   id:'1',
    //   name: 'El mejor juguete',
    //   price: 70000,
    //   image: './assets/images/toy.png',
    // },
    // {
    //   id: '2',
    //   name: 'Libro de Harry Potter',
    //   price: 80000,
    //   image: './assets/images/harry.png'

    // },
    // {
    //   id: '3',
    //   name: 'Reloj Casio',
    //   price: 98000,
    //   image: '../assets/images/casio.png'
    // }
  ];
  today = new Date();
  date = new Date(2021, 1, 21);
  showProductDetail = false;
  productChosen!: Product;
  statusDetail: 'Loading...' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getMyShoppingCart();
  }


  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    //this.myShoppingCart.push(product);
    console.log(product);
    //Array.reduce(investigar)
    this.total = this.storeService.getTotal();
  }
  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'Loading...';
    //si esta cerrado, abrirlo
    if(!this.showProductDetail){
      this.showProductDetail = true;
    }
    //  this.toggleProductDetail();
    this.productsService.getProduct(id)
      .subscribe(data => {
        console.log('product ', data)
        this.productChosen = data;
        this.statusDetail = 'success';
      }, errorMsg => {
        //modificar el window.alert por algo mas bonito
        //window.alert(errorMsg);
        this.statusDetail = 'error';
        Swal.fire({
          title: errorMsg,
          text: errorMsg,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      })
  }

  //evitando el callback hell con promesas cuando se tienen dependencias (update de getProduct)
  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
      .pipe(
        switchMap((product) => this.productsService.update(product.id, { title: 'change' }))
      )
      .subscribe(data => {
        console.log(data);
      });
    //evitando el callback hell con promesas cuando no se tienen dependencias
    this.productsService.fetchReadAndUpdate(id, { title: 'change' })
      .subscribe(response => {
        const read = response[0];
        const update = response[1];
      });
  }

  createNewProduct() {
    const product: createProductDTO = {
      title: 'nuevo producto',
      description: 'blablabla',
      images: ['https://placeimg.com/640/480/any'],
      price: 1000,
      categoryId: 2


    }
    this.productsService.create(product)
      .subscribe(data => {
        //console.log('created', data);
        this.products.unshift(data);
      });
  }

  // updateProduct(){
  //   const changes:UpdateProductDTO = {
  //     title: 'nuevo titulo',
  //   }
  //   const id = this.productChosen.id;
  //   this.productsService.update(id, changes)
  //   .subscribe(data => {
  //     console.log('updated ',data);
  //     const productIndex = this.products.findIndex(item => item.id ===
  //       this.productChosen.id);
  //     this.products[productIndex] = data;
  //   });
  // }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Nuevo title',
      description: 'Esta es un prueba',
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe(data => {
      const productIndex = this.products.findIndex(
        item => item.id === this.productChosen.id
      );
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }



  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
      .subscribe(() => {
        const productIndex = this.products.findIndex(
          item => item.id === this.productChosen.id
        );
        this.products.splice(productIndex, 1);
        this.showProductDetail = false;
      });
  }
  // loadMore() {
  //   this.productsService.getProductsByPage(this.limit, this.offset).subscribe(
  //     data => {
  //       // console.log(data);
  //       this.products = this.products.concat(data);
  //       this.offset += this.limit;
  //     }
  //   );
  // }

}
