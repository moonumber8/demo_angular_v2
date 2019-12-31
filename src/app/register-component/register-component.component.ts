import { Component, OnInit, Output, TemplateRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';




@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})

export class RegisterComponentComponent implements OnInit {
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    userName: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  })
 mDataArray:any[] = [];
  constructor(
    private http:HttpClient,
  ) {}

  onSubmit_data(data){
    //let get_path = "?email=" + data.email + "&username=" + data.username;
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; 
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var s_time = dateObj.getHours();
    var minutes = dateObj.getMinutes()   
    
    let newdate = year +""+ month +""+ day +""+ s_time +""+ minutes;

    let obj_data = { 
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.userName,
        password: data.password,
        create_timestam: newdate
    }; 
    this.http.post<any>('http://localhost:3000/register', obj_data).subscribe(result=>{
      this.mDataArray = result.data
      alert("บันทึกเสร็จเรียบร้อย");
     window.location.reload();
    });
    
  }

  ngOnInit() {}

}

