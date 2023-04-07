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
  }

  //This function will submit all the values inside of the registration Object
  submitForm() {
    console.log(this.registrationForm.value);
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
}
