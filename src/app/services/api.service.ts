import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private urlUserApi = 'http://localhost:3000';
  private urlTaskApi = 'http://localhost:3001';

  constructor(
    private http: HttpClient
  ) { }


  GetRequest(type= 1, url= '', data= {}): Promise<any[]> {

    const urlTemp = (type === 1) ? this.urlUserApi : this.urlTaskApi;
    return this.http.get(
      `${urlTemp}${url}?${this.convertObjToQueryString(data)}`,
      {headers: this.headers}
      ).toPromise().then(response => response as any[]);
  }

  PostRequest(type = 1, url = '', data= {} ): Promise<any[]> {

    const urlTemp = (type === 1) ? this.urlUserApi : this.urlTaskApi;
    return this.http.post(`${urlTemp}${url}`, data, {headers: this.headers})
    .toPromise().then(response => response as any[]);
  }

  convertObjToQueryString(obj): string {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');

  }
}
