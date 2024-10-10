import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipesUrl = 'api/recipes'; // In-memory API URL

  constructor(private http: HttpClient) {}

  // Dohvati sve recepte
  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.recipesUrl);
  }

  // Dohvati jedan recept
  getRecipeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.recipesUrl}/${id}`);
  }

  // Kreiraj recept
  createRecipe(recipe: any): Observable<any> {
    return this.http.post<any>(this.recipesUrl, recipe);
  }

  // Ažuriraj recept
  updateRecipe(id: number, recipe: any): Observable<any> {
    return this.http.put<any>(`${this.recipesUrl}/${id}`, recipe);
  }

  // Obrisi recept
  deleteRecipe(id: number): Observable<any> {
    return this.http.delete<any>(`${this.recipesUrl}/${id}`);
  }
}
