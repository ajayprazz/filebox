import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "./../../environments/environment";

@Injectable()
export class FileService {
  public url;
  constructor(public http: HttpClient) {
    this.url = `${environment.baseUrl}/files`;
  }

  public headers() {
    const option = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    return option;
  }

  getFiles() {
    return this.http.get(this.url, this.headers());
  }

  getFileById(id) {
    return this.http.get(this.url + `/${id}`, this.headers());
  }

  upload(files: any) {
    return new Observable((observer) => {
      const xhttp = new XMLHttpRequest();
      const formData = new FormData();

      if (files.length) {
        formData.append("file", files[0]);
      }

      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
          if (xhttp.status == 200) {
            observer.next(xhttp.response);
          } else {
            observer.error(xhttp.response);
          }
        }
      };

      xhttp.open("POST", this.url, true);
      xhttp.send(formData);
    });
  }

  deleteFile(id) {
    return this.http.delete(this.url + `/${id}`, this.headers());
  }
}
