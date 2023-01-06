import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BoredType } from './bored-response';

@Injectable({
  providedIn: 'root',
})
export class BoredService {
  constructor(private http: HttpClient) {}

  boredUrl = 'http://www.boredapi.com/api/activity/';
  getActivity() {
    return this.http.get<BoredType>(this.boredUrl);
  }
}
