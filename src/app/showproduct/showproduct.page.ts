import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader, IonList, IonCardContent, IonItem, IonLabel, IonThumbnail, IonButton } from '@ionic/angular/standalone';
import { DataapiService } from '../dataapi.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';


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
    private route: Router,
  ) {
    this.showproduct();
  }

  ngOnInit() {
    this.showproduct();
  }

  showproduct(){
    this.dataapi.showproduct().subscribe({
      next: (data:any) => {
        this.products = data;
        console.log('product:',data);

      },
      error: (err) => {
        console.error('Eroor fetching product:',err);
      }
    })
  }

  goToaddproduct() {
    window.location.href = '/addproduct';
  }

}
