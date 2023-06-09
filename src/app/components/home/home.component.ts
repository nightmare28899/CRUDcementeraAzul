import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { Material } from '../../interface/Material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  materialArrayFilter: Material[] = [
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
      id: 0,
      value: 'Seleccione una unidad de medida',
    },
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
  materialName: string = '';
  materialId: number = 0;
  updateMaterial: boolean = false;
  search: string = '';

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
      this.materialArrayFilter = JSON.parse(
        localStorage.getItem('materials') || '{}'
      );
    }
  }

  getTheUnitMeasurement(id: number) {
    let unit = this.unitMeasurementArray.find((x) => x.id == id);
    return unit?.value;
  }

  openVerticallyCentered(content: any, type: string, material: any) {
    if (type === 'create') {
      this.unit_measurement = 12;
      this.modalService.open(content);
      this.updateMaterial = false;
      this.name = '';
      this.unit_measurement = 0;
      this.price = 0;
      this.stock = 0;
      this.total = 0;
    } else if (type === 'edit') {
      this.modalService.open(content);
      this.uploadForm.setValue({
        id: material.id,
        name: material.name,
        unit_measurement: material.unit_measurement,
        price: material.price,
        stock: material.stock,
        total: material.total,
      });

      this.name = material.name;
      this.unit_measurement = material.unit_measurement;
      this.price = material.price;
      this.stock = material.stock;
      this.total = material.total;

      this.updateMaterial = true;
    }
  }

  submit() {
    if (
      this.uploadForm.value.name != '' &&
      this.uploadForm.value.price != 0 &&
      this.uploadForm.value.unit_measurement != 0
    ) {
      this.total = this.price * this.stock;
      this.uploadForm.value.id = this.materialArray.length + 1;
      this.uploadForm.value.total = this.total;
      this.materialArrayFilter.push(this.uploadForm.value);
      this.materialArray.push(this.uploadForm.value);
      localStorage.setItem('materials', JSON.stringify(this.materialArray));

      if (this.uploadForm.value.stock == 0) {
        this.serv.toast('stock');
      }

      this.serv.toast('created');
      this.uploadForm.reset();
      this.modalService.dismissAll();
    } else {
      this.serv.toast('error');
    }
  }

  update() {
    this.total = this.price * this.stock;
    this.uploadForm.value.total = this.total;
    this.uploadForm.value.name = this.name;
    this.uploadForm.value.unit_measurement = this.unit_measurement;
    this.uploadForm.value.price = this.price;
    this.uploadForm.value.stock = this.stock;

    const updateData = this.materialArrayFilter.findIndex(
      (x) => x.id == this.uploadForm.value.id
    );

    this.materialArrayFilter[updateData] = this.uploadForm.value;

    localStorage.setItem('materials', JSON.stringify(this.materialArrayFilter));
    this.serv.toast('updated');
    if (this.uploadForm.value.stock == 0) {
      this.serv.toast('stock');
    }
    this.modalService.dismissAll();
  }

  searchMaterial(query: string) {
    this.materialArrayFilter = this.materialArray.filter((x) => {
      return x.name
        .toLocaleLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(query.toLocaleLowerCase());
    });
  }

  openModalDelete(deleteContent: any, material: Material) {
    this.modalService.open(deleteContent);
    this.materialName = material.name;
    this.materialId = material.id;
  }

  deleteMaterial(materialId: number) {
    this.materialArray = this.materialArray.filter((x) => x.id != materialId);
    this.serv.toast('deleted');
    this.materialArrayFilter = this.materialArray;
    localStorage.setItem('materials', JSON.stringify(this.materialArray));
    this.modalService.dismissAll();
  }

  toast(type: string) {
    this.serv.toast(type);
  }
}
