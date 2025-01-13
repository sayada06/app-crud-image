import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataapiService {

  constructor(
    public http:HttpClient
  ) { }

  add(fromData:any){
    return this.http.post('http://127.0.0.1/crudapi/upload.php',fromData)
  }
}
