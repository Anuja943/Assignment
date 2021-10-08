import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BudgetDataServiceService {

  budgetDataURL = "https://openbudgetsindia.org/dataset/5da58c6b-c7db-4003-a043-55040fc3b467/resource/10bfab3f-ad7e-4258-b305-0b41c89e2f4b/download/nhm.csv";



  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.budgetDataURL, { responseType: 'text' });
  }

}
