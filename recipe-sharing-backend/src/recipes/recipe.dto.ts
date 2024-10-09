export class RecipeDto {
    id: number;
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    likes: number;
    author: {
      id: number;
      username: string;
    };
  
    constructor(recipe: Partial<RecipeDto>) {
      Object.assign(this, recipe);
    }
  }
  