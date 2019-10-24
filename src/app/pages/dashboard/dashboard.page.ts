import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  FormGroup
  @ViewChild('signupSlider') signupSlider;

  public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;
  public slideThreeForm: FormGroup;

  public submitAttempt: boolean = false;


  constructor(private authService: AuthService, public formBuilder: FormBuilder) {

    this.slideOneForm = formBuilder.group({
      prenom: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(2), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      nom: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(2), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      telephone: ['', Validators.required,],
      cni: ['', Validators.required]
    });

    this.slideTwoForm = formBuilder.group({
      prenom: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(2), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      nom: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(2), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      telephone: ['', Validators.required,],
      cni: ['', Validators.required]
    });

    this.slideThreeForm = formBuilder.group({
      montant: ['', Validators.required],
      frais: ['', Validators.required],
    });

  }

  ngOnInit() {
  }

  logOut() {
    return this.authService.logOut();
  }

  next() {
    this.signupSlider.slideNext();
  }

  prev() {
    this.signupSlider.slidePrev();
  }

  save() {

    this.submitAttempt = true;

    if (!this.slideOneForm.valid) {
      this.signupSlider.slideTo(0);
    }
    else if (!this.slideTwoForm.valid) {
      this.signupSlider.slideTo(1);
    }
    else if (!this.slideThreeForm.valid) {
      this.signupSlider.slideTo(2);
    }
    else {
      console.log("success!")
      console.log(this.slideOneForm.value);
      console.log(this.slideTwoForm.value);
      console.log(this.slideThreeForm.value)
    }

  }
}
