import { Injectable } from '@angular/core';
//Swal import
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor() {}

  swalPopup() {
    Swal.fire({
      text: 'You will not be able to recover this file!',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }

  successPopup(message:string){
    Swal.fire({
      text: message,
      icon: 'success',
      showCancelButton: false,
      timer: 3000,
    })
  }

  errorPopup(message:string) {
    Swal.fire({
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 3000,
      });
  }
}
