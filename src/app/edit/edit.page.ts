import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel } from '@ionic/angular/standalone';
import { DataapiService } from '../dataapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  imports: [IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonItem, IonInput, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditPage implements OnInit {

  product: { id: string; name: string, price: string, image: File | null } = { id: '', name: '', price: '', image: null };
  originalProduct: { id: string; name: string, price: string } = { id: '', name: '', price: '' };

  constructor(
    private dataapi: DataapiService,
    private router: Router
  ) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { product: any };
    if (state && state.product) {
      this.product = { ...state.product };
      this.originalProduct = { id: state.product.id, name: state.product.name, price: state.product.price };
    }
  }

  onFileChange(event: any) {
    this.product.image = event.target.files[0];
  }

  updateProduct() {
    const formData = new FormData();
    formData.append('id', this.product.id);
    if (this.product.name) {
      formData.append('name', this.product.name);
    }
    if (this.product.price) {
      formData.append('price', this.product.price);
    }

    if (this.product.image && this.product.image instanceof File) {
      formData.append('image', this.product.image, this.product.image.name);
    } else {
      console.warn('Image is not a valid File object:', this.product.image);
    }

    this.dataapi.updateproduct(formData).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          alert('ข้อมูลสินค้าถูกอัปเดตแล้ว');
          this.router.navigate(['/showproduct']);
        } else {
          alert('ข้อมูลสินค้าถูกอัปเดตแล้ว');
          this.router.navigate(['/showproduct']);
        }
      },
      (error) => {
        console.error(error);
        alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
      }
    );
  }

  cancelEdit() {
    this.router.navigate(['/showproduct']);
  }



}
