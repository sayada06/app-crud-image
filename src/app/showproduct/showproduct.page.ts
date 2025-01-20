import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader, IonList, IonCardContent, IonItem, IonLabel, IonThumbnail, IonButton } from '@ionic/angular/standalone';
import { DataapiService } from '../dataapi.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.page.html',
  styleUrls: ['./showproduct.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonItem, IonCardContent, IonList, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonThumbnail]
})
export class ShowproductPage implements OnInit {

  products: any = [];

  constructor(
    private dataapi: DataapiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.showproduct()
  }

  ionViewWillEnter() {
    this.showproduct()
  }

  showproduct() {
    this.dataapi.showproduct().subscribe({
      next: (data: any) => {
        this.products = data;
        console.log('products', data);
      },
      error: (error: any) => {
        console.log('error', error);
      }
    });
  }

  addproduct() {
    window.location.href = '/addproduct';
  }

  deletepro(id: any) {
    if (confirm('คุณแน่ใจไหมที่จะลบภาพนี้')) {
      this.dataapi.deleteproduct(id).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            alert('ลบภาพเรียบร้อย');
            this.showproduct(); // Reload the list of images
          } else {
            alert('ไม่สามารถุลบภาพได้ :  ' + response.message);
          }
        },
        (error) => {
          console.error(error);
          alert('เกิดข้อผิดพลาดในการลบ');
        }
      );
    }
  }

  editProduct(product: any) {
    this.router.navigate(['/edit'], {
      state: { product: product }
    });
  }

}
