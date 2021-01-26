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

  createHospital(name: string, accessToken: string) {
    const url = `${base_url}/hospitals`;
    return this.http.post(
      url,
      { name },
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );
  }

  updateHospital(id: string, name: string, accessToken: string) {
    const url = `${base_url}/hospitals/${id}`;
    return this.http.put(
      url,
      { name },
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      }
    );
  }

  deleteHospital(id: string, accessToken: string) {
    const url = `${base_url}/hospitals/${id}`;
    return this.http.delete(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
  }
}
