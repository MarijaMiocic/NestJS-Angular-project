import { Injectable } from '@angular/core';
import { InMemoryDbService, InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { User } from './models/user';
import { Recipe } from './models/recipe';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, username: 'testuser', email: 'test@test.com', password: '123456' },
      { id: 2, username: 'testuser2', email: 'test2@test.com', password: '1234567' },
    ];

    const recipes: Recipe[] = [
      { 
        id: 1, 
        title: 'Spaghetti Bolognese', 
        description: 'A classic Italian pasta dish', 
        ingredients: 'Pasta, tomato sauce, ground beef', 
        instructions: 'Boil pasta, cook beef, mix with sauce.', 
        authorId: 1,
        likes: 5 
      },
    ];

    return { users, recipes };
  }

  // Overrides the genId method to ensure that a recipe always has an id.
  // If the recipes array is empty, the method below returns the initial number (11).
  // If the recipes array is not empty, the method below returns the highest recipe id + 1.
  genId(recipes: any[]): number {
    return recipes.length > 0 ? Math.max(...recipes.map(recipe => recipe.id)) + 1 : 11;
  }
}
