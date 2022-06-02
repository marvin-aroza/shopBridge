import { Component, OnDestroy, OnInit } from '@angular/core';
// form imports
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// service
import { ProductService } from 'src/app/_shared/_services/product.service';
// routing
import { ActivatedRoute, Router } from '@angular/router';
// rxjs imports
import { Subscription } from 'rxjs';
// models
import { Product } from 'src/app/_shared/_model/product';
// validators
import { priceLimit } from 'src/app/_shared/_validators/priceLimit';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnDestroy {
  // variables
  Form!: FormGroup;
  isSubmitted = false;
  isLoaded = false;
  imgFile: any = '';
  imgName: string = '';
  button_text: string = 'Add';
  subscription: Subscription | undefined;
  productId: string = this.route.snapshot.params['id'];
  productDetails: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.productId) {
      this.button_text = 'Edit';
      this.getProductDetails();
    } else {
      this.createAddProductForm();
    }
  }

  // Form controls for product
  createAddProductForm() {
    this.Form = this.fb.group({
      name: [
        this.productDetails ? this.productDetails.name : '',
        Validators.required,
      ],
      price: [
        this.productDetails ? this.productDetails.price : '',
        Validators.required,
      ],
      description: [
        this.productDetails ? this.productDetails.description : '',
        Validators.required,
      ],
      image: [
        this.productDetails ? this.productDetails.name : '',
        Validators.required,
      ],
    }, {
      validator : priceLimit('price')
    });
    this.isLoaded = true;
  }

  get fvalues() {
    return this.Form.controls;
  }

  createProduct() {
    this.isSubmitted = true;
    if (this.Form.invalid) {
      return;
    } else {
      const formData: FormData = new FormData();
      formData.append('name', this.fvalues['name'].value);
      formData.append('price', this.fvalues['price'].value);
      formData.append('description', this.fvalues['description'].value);
      if (this.productDetails?._id && this.imgName !== '') {
        formData.append('image', this.fvalues['image'].value);
      } else if(!this.productDetails?._id ) {
        formData.append('image', this.fvalues['image'].value);
      }

      if (this.productDetails?._id) {
        this.subscription = this.productService
          .updateProduct(formData, this.productDetails._id)
          .subscribe((result) => {
            if (result.status) {
              // reroute to the listing page
              this.router.navigate(['/']);
            }
          });
      } else {
        this.subscription = this.productService
          .addProduct(formData)
          .subscribe((result) => {
            if (result.status) {
              // reroute to the listing page
              this.router.navigate(['/']);
            }
          });
      }
    }
  }

  // push the uploaded image to the form control
  onImgFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imgName = event.target.files[0].name;
      const file = event.target.files[0];
      this.Form.get('image')!.setValue(file);
    }
  }

  // get product details by id
  getProductDetails() {
    this.subscription = this.productService
      .getProductById(this.productId)
      .subscribe((details: Product) => {
        this.productDetails = details;
        this.createAddProductForm();
      });
  }

  // on destroy
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
