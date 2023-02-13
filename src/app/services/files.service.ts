import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

interface File{
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private apiUrl = `${environment.API_URL}/api/files`;
  constructor(
    private http: HttpClient
  ) { }

  //metodo para obtener un archivo y descargarlo
  getFile(name: string, url: string, type: string){
    return  this.http.get(url, {responseType: 'blob'})
    .pipe(
      tap(content =>{
        const blob = new Blob([content], {type});
        saveAs(blob, name);
      }),
      map(()=> true)
    );
  }

  //subir archivos
  uploadFile(file: Blob){
    const dto = new FormData();
    dto.append('file', file); //aca se le pasa como el backend espera recibir el archivo
    return this.http.post<File>(`${this.apiUrl}/upload`, dto,{
      // headers: {
      //   'Content-type': 'multipart/form-data' //el content type se ve en el backend (timeline en insomnia)
      // }
    });
  }
}
