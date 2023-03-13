import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalculatorComponent } from "./calculator/calculator.component";
import { DataTablesComponent } from "./data-tables/data-tables.component";
import { EditorComponent } from "./editor/editor.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { OrganizationalComponent } from "./organizational/organizational.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "calculator",
        component: CalculatorComponent,
        data: {
          title: "Calculadora",
        },
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "data-tables",
        component: DataTablesComponent,
        data: {
          title: "Data-Tables",
        },
      },
    ],
  },

  {
    path: "",
    children: [
      {
        path: "gallery",
        component: GalleryComponent,
        data: {
          title: "Galeria",
        },
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "editor",
        component: EditorComponent,
        data: {
          title: "Editor",
        },
      },
    ],
  },
  {
    path: "",
    children: [
      {
        path: "organizational",
        component: OrganizationalComponent,
        data: {
          title: "Chart",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExercisesRoutingModule {}
