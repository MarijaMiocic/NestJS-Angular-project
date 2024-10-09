import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createRecipe(@Body() body: { title: string; description: string; ingredients: string; instructions: string }, @Request() req) {
    console.log(req.user); // Ovdje možeš vidjeti sadrži li req.user korisničke podatke
    return this.recipesService.createRecipe(body, { userId: req.user.userId });
  }

  @Get()
  async getAllRecipes() {
    return this.recipesService.getAllRecipes();
  }

  @Get(':id')
  async getRecipeById(@Param('id') id: number) {
    return this.recipesService.getRecipeById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateRecipe(@Param('id') id: number, @Body() body: { title: string; description: string; ingredients: string; instructions: string }) {
    return this.recipesService.updateRecipe(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteRecipe(@Param('id') id: number) {
    return this.recipesService.deleteRecipe(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-recipes')
  async getMyRecipes(@Request() req) {
    return this.recipesService.getRecipesByUser(req.user.userId);
  }
}
