import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseLink = 'http://localhost:3000/'

  constructor(private http: HttpClient) { }

  eventSource(url: string): Observable<string> {
    return new Observable<string>((observer: Subscriber<string>) => {
      const source: EventSource = new EventSource(url);

      source.addEventListener('message', (event: MessageEvent<string>) => {
        if(event.data.trim() == 'exit') {
          source.close();
        } else {
          observer.next(event.data);
        }
      });

      return () => source.close();
    })
  }

  getData(link: string): Observable<any> {
    link = this.baseLink + link;
    return this.http.get(link);
  }

  postData(link: string, data: any): Observable<any> {
    link = this.baseLink + link;
    return this.http.post(link, data);
  }

  postFileAsForm(link: string, data: FormData): Observable<string> {
    link = this.baseLink + link;
    return this.http.post(link, data, {responseType: 'text'});
  }
}

export interface CommonResponse {
  success: boolean, message: string
}
