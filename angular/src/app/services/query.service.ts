import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  url = environment.url
  constructor(
    public http: HttpClient
  ) { }

  // metodo get http <T> = interface
  public get<T>(query: string, urlComplete = null) {
    query = urlComplete ? query : this.url + query;
    return this.http.get<T>(query);
  }

  // metodo post http <T> = interface
  public post<T>(query: string, param: any) {
    query = this.url + query;
    return this.http.post<T>(query, param);
  }

  // metodo delete http <T> = interface
  public delete<T>(query: string) {
    query = this.url + query;
    return this.http.delete<T>(query);
  }

  // metodo update http <T> = interface
  public put<T>(query: string, param: any) {
    query = this.url + query;
    return this.http.put<T>(query, param);
  }
}
