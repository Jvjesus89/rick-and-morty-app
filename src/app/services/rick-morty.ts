import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Character } from '../models/character.model';

export interface ApiResponse {
  info: { pages: number; count: number; next: string | null };
  results: Character[];
}

@Injectable({
  providedIn: 'root',
})
export class RickMortyService {
  private http = inject(HttpClient);
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  async getCharacters(
    page: number = 1,
    name?: string,
    gender?: string,
    status?: string,
    species?: string
  ): Promise<ApiResponse> {
    let url = `${this.apiUrl}?page=${page}`;

    if (name) url += `&name=${encodeURIComponent(name)}`;
    if (gender) url += `&gender=${gender}`;
    if (status) url += `&status=${status}`;
    if (species) url += `&species=${species}`;

    try {
      return await firstValueFrom(this.http.get<ApiResponse>(url));
    } catch (error) {
      return { info: { pages: 0, count: 0, next: null }, results: [] };
    }
  }
}