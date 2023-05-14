import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { EdgeService } from "app/shared/services/edge.service";
import { CityService } from "app/shared/services/city.service";
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "app-edit-edge",
  templateUrl: "./edit-edge.component.html",
  styleUrls: ["./edit-edge.component.scss"],
})
export class EditEdgeComponent implements OnInit {
  cities: any = [];
  edge: any;
  edgeId: string;
  originId: string;
  origin: any;
  weight: number;
  destinyId: string;
  destiny: any;

  constructor(
    private edgeService: EdgeService,
    private router: Router,
    private route: ActivatedRoute,
    private cityService: CityService
  ) {
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
  }
  getCity(originId: string, destinyId: string) {
    for (let city of this.cities) {
      if (originId === city.cityId) {
        this.origin = city;
      }
      if (destinyId === city.cityId) {
        this.destiny = city;
      }
    }
  }
  ngOnInit() {
    this.edgeId = this.route.snapshot.queryParamMap.get("edgeId");
    this.origin = this.route.snapshot.queryParamMap.get("origin");
    this.weight = parseInt(this.route.snapshot.queryParamMap.get("weight"));
    this.destiny = this.route.snapshot.queryParamMap.get("destiny");
  }
  updateEdge() {
    if (this.weight > 0) {
      if (this.origin === this.destiny) {
        Swal.fire({
          title: "Error",
          text: "Una arista no puede tener el mismo origen y destino",
          icon: "error",
          confirmButtonText: "Volver",
        });
      } else {
        this.getCity(this.origin, this.destiny);
        const edge = {
          edgeId: this.edgeId,
          origin: this.origin,
          weight: this.weight,
          destiny: this.destiny,
        };
        this.edgeService.updateEdge(this.edgeId, edge).subscribe(
          (response) => {
            if (response.code === 200) {
              Swal.fire({
                title: "Se guardaron los datos",
                text: "Operación realizada con éxito",
                icon: "success",
                confirmButtonText: "Volver",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(["/exercises/edges"]);
                }
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Un error ha ocurrido",
                icon: "error",
                confirmButtonText: "Volver",
              });
            }
          },
          (error) => {
            Swal.fire({
              title: "Error en el servidor",
              text: "Un error ha ocurrido",
              icon: "error",
              confirmButtonText: "Volver",
            });
          }
        );
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "El peso mínimo de una arista debe ser 1",
        icon: "error",
        confirmButtonText: "Volver",
      });
    }
  }

  back() {
    this.router.navigate(["/exercises/edges"]);
  }
}
