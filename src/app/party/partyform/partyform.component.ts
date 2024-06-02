import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { partyData } from 'src/app/data/partydata';
import { AlertsserviceService } from 'src/app/services/alertsservice.service';
import { LoginService } from 'src/app/services/login.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-partyform',
  templateUrl: './partyform.component.html',
  styleUrls: ['./partyform.component.css'],
})
export class PartyformComponent implements OnInit {
  @ViewChild('BankDetails') BankDetails!: TemplateRef<any>;

  partyDetailForm!: FormGroup;
  BankForm!: FormGroup;
  addressForm!: FormGroup;
  BankData: Array<any> = [];
  AdressData: Array<any> = [];
  dialogRef!: MatDialogRef<any, any>;
  AddressModal!: MatDialogRef<any, any>;
  gstinErr: string[] = [];
  @Input() PatyEditData!: partyData;
  @Input() addEditId!: number;
  @Output() close = new EventEmitter();
  EditCaseBank: string = '';
  EditCaseAddress: string = '';

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private loginService: LoginService,
    private toaster: ToasterService,
    private location: Location,
    private alerts: AlertsserviceService
  ) {
    this.createform();
  }
  ngOnInit(): void {
    // AddEdit Id is that id which we get as an Input to PartyForm If it is greatter than 0 then its an edit Case
    if (this.addEditId > 0) {
      // Here we patch the data When Its a edit Case
      this.partyDetailForm.patchValue(this.PatyEditData);
      this.BankData = this.PatyEditData.bank_id;
      this.AdressData = this.PatyEditData.address;
    }
  }

  createform() {
    // PartyForm 
    this.partyDetailForm = this.fb.group({
      name: [, Validators.required],
      company_name: [, Validators.required],
      mobile_no: [, Validators.required],
      telephone_no: ['1234567890', Validators.required],
      whatsapp_no: ['1234567890', Validators.required],
      email: ['abc@gmai.com'],
      remark: ['Test'],
      login_access: [true],
      date_of_birth: [, Validators.required],
      anniversary_date: [, Validators.required],
      gstin: [, Validators.required],
      pan_no: ['ABCD1234', Validators.required],
      apply_tds: [true, ],
      credit_limit: [123, Validators.required],
      img: [null],
      id:[0],
    });
  //  Bank Form 
    this.BankForm = this.fb.group({
      account_holder_name: ['John Does'],
      account_no: ['1234567890121'],
      bank_ifsc_code: ['HDFC0001234'],
      bank_name: ['HDFC Bank'],
      branch_name: ['MG Road Branch'],
      id: [0],
    });

    // Address Form
    this.addressForm = this.fb.group({
      address_line_1: ['123, Test Street'],
      address_line_2: ['Near Central Park'],
      city: ['New York'],
      country: ['USA'],
      id: [0],
      pincode: [100015],
      state: ['New York'],
    });
  }


  // <<------------------------------ Bank Details Add Edit -----------------

  // AddBankDetails Opens Modal
  addBankDetails(templateRef: TemplateRef<any>) {
    this.EditCaseBank = 'Add';
    this.dialogRef = this.dialog.open(templateRef, { disableClose: true,
      width: '80vw', // Adjust the width as per your requirement for 'xl'
      maxWidth: '100vw',
      height: 'auto',
    });
  }

  // close Bank Closes Modal
  closeBank(Data: any) {
    if (Data != 'close' && this.EditCaseBank == 'Add') {
      this.BankData.push(Data);
      this.dialogRef.close(Data);
      this.toaster.showSuccess('BankDetails Added');
    } else {
      let index = this.BankData.findIndex((item) => item.id === Data.id);
      if (index !== -1) {
        this.BankData[index] = Data;
      this.toaster.showSuccess('BankDetails Edited');
      }
      this.dialogRef.close(Data);
    }
  }

  // Save Bank Details 
  SaveBankData() {
    let BankData = this.BankForm.value;
    this.closeBank(BankData);
  }

  // EditBank Details

  EditBank(item: any, modal: any) {
    this.EditCaseBank = "Edit"
    let data = this.BankData.find((ele) => ele == item);
    this.BankForm.patchValue(data);
    this.dialogRef = this.dialog.open(modal, { disableClose: true,
      width: '80vw', // Adjust the width as per your requirement 
      maxWidth: '100vw',
      height: 'auto',
    });
  }

  // --------------------------------Address Add Edit ---------------

  EditAddress(item: any, modal: any) {
    this.EditCaseAddress = "Edit"
    let data = this.AdressData.find((ele) => ele == item);
    this.addressForm.patchValue(data);
    this.AddressModal = this.dialog.open(modal, {
      disableClose: true,
      width: '80vw', // Adjust the width as per your requirement
      maxWidth: '80vw',
    });
  }

  SaveAddress() {
    let Address = this.addressForm.value;
    this.closeAdressModal(Address);
  }

  AddAdress(templateRef: TemplateRef<any>) {
    this.EditCaseAddress = 'Add';
    this.AddressModal = this.dialog.open(templateRef, {
      disableClose: true,
      width: '80vw', // Adjust the width as per your requirement for 'xl'
      maxWidth: '80vw',
    });
  }

  closeAdressModal(data: any) {
    if (data != 'close' && this.EditCaseAddress == 'Add') {
      this.AdressData.push(data);
      this.toaster.showSuccess('Address Added');
      this.AddressModal.close(data);
    } else {
      let index = this.AdressData.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        this.AdressData[index] = data;
      this.toaster.showSuccess('Address Edited');

      }
      this.AddressModal.close(data);
    }
  }

  // -------------------------AllParty Form Submit Data

  SubmitPartyData() {
    if(this.partyDetailForm.valid){
      let HeaderData = this.partyDetailForm.value;
      let partydata = new partyData(HeaderData);
      partydata.anniversary_date = this.formatDateToYYYYMMDD(HeaderData.anniversary_date)
      partydata.date_of_birth = this.formatDateToYYYYMMDD(HeaderData.date_of_birth)
      const fileInput = document.querySelector('#fileInput') as HTMLInputElement | null;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        partydata.img = fileInput.files[0];
      }
  
      if(partydata.id >0){
        partydata.address = JSON.stringify(this.AdressData);
        partydata.bank = JSON.stringify(this.BankData);
        this.loginService.PutPartyData(partydata.id,partydata).subscribe({
          next:(data)=>{
            console.log(data);
          },error:(error)=>{
            this.alerts.error(error.error.message)
          },complete:()=>{
            this.toaster.showSuccess('Edited Succesfully');
            this.goback('save');

            console.log("Edited Succesfully")
          }
        })
      }else{
        partydata.address = JSON.stringify(this.AdressData);
        partydata.bank = JSON.stringify(this.BankData );
        // partydata.address = this.AdressData;
        // partydata.bank_id = this.BankData;
        this.loginService.PostPartyData(partydata).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            console.log(error.error.error);
            this.gstinErr = error.error.error.gstin;
            this.alerts.error(error.error.msg, error.error.error.gstin);
          },
          complete: () => {
            this.toaster.showSuccess("Party Added Succesfully");
            this.goback('save');
          },
        });
      }
    }else{
      this.partyDetailForm.markAllAsTouched();
    }
   


   
  }

   // This function can be used to format the date to yyyy-mm-dd
   formatDateToYYYYMMDD(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  goback(message: string) {
    this.close.emit(message);
    this.partyDetailForm.reset();
  }
}
