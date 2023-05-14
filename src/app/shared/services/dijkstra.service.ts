import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { GenericResponse } from "../interfaces/interfaces";
import { environment } from "environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DijkstraService {

  private env: any = environment;

  constructor(private client: HttpClient) {}

  public getHeadersRESTToken(): HttpHeaders {
    let headers = new HttpHeaders();
    let token = localStorage.getItem("token");
    headers = headers
      .set("Content-Type", "application/json")
      .set("Authorization", token);
    return headers;
  }
  public dijkstra(startId: string, endId: string, cities: any, edges: any): Observable<GenericResponse> {
    return this.client.post<GenericResponse>(this.env.baseUrl + `/shortest-path/${startId}/${endId}`, cities, {
      headers: this.getHeadersRESTToken(),
    });
  }
}
