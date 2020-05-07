import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";

@Injectable()
export class MessageService {
  constructor(public toastr: ToastrService) {}

  showMsg(msg) {
    this.toastr.show(msg);
  }

  showSuccess(msg) {
    this.toastr.success(msg);
  }

  showError(error) {
    if (error.error) {
      this.toastr.error(error.error.message);
    } else if (error.message) {
      this.toastr.error(error.message);
    }
  }

  showInfo(msg) {
    this.toastr.info(msg);
  }
}
