import { Component, OnInit } from "@angular/core";
import { FileService } from "../services/file.service";
import { Router } from "@angular/router";
import { MessageService } from "../services/message.service";

@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.css"],
})
export class UploadFileComponent implements OnInit {
  public fileToUpload: Array<any>;
  public uploading: boolean = false;
  constructor(
    public fileService: FileService,
    public router: Router,
    public messageService: MessageService
  ) {}

  ngOnInit() {}

  fileChangeEvent(event) {
    this.fileToUpload = event.target.files;
  }

  upload() {
    this.uploading = true;
    this.fileService.upload(this.fileToUpload).subscribe(
      (data) => {
        this.uploading = false;
        this.messageService.showSuccess("file uploaded successfully");
        this.router.navigate(["/files-list"]);
      },
      (error) => {
        this.uploading = false;
        this.messageService.showError(error);
      }
    );
  }
}
