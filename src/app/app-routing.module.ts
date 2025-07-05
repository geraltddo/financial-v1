import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoFinancieroComponent } from './components/producto-financiero/producto-financiero.component';

const routes: Routes = [
  { path: '', component: ProductoFinancieroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
