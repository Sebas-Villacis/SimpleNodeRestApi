import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
})
export class HospitalComponent implements OnInit {
  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  constructor(
    public oktaAuth: OktaAuthService,
    private hospitalService: HospitalService
  ) {}

  ngOnInit(): void {
    this.loadHospitals();
  }

  loadHospitals() {
    this.loading = true;
    const accessToken = this.oktaAuth.getAccessToken();
    this.hospitalService.loadHospitals(accessToken).subscribe((hospitals) => {
      this.loading = false;
      this.hospitals = hospitals;
    });
  }
}
