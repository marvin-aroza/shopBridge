import { Component, OnDestroy, OnInit } from '@angular/core';

// service import
import { ProductService } from 'src/app/_shared/_services/product.service';
// Model import
import { Product } from 'src/app/_shared/_model/product';
// rxjs imports
import { Observable, Subscription } from 'rxjs';
// env import
import { environment } from 'src/environments/environment';
//Swal import
import Swal from 'sweetalert2';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  products: Product[] | undefined;
  apiUrl = environment.apiUrl;
  searchTerm: any = {name: ''};
  subscription: Subscription | undefined;

  constructor(private productService: ProductService) {
    this.getProductList();
    this.productService.currentSearchItem.subscribe((res) => {
      this.searchTerm.name = res;
    });
  }

  ngOnInit(): void {}

  // get product list
  getProductList() {
    this.subscription = this.productService.getProducts().subscribe((res: Product[]) => {
      this.products = res
    });
  }

  //delete product
  deleteProduct(productId: string) {
    Swal.fire({
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.productService.deleteCategory(productId).subscribe((res) => {
          if (res.status) {
            this.getProductList();
          }
        });
      }
    });
  }

  // on destroy
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
