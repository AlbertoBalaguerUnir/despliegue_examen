import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface SerieInterface {
  title: string;
  channel: string;
  rating: number;
}


@Injectable({
  providedIn: 'root'
})



export class SeriesService {
  private apiUrl = 'https://peticiones.online/api/series';

  constructor(private http: HttpClient) { }

  //  get
  getSeries() {
    return this.http.get<SerieInterface[]>(this.apiUrl);
  }

  // POST 
  crear(serie: SerieInterface) {
    return this.http.post<SerieInterface>(this.apiUrl, serie);
  }


}