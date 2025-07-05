import { Injectable } from '@angular/core';
import { IErrorRespuesta, IProducto, IRespuesta } from '../models/IProducto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  apiUrl: string = '';
  partUrl: string = '';
  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
    this.partUrl = '/bp/products';
  }

  listarProductos(): Observable<IProducto[]>{
    return this.http.get<IProducto[]>(this.apiUrl + this.partUrl).pipe(
      map((respuesta: any) => {
        return respuesta.data;
      })
    );
  }

  verificarId(id: string): Observable<boolean>{
    return this.http.get<boolean>(this.apiUrl + this.partUrl + '/verification/' + id);
  }

  crearProducto(producto: IProducto): Observable<IRespuesta | IErrorRespuesta>{
    return this.http.post<IRespuesta>(this.apiUrl + this.partUrl, producto).pipe(
      catchError(err => {
        const errorRespuesta: IErrorRespuesta = {
          name: err.name,
          message: err.message,
          stack: err.stack
        };
        return of(errorRespuesta);
      })
    );
  }

  actualizarProducto(producto: IProducto): Observable<IRespuesta | IErrorRespuesta>{
    return this.http.put<IRespuesta>(this.apiUrl + this.partUrl + '/' + producto.id, producto).pipe(
      catchError(err => {
        const errorRespuesta: IErrorRespuesta = {
          name: err.name,
          message: err.message,
          stack: err.stack
        };
        return of(errorRespuesta);
      })
    );
  }

  eliminarProducto(id: string): Observable<IRespuesta | IErrorRespuesta>{
    return this.http.delete<IRespuesta>(this.apiUrl + this.partUrl + '/' + id).pipe(
      catchError(err => {
        const errorRespuesta: IErrorRespuesta = {
          name: err.name,
          message: err.message,
          stack: err.stack
        };
        return of(errorRespuesta);
      })
    );
  }
}
