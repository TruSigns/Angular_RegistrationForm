import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from '../models/user.models';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  public packages: string[] = ['Monthly', 'Quarterly', 'Yearly'];
  public genders: string[] = ['Male', 'Female'];
  public goals: string[] = [
    'Lose Weight',
    'Gain Muscle',
    'Lose Weight/Gain Muscles',
    'Healthy',
  ];
  public trainBefore: string[] = ['Yes', 'No'];
  public registrationForm!: FormGroup;
  public userIdUpdate!: number;
  public isUpdateActive: boolean = false;

  //Building the form submit constructor

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toastService: NgToastService,
    private activateRoute: ActivatedRoute
  ) {}

  //create the registration form and add it to a button with the (click) <onClick> Function

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      trainerOptions: [''],
      package: [''],
      goals: [''],
      trainedBefore: [''],
      selectDate: [''],
    });

    this.registrationForm.controls['height'].valueChanges.subscribe((res) => {
      this.calcBMI;
    });

    this.activateRoute.params.subscribe((val) => {
      this.userIdUpdate = val['id'];
      this.api.GetRegistrationUserId(this.userIdUpdate).subscribe((res) => {
        this.isUpdateActive = true;
        this.fillForm(res);
      });
    });
  }

  //This function will submit all the values inside of the registration Object
  submitForm() {
    // console.log(this.registrationForm.value);
    this.api
      .postRegistrationUser(this.registrationForm.value)
      .subscribe((res) =>
        this.toastService.success({
          detail: 'SUBMITTED',
          summary: 'User has been added',
          duration: 1500,
        })
      );

    //once everything has been submitted, then reset the form.
    this.registrationForm.reset();
  }

  calcBMI(heightValue: number) {
    const weight: number = this.registrationForm.value.height;
    const height: number = heightValue;
    const bmi = weight / (height * height);
    this.registrationForm.controls['bmi'].patchValue(bmi);

    switch (true) {
      case bmi < 18.5:
        this.registrationForm.controls['bmiResult'].patchValue('underweight');
        break;
      case bmi >= 18.5 && bmi < 25:
        this.registrationForm.controls['bmiResult'].patchValue('normal weight');
        break;
      case bmi >= 18.5 && bmi < 30:
        this.registrationForm.controls['bmiResult'].patchValue('overweight');
        break;
      default:
        this.registrationForm.controls['bmiResult'].patchValue('Obese');
    }
  }

  fillForm(user: User) {
    this.registrationForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      trainerOptions: user.trainerOptions,
      package: user.package,
      goals: user.goals,
      trainedBefore: user.trainedBefore,
      selectDate: user.selectDate,
    });
  }

  update() {
    this.api
      .updateRegistrationUser(this.registrationForm.value, this.userIdUpdate)
      .subscribe((res) =>
        this.toastService.success({
          detail: 'SUBMITTED',
          summary: 'User has been updated',
          duration: 1500,
        })
      );
    this.registrationForm.reset;
    this.router.navigate(['list']);
  }
}
