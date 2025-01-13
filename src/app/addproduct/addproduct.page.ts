import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { DataapiService } from '../dataapi.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AddproductPage implements OnInit {

  txtname:any;
  txtprice:any;
  selectedFile:File | null = null;

  constructor(
    public dataapi:DataapiService
  ) { }

  onFileChange(event:any){
    const  file = event.target.files[0];
    if(file){
      this.selectedFile = file;
    }
  }

  ngOnInit() {
  }

  addproduct(){
    const formData = new FormData();
    formData.append ('name',this.txtname);
    formData.append ('price',this.txtprice);

    if(this.selectedFile){
      formData.append('image',this.selectedFile,this.selectedFile.name);
    }
    this.dataapi.add(formData).subscribe({
      next: (res:any) => {
        console.log("บันทึกข้อมูลสำเร็จ",res);
        this.txtname = "";
        this.txtprice = "";
        this.selectedFile = null;
      },
      error: (err) => {
        console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล", err);
        if(err.error instanceof ProgressEvent){
          console.error("เกิดข้อผิดพลาดในเครือข่าย");
      } else {
        console.error("เกิดข้อผิดพลาดจากเซิร์ฟเวอร์: ",err.error);
      }
      }
    })
  };

}
