import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-model',
  templateUrl: './image-model.component.html',
  styles: [],
})
export class ImageModelComponent implements OnInit {
  public imageUpload: File;
  public imgTemp: any = null;
  constructor(
    public imageModalService: ModalImageService,
    public fileUploadService: FileUploadService,
    public oktaAuth: OktaAuthService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.imgTemp = null;
    this.imageModalService.closeModal();
  }

  changeImage(file: File) {
    this.imageUpload = file;

    if (!file) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  uplaodImage() {
    const id = this.imageModalService.id;
    const type = this.imageModalService.type;

    this.fileUploadService
      .updateImage(this.imageUpload, type, id, this.oktaAuth.getAccessToken())
      .then((img) => {
        Swal.fire('Saved', "User's image updated", 'success');

        this.imageModalService.newImage.emit(img);

        this.closeModal();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire('Error', 'Unable to upload image', 'error');
      });
  }
}
