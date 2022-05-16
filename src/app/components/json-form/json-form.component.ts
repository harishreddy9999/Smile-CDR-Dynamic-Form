import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.css']
})
export class JsonFormComponent implements OnInit {

  public formData:any;
  public myForm:FormGroup = this.fb.group({});
  constructor(private http:HttpClient, private fb: FormBuilder) { 
    this.http.get('/assets/my-form.json').subscribe((formDate:any)=>{
      this.formData = formDate;
      console.log(this.formData);
      if(this.formData){
        this.createForm();
      }
    })
  }

  ngOnInit(): void {
    
  }
  dynamicFormData:any=[];
  createForm(){
    
    for(var i=0;i<this.formData.item.length;i++){
      let formObj:any={};
      if(this.formData.item[i].text.indexOf("allergies")>-1){
        formObj.name = "allergies";
        formObj.label = "Allergies";
        formObj.value = "T";
        formObj.type = this.formData.item[i].type;
        if(this.formData.item[i].hasOwnProperty("option")){
          
        }
        if(formObj.type=="boolean"){
          formObj.option = [{value:"True",code:"T"},{value:"False",code:"F"}];
        }
        this.dynamicFormData.push(formObj);
      }
      if(this.formData.item[i].text.indexOf("gender")>-1){
        formObj.name = "gender";
        formObj.label = "Gender";
        formObj.value = "M";
        formObj.type = this.formData.item[i].type;
        if(this.formData.item[i].hasOwnProperty("option")){
          formObj.option = this.formData.item[i].option;
        }
        if(formObj.type=="boolean"){
          formObj.option = [{value:"True",code:"T"},{value:"False",code:"F"}];
        }
        this.dynamicFormData.push(formObj);
      }
      if(this.formData.item[i].text.indexOf("date of birth")>-1){
        formObj.name = "dOB";
        formObj.label = "Date of Birth";
        formObj.value = "";
        formObj.type = this.formData.item[i].type;
        if(this.formData.item[i].hasOwnProperty("option")){
          formObj.option = this.formData.item[i].option;
        }
        if(formObj.type=="boolean"){
          formObj.option = [{value:"True",code:"T"},{value:"False",code:"F"}];
        }
        this.dynamicFormData.push(formObj);
      }
      if(this.formData.item[i].text.indexOf("country of birth")>-1){
        formObj.name = "country";
        formObj.label = "Country";
        formObj.value = "";
        formObj.type = this.formData.item[i].type;
        if(this.formData.item[i].hasOwnProperty("option")){
          formObj.option = this.formData.item[i].option;
        }
        if(formObj.type=="boolean"){
          formObj.option = [{value:"True",code:"T"},{value:"False",code:"F"}];
        }
        this.dynamicFormData.push(formObj);
      }
      if(this.formData.item[i].text.indexOf("marital status")>-1){
        formObj.name = "maritalStatus";
        formObj.label = "Marital Status";
        formObj.value = "";
        formObj.type = this.formData.item[i].type;
        if(this.formData.item[i].hasOwnProperty("option")){
          formObj.option = this.formData.item[i].option;
        }
        if(formObj.type=="boolean"){
          formObj.option = [{value:"True",code:"T"},{value:"False",code:"F"}];
        }
        this.dynamicFormData.push(formObj);
      }
      if(this.formData.item[i].text.indexOf("smoke")>-1){
        formObj.name = "smoke";
        formObj.label = "Do you Smoke ?";
        formObj.value = "F";
        formObj.type = this.formData.item[i].type;
        if(this.formData.item[i].hasOwnProperty("option")){
          formObj.option = this.formData.item[i].option;
        }
        if(formObj.type=="boolean"){
          formObj.option = [{value:"True",code:"T"},{value:"False",code:"F"}];
        }
        this.dynamicFormData.push(formObj);
      }
      if(this.formData.item[i].text.indexOf("drink")>-1){
        formObj.name = "drink";
        formObj.label = "Do you Drink ?";
        formObj.value = "F";
        formObj.type = this.formData.item[i].type;
        if(this.formData.item[i].hasOwnProperty("option")){
          formObj.option = this.formData.item[i].option;
        }
        if(formObj.type=="boolean"){
          formObj.option = [{value:"True",code:"T"},{value:"False",code:"F"}];
        }
        this.dynamicFormData.push(formObj);
      }
    }
    console.log("dynamicFormData",this.dynamicFormData);
    for(const control of this.dynamicFormData){
      if(control.type=="boolean"){
        this.myForm.addControl(control.name,this.fb.control("F"));
      }else if(control.type=="choice"){
        this.myForm.addControl(control.name,this.fb.control(control.option[0].valueCoding.code));
      }
      else{
        this.myForm.addControl(control.name,this.fb.control(""));
      }
    }
  }
  formSubmitData:any;
  onSubmit(){
    console.log(this.myForm,"myform");
    this.formSubmitData = this.myForm.value;
  }
}
