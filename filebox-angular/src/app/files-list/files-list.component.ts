import { Component, OnInit } from "@angular/core";
import { FileService } from "../services/file.service";
import { MessageService } from "../services/message.service";
import { environment } from "./../../environments/environment";

@Component({
  selector: "app-files-list",
  templateUrl: "./files-list.component.html",
  styleUrls: ["./files-list.component.css"],
})
export class FilesListComponent implements OnInit {
  public files: Array<any>;
  public url = environment.baseUrl;

  constructor(
    public fileService: FileService,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.fileService.getFiles().subscribe(
      (data: any) => {
        this.files = data;
        this.files.forEach((file) => {
          file.size = file.size / (1024 * 1024);
          file.downloadLink = `${this.url}/files/download/${file._id}`;
        });
      },
      (error) => {
        this.messageService.showError(error);
      }
    );
  }

  getFile(id) {
    this.fileService.getFileById(id).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        this.messageService.showError(error);
      }
    );
  }

  deleteFile(id, i) {
    console.log(id, i);
    this.fileService.deleteFile(id).subscribe(
      (data) => {
        this.files.splice(i, 1);
        this.messageService.showSuccess("file deleted successfully");
      },
      (error) => {
        console.log("error", error);
      }
    );
  }
}
