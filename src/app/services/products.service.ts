import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Product, createProductDTO, UpdateProductDTO } from '../models/product.model';
import { environment } from '../../environments/environment.prod';
import { throwError, zip } from 'rxjs';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //resto de la url está en proxy.config.json
  private apiUrl = `${environment.API_URL}/api`
  constructor(private http: HttpClient) { }

  getByCategory(categoryId:string, limit?: number, offset?: number){
    let params = new HttpParams();
    if (limit != undefined && offset != undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params})
  }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit != undefined && offset != undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params, context: checkTime() })
      .pipe(
        retry(3),
        map(products => products.map(item => {
          return {
            ...item,
            taxes: .19 * item.price
          }
        }))
      );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 500) {
            return throwError(() => 'Algo está fallando en el servidor');
          }
          if (error.status === HttpStatusCode.NotFound) {
            return throwError(() => 'El producto no existe');
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError(() => 'No estás permitido');
          }
          return throwError(() => 'Ups, algo salió mal');
          //return throwError('Ups, algo salió mal');
        })
      );
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    );
  }

  //paginacion, limit y offset estan en el api(/docs). este metodo es reemplazado por
  //getAllProducts!!
  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(this.apiUrl, {
      params: { limit, offset }
    }).pipe(
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  create(dto: createProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}

