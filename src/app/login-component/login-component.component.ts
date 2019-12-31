import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  form = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    userName: new FormControl('', Validators.required) 
  })
  constructor(
    private http:HttpClient
  ) { }

  onSubmit_data(data){
    this.http.post<any>('http://localhost:3000/login', data).subscribe(result=>{
      alert("บันทึกเสร็จเรียบร้อย");
        //window.location.reload();
    });
    
  }

  ngOnInit() {
  }

}
