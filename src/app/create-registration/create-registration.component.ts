import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  //Building the form submit constructor

  constructor(private fb: FormBuilder) {}

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
  }
}
