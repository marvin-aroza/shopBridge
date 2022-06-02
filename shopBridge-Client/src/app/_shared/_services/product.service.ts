import { Injectable } from '@angular/core';

//Required modules
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http'

//Environment
import { environment} from 'src/environments/environment'

//rxjs library functions
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // variables
  private productSearch = new BehaviorSubject<string>('');
  readonly currentSearchItem = this.productSearch.asObservable();

  constructor(
    private http:HttpClient
  ) { }

  //get product list
  getProducts() {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}product/list`, {
      headers: headers
    })
    .pipe(map((result: any) => {
      return result.data;
    }));
  }

  //add product
  addProduct(formData:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.post<any>(`${environment.apiUrl}product`, formData, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  //get product by id
  getProductById(id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.get<any>(`${environment.apiUrl}product/details/${id}`, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result.data[0];
    }));
  }

  //update the product
  updateProduct(formData:any, id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.patch<any>(`${environment.apiUrl}product/${id}`, formData, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  //delete product
  deleteCategory(id:any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    return this.http.delete<any>(`${environment.apiUrl}product/${id}`, {
      headers: headers
    })
    .pipe(map((result: any) => {
        return result;
    }));
  }

  // update search item
  updateSearchItem(searchTerm:string) {
    this.productSearch.next(searchTerm);
  }
}
