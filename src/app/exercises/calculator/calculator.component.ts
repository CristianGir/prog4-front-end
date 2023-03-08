import { Component, OnInit } from "@angular/core";
import { Parser, Expression } from "expr-eval";

@Component({
  selector: "app-caclulator",
  templateUrl: "./calculator.component.html",
  styleUrls: ["./calculator.component.scss"],
})
export class CalculatorComponent implements OnInit {
  constructor() {}
  //Variable pública que almacena el resultado.
  public result: string = "0";
  //Función que actualiza el "display".
  display(value: string) {
    if (this.result == "0") {
      this.result = value;
    } else {
      this.result = this.result + value;
    }
  }
  //Función que realiza la operación correspondiente.
  calculate() {
    var parser = new Parser();
    var expr = parser.parse(this.result);
    this.result = expr.evaluate();
  }
  //Función que reestablece el valor.
  clear() {
    this.result = "0";
  }

  ngOnInit(): void {}
}
