import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async updateImage(
    file: File,
    type: 'doctors' | 'hospitals',
    id: string,
    accessToken: string
  ) {
    try {
      const url = `${base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        body: formData,
      });

      const data = await resp.json();

      if (data.ok) {
        return data.fileName;
      } else {
        console.log(data.msg);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
