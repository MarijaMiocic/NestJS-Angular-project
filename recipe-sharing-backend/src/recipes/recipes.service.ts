import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { User } from '../users/user.entity';
import { RecipeDto } from './recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createRecipe(body: { title: string; description: string; ingredients: string; instructions: string }, authorData: { userId: number }): Promise<RecipeDto> {
    const author = await this.usersRepository.findOneBy({ id: authorData.userId });
    if (!author) {
      throw new NotFoundException('User not found');
    }

    const recipe = new Recipe();
    recipe.title = body.title;
    recipe.description = body.description;
    recipe.ingredients = body.ingredients;
    recipe.instructions = body.instructions;
    recipe.author = author;

    const savedRecipe = await this.recipesRepository.save(recipe);

    return new RecipeDto({
      id: savedRecipe.id,
      title: savedRecipe.title,
      description: savedRecipe.description,
      ingredients: savedRecipe.ingredients,
      instructions: savedRecipe.instructions,
      likes: savedRecipe.likes,
      author: {
        id: author.id,
        username: author.username,
      },
    });
  }

  async getAllRecipes(): Promise<RecipeDto[]> {
    const recipes = await this.recipesRepository.find({ relations: ['author'] });
    return recipes.map(recipe => new RecipeDto({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      likes: recipe.likes,
      author: {
        id: recipe.author.id,
        username: recipe.author.username,
      },
    }));
  }

  async getRecipeById(id: number): Promise<RecipeDto> {
    const recipe = await this.recipesRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return new RecipeDto({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      likes: recipe.likes,
      author: {
        id: recipe.author.id,
        username: recipe.author.username,
      },
    });
  }

  async updateRecipe(id: number, body: { title: string; description: string; ingredients: string; instructions: string }): Promise<RecipeDto> {
    const recipe = await this.recipesRepository.findOne({ where: { id }, relations: ['author'] });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    recipe.title = body.title;
    recipe.description = body.description;
    recipe.ingredients = body.ingredients;
    recipe.instructions = body.instructions;
    const updatedRecipe = await this.recipesRepository.save(recipe);

    return new RecipeDto({
      id: updatedRecipe.id,
      title: updatedRecipe.title,
      description: updatedRecipe.description,
      ingredients: updatedRecipe.ingredients,
      instructions: updatedRecipe.instructions,
      likes: updatedRecipe.likes,
      author: {
        id: updatedRecipe.author.id,
        username: updatedRecipe.author.username,
      },
    });
  }

  async deleteRecipe(id: number): Promise<void> {
    const result = await this.recipesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Recipe not found');
    }
  }

  async getRecipesByUser(userId: number): Promise<RecipeDto[]> {
    const recipes = await this.recipesRepository.find({
      where: { author: { id: userId } },
      relations: ['author'],
    });
    if (!recipes || recipes.length === 0) {
      throw new NotFoundException('No recipes found for this user');
    }
    return recipes.map(recipe => new RecipeDto(recipe));
  }
}
