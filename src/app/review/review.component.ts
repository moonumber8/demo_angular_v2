import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  public Editor = ClassicEditor;
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}
  form = new FormGroup({
    review_topic: new FormControl('', Validators.required),

  })
  mDataArray:any[] = [];
  data_pic;
  images;
  data2;
  constructor(
    private http:HttpClient
  ) { }

  onSubmit_data(data){
    console.log(this.Editor);
    const data2 = this.Editor.getData();

    console.log("data: "+ data2);
    return false;
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

    this.http.post<any>('http://localhost:3000/review', obj_data).subscribe(result=>{
      this.mDataArray = result.data
    //   alert("บันทึกเสร็จเรียบร้อย");
    //  window.location.reload();
      const formData = new FormData();
      formData.append('file', this.images);

      this.http.post<any>('http://localhost:3000/file', formData).subscribe(result=>{
        this.data_pic = result;
        console.log(result);
        alert("บันทึกรูปภาพสำเร็จ");
      });
    });
    
  }

  selectImage(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  uploadData(){
    const formData = new FormData();
    formData.append('file', this.images);

    this.http.post<any>('http://localhost:3000/file', formData).subscribe(result=>{
      this.data_pic = result;
      console.log(result);
      alert("บันทึกรูปภาพสำเร็จ");
    });
   
  }


  ngOnInit() {
  }

}

