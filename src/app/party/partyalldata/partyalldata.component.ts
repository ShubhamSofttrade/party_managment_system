import { DataSource } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { partyData } from 'src/app/data/partydata';
import { AlertsserviceService } from 'src/app/services/alertsservice.service';
import { LoginService } from 'src/app/services/login.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-partyalldata',
  templateUrl: './partyalldata.component.html',
  styleUrls: ['./partyalldata.component.css'],
})
export class PartyalldataComponent implements OnInit {

  // Pagination Component As template Ref
  @ViewChild(MatPaginator)paginator!: MatPaginator;
   item!: partyData;

  //  Array Stores AllPartyData
  PartyData: any[] = [];

  // MatTable Datsource Array
  dataSource!: MatTableDataSource<any>;

  // Columns to display
  displayedColumns: string[] = [
    'Action',
    'name',
    'panno',
    'mobile_no',
    'telephone_no',
    'gstin',
    'email',
    'company_name',
    'credit_limit',
  ];
  PartyFormModal!: MatDialogRef<any, any>;
  addEditId!: number;

  constructor(private loginservice: LoginService,
              private alerts:AlertsserviceService,
              private toaster:ToasterService,
              private router: Router,
              private dialog:MatDialog) {}

  ngOnInit(): void {
    // Api Call For Get Party Data When Page is Loadded
    this.getallParty();
  }


  // Api For Get party All Data
  getallParty() {
    this.PartyData = [];
    this.loginservice.getallParty().subscribe({
      next: (data) => {
        console.log(data);
        this.PartyData = data as any;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.dataSource = new MatTableDataSource(this.PartyData);
        this.dataSource.paginator = this.paginator;
        this.toaster.showInfo('List refreshed')
      },
    });
  }

  // Methid To open Partyform In Modal/Dialog
openPartyForm(modal:any){
 this.PartyFormModal =  this.dialog.open(modal,{
  disableClose: true,
  width: '80%', // Adjust the width as needed
      height: '100%', // Adjust the height as needed
      maxHeight: '90vh', // Limit the maximum height to enable scrolling
      autoFocus: false
})
}

// Medthod which closes the partyForm Modal
closePartyForm(e:any){
  if(e !='close'){
    this.getallParty();
    this.PartyFormModal.close();
  }else{
    this.PartyFormModal.close();
  }
}



  AddData(modal:any) {
    this.addEditId = 0;
    this.openPartyForm(modal);
    // this.router.navigate(['/party/partyForm']);
  }

  Filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }



  // Method which gets the data from api call and sends to partyForm for edit

  edit(id: number,modal:any) {
    this.addEditId = id;
    this.loginservice.editParty(id).subscribe({
      next: (data ) => {
        this.item = data as partyData;
        console.log(data);
      },error:(error)=>{
        this.alerts.error(error.error.message)
      },complete:()=>{
        this.openPartyForm(modal)
      }
    });
  }


  // Delete PartyData
  async DeleteParty(id:number){
    let reply =  this.alerts.confirm("Delete")
     if(await reply){
      this.loginservice.DeleteParty(id).subscribe({
        next:(data)=>{
        },error:(error)=>{
          this.alerts.error(error.error.msg)
        },complete:()=>{
          this.toaster.showSuccess("Deleted Succesfully")
          this.getallParty();
        }
      })
     }

  }

  Logout(){
    this.loginservice.Logout().subscribe({
      next:(data)=>{
        console.log(data);
      },error:(error)=>{
        console.log(error);
      },complete:()=>{
        sessionStorage.clear();
      }
    })
  }


}
