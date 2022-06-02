import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
// service import


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private productService:ProductService
  ) { }

  ngOnInit(): void {
  }

  updateSearchTerm(searchTerm:any) {
    this.productService.updateSearchItem(searchTerm.value);
  }

}
