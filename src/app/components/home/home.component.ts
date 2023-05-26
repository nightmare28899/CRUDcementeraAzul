import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { Material } from '../../interface/Material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  materialArray: Material[] = [
    {
      id: 1,
      name: 'Material 1',
      unit_measurement: 1,
      price: 100,
      stock: 10,
      total: 1000,
    },
    {
      id: 2,
      name: 'Material 2',
      unit_measurement: 8,
      price: 200,
      stock: 20,
      total: 4000,
    },
    {
      id: 3,
      name: 'Material 3',
      unit_measurement: 3,
      price: 300,
      stock: 30,
      total: 9000,
    },
    {
      id: 4,
      name: 'Material 4',
      unit_measurement: 6,
      price: 400,
      stock: 40,
      total: 16000,
    },
    {
      id: 5,
      name: 'Material 5',
      unit_measurement: 4,
      price: 500,
      stock: 50,
      total: 25000,
    },
  ];

  unitMeasurementArray: any[] = [
    {
      id: 1,
      value: 'metro',
    },
    {
      id: 2,
      value: 'kilogramo',
    },
    {
      id: 3,
      value: 'litro',
    },
    {
      id: 4,
      value: 'pieza',
    },
    {
      id: 5,
      value: 'onza',
    },
    {
      id: 6,
      value: 'galón',
    },
    {
      id: 7,
      value: 'gramo',
    },
    {
      id: 8,
      value: 'mililitro',
    },
    {
      id: 9,
      value: 'libra',
    },
  ];
  uploadForm: FormGroup;
  /* Form Variables */
  name: string = '';
  unit_measurement: number = 12;
  price: number = 0;
  stock: number = 0;
  total: number = 0;

  constructor(private serv: ServiceService, private modalService: NgbModal) {
    this.uploadForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(''),
      unit_measurement: new FormControl(0),
      price: new FormControl(0),
      stock: new FormControl(0),
      total: new FormControl(0),
    });
  }

  ngOnInit() {
    if (localStorage.getItem('materials') != null) {
      this.materialArray = JSON.parse(
        localStorage.getItem('materials') || '{}'
      );      
    }
  }

  getTheUnitMeasurement(id: number) {
    let unit = this.unitMeasurementArray.find((x) => x.id == id);
    return unit?.value;
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content);
  }

  submit() {
    this.total = this.price * this.stock;
    this.uploadForm.value.id = this.materialArray.length + 1;
    this.uploadForm.value.total = this.total;
    this.materialArray.push(this.uploadForm.value);
    localStorage.setItem(
      'materials',
      JSON.stringify(this.materialArray)
    );

    this.uploadForm.reset();
    this.modalService.dismissAll();
    this.serv.toast('created');
  }

  editMaterial(material: Material) {
    console.log(material);
  }

  deleteMaterial(material: Material) {
    console.log(material);
  }

  toast(type: string) {
    this.serv.toast(type);
  }
}
