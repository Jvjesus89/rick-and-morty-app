import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Character } from '../models/character.model'; 

@Injectable({
  providedIn: 'root',
})
export class RickMortyService {
  private http = inject(HttpClient);
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  
  
  async getCharacters(
    name?: string, 
    gender?: string, 
    status?: string, 
    species?: string
  ): Promise<Character[]> {
  let url = this.apiUrl;
  const params = [];

  if (name) params.push(`name=${name}`);
  if (gender) params.push(`gender=${gender}`);
  if (status) params.push(`status=${status}`);
  if (species) params.push(`species=${species}`);

  if (params.length > 0) url += `?${params.join('&')}`;

  const response: any = await firstValueFrom(this.http.get(url));
  return response.results as Character[];
}
}