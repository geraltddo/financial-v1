import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom, retry } from 'rxjs';
import { IProducto } from 'src/app/models/IProducto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent implements OnInit {
  productoForm!: FormGroup;
  showModal = false;
  modal: HTMLElement | null = null;
  openBtn: HTMLElement | null = null;
  closeBtn: HTMLElement | null = null;
  inputRequeridos: string = 'Este campo es requerido!';
  isDisabled: boolean = true;
  producto: IProducto = {} as IProducto;
  timezoneOffset: any; // Get the local time zone offset in minutes
  fechaActual!: string;
  esEditar: boolean = false;
  existeId: boolean = false;

  @Output() formSubmitted = new EventEmitter<any>();
  @ViewChild('id') id!: HTMLInputElement;
  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService
  ) {}
  
  public openModal() {
    this.modal = document.getElementById("modal");
    this.modal!.style.display = "flex";
    this.showModal = true;
    this.esEditar = false;
    this.resetForm();
  }

  public openModalEditar(item: IProducto) {
    this.modal = document.getElementById("modal");
    this.modal!.style.display = "flex";
    this.showModal = true;
    this.productoForm.get('id')?.setValue(item.id);
    this.productoForm.get('tarjetaCredito')?.setValue(item.name);
    this.productoForm.get('fechaLiberacion')?.setValue(item.date_release);
    this.productoForm.get('fechaRevision')?.setValue(item.date_revision);
    this.productoForm.get('descripcion')?.setValue(item.description);
    this.productoForm.get('logo')?.setValue(item.logo);
    this.productoForm.updateValueAndValidity();
    this.isDisabled = false;
    this.esEditar = true;
  }

  public closeModal() {
    this.modal = document.getElementById("modal");
    this.modal!.style.display = "none";
    this.showModal = false;
  }

  isControlValid(controlName: string): boolean | null | undefined {
    const control = this.productoForm.get(controlName);
    return control?.valid && control?.dirty &&  control.touched;
  }

  onSubmit() {
    this.verificarId().then((existeId) => {
      if (existeId && !this.esEditar) {
        return;
      }
      else
      {
        this.existeId = false;
        if (this.productoForm.valid) {
          console.log('Formulario válido:', this.productoForm.value);
          this.producto.date_release = this.productoForm.get('fechaLiberacion')?.value;
          this.producto.date_revision = this.productoForm.get('fechaRevision')?.value;
          this.producto.id = this.productoForm.get('id')?.value;
          this.producto.description = this.productoForm.get('descripcion')?.value;
          this.producto.name = this.productoForm.get('tarjetaCredito')?.value;
          this.producto.logo = this.productoForm.get('logo')?.value;
          this.closeModal();
          this.formSubmitted.emit({producto: this.producto, accion: this.esEditar ? 'editar' : 'crear'});
        } else {
          console.log('Formulario inválido');
        }
      }
    });

    
  }

  resetForm() {
    this.productoForm.reset();
  }

  onDateChange() {
    let fechaLiberacion = this.productoForm.get('fechaLiberacion')?.value; 
    var now_utc = Date.UTC(new Date(fechaLiberacion).getUTCFullYear(), new Date(fechaLiberacion).getUTCMonth(),
                new Date(fechaLiberacion).getUTCDate(), new Date(fechaLiberacion).getUTCHours(),
                new Date(fechaLiberacion).getUTCMinutes(), new Date(fechaLiberacion).getUTCSeconds());

    let fechaRevision = new Date(now_utc);

    fechaRevision.setFullYear(fechaRevision.getFullYear() + 1);
    let fechaRevisionString = fechaRevision.toISOString().split('T')[0];
    this.productoForm.get('fechaRevision')?.setValue(fechaRevisionString);
  }

  ngOnInit(): void {
    this.inicializar();
  }

  inicializar(){
    this.productoForm = this.formBuilder.group({
      id: ['', Validators.required],
      descripcion: ['', Validators.required],
      tarjetaCredito: ['', Validators.required],
      logo: ['', Validators.required],
      fechaLiberacion: ['', Validators.required],
      fechaRevision: [{value: '', disabled: true}, Validators.required]
    });

    this.timezoneOffset = new Date().getTimezoneOffset();
    this.fechaActual = new Date(new Date().getTime() - this.timezoneOffset * 60 * 1000).toISOString().split('T')[0];
  }

  async verificarId(){
    this.existeId = await lastValueFrom(this.productoService.verificarId(this.productoForm.get('id')?.value));

    if(this.existeId){
      this.productoForm.get('id')?.setErrors({'exists': true});
    }

    return this.existeId;
  }

}
