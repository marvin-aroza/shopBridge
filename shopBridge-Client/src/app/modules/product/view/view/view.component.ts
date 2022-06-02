import { Component, OnDestroy, OnInit } from '@angular/core';
// service import
import { ProductService } from 'src/app/_shared/_services/product.service';
// models
import { Product } from 'src/app/_shared/_model/product'
// routers
import { ActivatedRoute, Router } from '@angular/router';
// rxjs imports
import { Subscription } from 'rxjs';
// enivronment
import { environment } from 'src/environments/environment';
//Swal import
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  // variables
  productId:string | undefined = this.route.snapshot.params['id'];
  productDetails:any
  subscription: Subscription | undefined
  apiUrl:string = environment.apiUrl

  constructor(
    private productService:ProductService,
    private route:ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  // get product details by id
  getProductDetails() {
    this.subscription = this.productService.getProductById(this.productId).subscribe((details : Product) => {
      this.productDetails = details;
    });
  }

  //delete product
  deleteProduct(productId:string) {
    Swal.fire({
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.productService.deleteCategory(productId).subscribe(res => {
          if(res.status) {
            this.router.navigate(['/']);
          }
        });
      }
    });
  }

  //on destroy
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
