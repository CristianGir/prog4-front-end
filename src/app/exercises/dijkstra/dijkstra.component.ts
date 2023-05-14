import { Component, OnInit } from "@angular/core";
import { DijkstraService } from "app/shared/services/dijkstra.service";
import { CityService } from "app/shared/services/city.service";
import { EdgeService } from "app/shared/services/edge.service";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dijkstra',
  templateUrl: './dijkstra.component.html',
  styleUrls: ['./dijkstra.component.scss']
})
export class DijkstraComponent implements OnInit {

  edges: any = [];
  cities: any = [];
  startId: string;
  endId: string;

  constructor(
    private dijkstraService: DijkstraService,
    private cityService: CityService,
    private edgeService: EdgeService) {
    this.cityService.getCities().subscribe(
      (response) => {
        if (response.code === 200) {
          this.cities = response.data;
        }
      },
      (error) => {
        console.log("Error en el servidor.");
      }
    );
    this.edgeService.getEdges().subscribe(
      (response) => {
        if (response.code === 200) {
          this.edges = response.data;
        }
      },
      (error) => {
        Swal.fire({
          title: "Ocurrió un error",
          icon: "error",
          confirmButtonText: "Volver",
        });
      }
    );
  }

  ngOnInit(): void {
  }
  getDijkstra() {
    this.dijkstraService.dijkstra(this.startId, this.endId, this.cities, this.edges).subscribe(
      (response) => {
        if (response.code === 200) {
          Swal.fire({
            title: "Operación exitosa",
            text: `El camino más corto es: ${response.data}`,
            icon: "success",
            confirmButtonText: "Volver",
          });
        }
      },
      (error) => {
        Swal.fire({
          title: "Error en el servidor",
          icon: "error",
          confirmButtonText: "Volver",
        })
      }
    );
  }
}
