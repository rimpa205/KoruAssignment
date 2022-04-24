import { Component, OnInit } from '@angular/core';
import { Form, Validators } from '@angular/forms';
//import * as data from  'src/assets/data.json';
import data from 'src/assets/data.json';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  firstRow!: { id: number; name: string; description: string; webReference: string; };
  headers: string[] = [];
  tableData: any = [];
  booleanValue: any = false;
  filterValue: any;
  filteredData: any;
  deleteArray: any = [];
  headerCheckBool: boolean = false;
  name: any;
  description: any;
  webref: any;
  alertForm!: FormGroup;
  submitted: boolean=false;
  p: number = 1;


  constructor() {

  }

  ngOnInit(): void {


    this.firstRow = data["data"][0]
    this.headers = Object.keys(this.firstRow)
    let idindex = this.headers.indexOf("id")
    this.headers.splice(idindex, 1)
    this.tableData = data["data"];
    this.filteredData = [...data["data"]];
    this.filteredData = this.filteredData.map((elm: any) => {
      return {
        ...elm, isChecked: false
      }
    })
    this.alertForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      webReference: new FormControl('', [Validators.required]),
     
    })
  }

  sortFunction(colName: any, boolean: boolean) {
    if (boolean == true) {
      this.filteredData.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0)
      this.booleanValue = !this.booleanValue
    }
    else {
      this.filteredData.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
      this.booleanValue = !this.booleanValue
    }
  }



  applyFilter() {
    this.filteredData = this.tableData.filter((value: { name: string; description: string; webReference: string; }) => {
      const searchStr = this.filterValue.toLowerCase();
      const nameMatches = value.name.toLowerCase().includes(searchStr);
      const descMatches = value.description.toLowerCase().includes(searchStr);
      const webRefMatches = value.webReference.toLowerCase().includes(searchStr);

      return nameMatches || descMatches || webRefMatches;
    });
    
  }


  deleteSelected(){
    this.filteredData=this.filteredData.filter((e: { isChecked: boolean; })=>{
     return e.isChecked===false
    })
  }

 

  selectAllItems() {

    this.headerCheckBool = !this.headerCheckBool;
    if (this.headerCheckBool === true) {
      this.filteredData = this.filteredData.map((elm: any) => {
        return {
          ...elm, isChecked: true
        }
      })
    }
    else {
      this.filteredData = this.filteredData.map((elm: any) => {
        return {
          ...elm, isChecked: false
        }
      })
    }


  }

  validateForm(){
    //console.log(this.alertsForm)
  }

  addnewRow() {
    
    if (this.alertForm.invalid) {
      return;
  }

    let lastIndex = this.filteredData.length
    this.submitted = true;
    let newid = lastIndex + 1;
    
    
    let obj=this.alertForm.value;
    obj.id=newid
    console.log(this.alertForm.value)
    this.filteredData.push(obj);
    this.submitted=false;
    for (let control in this.alertForm.controls) {
      this.alertForm.controls[control].setErrors(null);
    }
    this.alertForm.reset();
    //emptyform
  }

  get f() { return this.alertForm.controls; }


}



