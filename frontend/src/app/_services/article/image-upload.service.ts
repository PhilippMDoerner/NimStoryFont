/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  convertModelToFormData,
  convertSingleFileModelToFormData,
} from 'src/app/_functions/formDataConverter';
import { Image } from 'src/app/_models/image';
import { environment } from 'src/environments/environment';
import { CUDService } from '../service.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService implements CUDService<Image> {
  apiUrl: string = environment.apiUrl;
  baseUrl = `${this.apiUrl}/image`;

  constructor(private http: HttpClient) {}

  getArticleImages(articleType: string, pk: number): Observable<Image[]> {
    const url = `${this.baseUrl}/${articleType}/${pk}`;
    return this.http.get<Image[]>(url);
  }

  update(imagePk: number, imageModel: Image) {
    const formData: FormData = convertSingleFileModelToFormData(
      imageModel,
      'image',
    );
    const url = `${this.baseUrl}/pk/${imagePk}/`;
    return this.http.put<Image>(url, formData);
  }

  create(imageModel: Partial<Image>): Observable<Image> {
    const url = `${this.baseUrl}/upload/`;
    const formData: FormData = convertSingleFileModelToFormData(
      imageModel,
      'image',
    );
    return this.http.post<Image>(url, formData);
  }

  patch(imagePk: number, imageModel: Image): Observable<Image> {
    const url = `${this.baseUrl}/pk/${imagePk}/`;

    const formData: FormData = convertModelToFormData(imageModel);
    return this.http.patch<Image>(url, formData);
  }

  delete(image_pk: number): Observable<any> {
    const url = `${this.baseUrl}/pk/${image_pk}`;
    return this.http.delete<void>(url);
  }
}
