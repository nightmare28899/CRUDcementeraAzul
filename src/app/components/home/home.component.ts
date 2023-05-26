import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { Material } from '../../interface/Material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      unit_measurement: 'metro',
      price: 100,
      stock: 10,
      total: 1000,
    },
    {
      id: 2,
      name: 'Material 2',
      unit_measurement: 'milimetro',
      price: 200,
      stock: 20,
      total: 4000,
    },
    {
      id: 3,
      name: 'Material 3',
      unit_measurement: 'litro',
      price: 300,
      stock: 30,
      total: 9000,
    },
    {
      id: 4,
      name: 'Material 4',
      unit_measurement: 'galon',
      price: 400,
      stock: 40,
      total: 16000,
    },
    {
      id: 5,
      name: 'Material 5',
      unit_measurement: 'pieza',
      price: 500,
      stock: 50,
      total: 25000,
    },
  ];

  unit_measurement: any[] = [
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
    }
  ];
  uploadForm: FormGroup;
  /* Form Variables */
  name: string = '';
  unitMeasurement: number = 0;
  price: number = 0;
  stock: number = 0;
  total: number = 0;

  constructor(
    private serv: ServiceService,
    private modalService: NgbModal,
    public fb: FormBuilder
  ) {
    this.uploadForm = this.fb.group({
      name: [''],
      unit_measurement: [''],
      price: [0],
      stock: [0],
      total: [''],
    });
  }

  ngOnInit() {}

  openVerticallyCentered(content: any) {
    this.modalService.open(content);
  }

  submit() {
    this.total = this.price * this.stock;
    this.uploadForm.value.total = this.total;
    console.log(this.uploadForm.value);
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
