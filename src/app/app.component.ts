import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ModuleModule } from './module/module.module';
import { CommonModule } from '@angular/common';
import { ValidationPatterns } from './shared/validation';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ModuleModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular-form';

  @ViewChild('userForm') form: NgForm;

  emailPattern = ValidationPatterns.email;
  mobile_NumberPattern = ValidationPatterns.mobileNo;
  pincodePattern = ValidationPatterns.pincode;
  namePattern = ValidationPatterns.name;

  selectedGender: string = 'male';
  submittedData: any[] = [];
  editIndex: null | number = null;
  comAddress:string = "";
  comAddressError: boolean = false;
  sameAddress:boolean = false;

  handleAddressChange(event: any) {
    const isChecked = event.checked;

    const comAddress = this.form.controls['comAddress']?.value;
    const permanentCtrl = this.form.controls['permanentAddress'];

    if (isChecked) {
      if (!comAddress || comAddress.trim() === '') {
        this.comAddressError = true;
        this.sameAddress = false;
        permanentCtrl?.setValue("")
      } else {
        this.comAddressError = false;
        permanentCtrl?.setValue(comAddress);
      }
    } else {
      this.comAddressError = false;
      permanentCtrl?.setValue('');
    }
  }

  saveToLocalStorage(data: any[]) {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  getFromLocalStorage(): any[] {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : [];
  }

  ngOnInit() {
    this.submittedData = this.getFromLocalStorage();
  }

  onSubmit(form: NgForm) {
    console.log(this.form);
    if (form.invalid) {
      return;
    }

    const formData = {
      ...form.value,
      gender: this.selectedGender,
      sameAddress : this.sameAddress,
    };

    if (this.editIndex !== null) {
      this.submittedData[this.editIndex] = formData;
      this.editIndex = null;
    } else {
      // Create new
      this.submittedData.push(formData);
    }

    this.saveToLocalStorage(this.submittedData);
    this.form.resetForm({gender : "male"});
  }

  onEdit(index: number) {
    const stored = this.submittedData[index];
    this.form.setValue({
      firstName: stored.firstName,
      lastName: stored.lastName,
      organization: stored.organization,
      date: stored.date,
      gender: stored.gender,
      mobileNo: stored.mobileNo,
      email: stored.email,
      pincode: stored.pincode,
      comAddress: stored.comAddress,
      permanentAddress: stored.permanentAddress,
      sameAddress : stored.sameAddress,
    });

    this.editIndex = index;
  }

  onDelete(index: number) {
    this.submittedData.splice(index, 1);
    this.saveToLocalStorage(this.submittedData);

    if (this.editIndex === index) {
      this.form.resetForm();
      this.editIndex = null;
    }
  }
}
