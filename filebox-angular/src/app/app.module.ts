import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FilesListComponent } from "./files-list/files-list.component";
import { AppRoutingModule } from "./app.routing";
import { FileService } from "./services/file.service";
import { HttpClientModule } from "@angular/common/http";
import { UploadFileComponent } from "./upload-file/upload-file.component";
import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { MessageService } from "./services/message.service";

@NgModule({
  declarations: [AppComponent, FilesListComponent, UploadFileComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [FileService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
