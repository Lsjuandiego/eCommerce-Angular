import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/product.model';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  token = ''
  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      //va aumentando a medida que se agrega un producto
      this.counter = products.length;
    });
    this.getAllCategories(); //obtener todas las categorias apenas el componente se comience a renderizar
    this.authService.user$
    .subscribe(data => {
      this.profile == data;
    })

  }
  // login(){
  //   this.authService.login('juanito@gmail.com','12345')
  //   .subscribe(rta =>{
  //     this.token = rta.access_token;
  //     console.log(this.token);
  //     this.getProfile();
  //   });
  // }

  // getProfile(){
  //   this.authService.profile(this.token)
  //   .subscribe(user => {
  //     console.log(user);
  //   });
  // }
  //mejorando la petición
  // loginProfile() {
  //   this.authService.login('juanito@gmail.com','12345')
  //   .pipe(
  //     switchMap((actualToken) => {
  //       this.token = actualToken.access_token;
  //       console.log(this.token);
  //       return this.authService.profile(this.token);
  //     })
  //   )
  //   .subscribe(data => {
  //     this.profile = data;
  //   })
  // }

  //mejorandox2
  login() {
    this.authService.loginAndGet('admin@mail.com', 'admin123')
      .subscribe(() => {
        this.router.navigate(['/profile']);
      });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  getAllCategories() {
    this.categoriesService.getAll()
      .subscribe(data => {
        this.categories = data;
      });
  }

  logout() {
    this.authService.logout()
    this.profile = null;
    this.router.navigate(['/home']);
  }

}
