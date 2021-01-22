import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Hospital } from '../models/hospital.model';
import { OktaAuthService } from '@okta/okta-angular';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  loadHospitals(accessToken: string) {
    const url = `${base_url}/hospitals`;
    return this.http
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .pipe(
        map((res: { ok: boolean; hospitals: Hospital[] }) => res.hospitals)
      );
  }

  //   crearHospital(nombre: string) {
  //     const url = `${base_url}/hospitales`;
  //     return this.http.post(url, { nombre }, this.headers);
  //   }

  //   actualizarHospital(_id: string, nombre: string) {
  //     const url = `${base_url}/hospitales/${_id}`;
  //     return this.http.put(url, { nombre }, this.headers);
  //   }

  //   borrarHospital(_id: string) {
  //     const url = `${base_url}/hospitales/${_id}`;
  //     return this.http.delete(url, this.headers);
  //   }
}
