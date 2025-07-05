import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductoFinancieroComponent } from './components/producto-financiero/producto-financiero.component';
import { ToastComponent } from './components/utilitarios/toast/toast.component';
import { AgregarProductoComponent } from './components/producto-financiero/modals/agregar-producto/agregar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductoFinancieroComponent,
    ToastComponent,
    AgregarProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
