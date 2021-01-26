import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class SearchServiceService {
  constructor(private http: HttpClient) {}

  // private transformarUsuarios(resultados: any[]): Usuario[] {
  //   return resultados.map(
  //     (user) =>
  //       new Usuario(
  //         user.nombre,
  //         user.email,
  //         '',
  //         user.img,
  //         user.google,
  //         user.role,
  //         user.uid
  //       )
  //   );
  // }

  private transformHospitals(resultados: any[]): Hospital[] {
    return resultados;
  }

  // private transformarMedicos(resultados: any[]): Medico[] {
  //   return resultados;
  // }
  search(type: 'doctors' | 'hospitals', term: string, accessToken: string) {
    const url = `${base_url}/todo/coleccion/${type}/${term}`;
    return this.http
      .get<any[]>(url, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .pipe(
        map((resp: any) => {
          switch (type) {
            // case 'usuarios':
            //   return this.transformarUsuarios(resp.resultados);

            case 'hospitals':
              return this.transformHospitals(resp.resultados);

            // case 'medicos':
            //   return this.transformarMedicos(resp.resultados);

            default:
              return [];
          }
        })
      );
  }
}
