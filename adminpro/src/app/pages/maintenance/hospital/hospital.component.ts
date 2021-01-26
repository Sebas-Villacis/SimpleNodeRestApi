import { Component, OnDestroy, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image-service.service';
import { SearchServiceService } from 'src/app/services/search-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
})
export class HospitalComponent implements OnInit, OnDestroy {
  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  private imgSubs: Subscription;
  constructor(
    public oktaAuth: OktaAuthService,
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchService: SearchServiceService
  ) {}
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadHospitals();
    this.imgSubs = this.imgSubs = this.modalImageService.newImage
      .pipe(delay(100))
      .subscribe((img) => this.loadHospitals());
  }

  loadHospitals() {
    this.loading = true;
    const accessToken = this.oktaAuth.getAccessToken();
    this.hospitalService.loadHospitals(accessToken).subscribe((hospitals) => {
      this.loading = false;
      this.hospitals = hospitals;
    });
  }

  // search(term: string) {
  //   if (term.length === 0) {
  //     return this.loadHospitals();
  //   }

  //   this.searchService
  //     .search('hospitals', term, this.oktaAuth.getAccessToken())
  //     .subscribe((resp) => {
  //       this.hospitals = resp;
  //     });
  // }

  saveUpdates(hospital: Hospital) {
    this.hospitalService
      .updateHospital(
        hospital.id,
        hospital.name,
        this.oktaAuth.getAccessToken()
      )
      .subscribe((resp) => {
        Swal.fire('Updated', hospital.name, 'success');
      });
  }
  deleteHospitals(hospital: Hospital) {
    this.hospitalService
      .deleteHospital(hospital.id, this.oktaAuth.getAccessToken())
      .subscribe((resp) => {
        this.loadHospitals();
        Swal.fire('Deleted', hospital.name, 'success');
      });
  }

  async openSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Create Hospital',
      text: 'Enter the name of the new Hospital',
      input: 'text',
      inputPlaceholder: 'Name of the hospital',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.hospitalService
        .createHospital(value, this.oktaAuth.getAccessToken())
        .subscribe((resp: any) => {
          this.hospitals.push(resp.hosital);
        });
    }
  }
  openModal(hospital: Hospital) {
    console.log("entra a brir el modal de imagen")
    this.modalImageService.openModal('hospitals', hospital.id, hospital.img);
  }
}
