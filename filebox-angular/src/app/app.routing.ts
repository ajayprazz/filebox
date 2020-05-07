import { RouterModule, Routes } from "@angular/router";
import { FilesListComponent } from "./files-list/files-list.component";
import { NgModule } from "@angular/core";
import { UploadFileComponent } from "./upload-file/upload-file.component";

const appRoute: Routes = [
  {
    path: "files-list",
    component: FilesListComponent
  },
  {
    path: "upload-file",
    component: UploadFileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
