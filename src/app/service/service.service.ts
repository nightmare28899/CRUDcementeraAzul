import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private toastr: ToastrService) { }

  toast(type: string) {
    if (type == "created") {
      this.toastr.success("¡Material created successfully!", "Success");
    } else if (type == "updated") {
      this.toastr.info("¡Material updated successfully!", "Success");
    } else if (type == "delete") {
      this.toastr.warning("¡Material deleted successfully!", "Success");
    } else {
      this.toastr.error("Please fill all the fields", "Error");
    }
  }
}
