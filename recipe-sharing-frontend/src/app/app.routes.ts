import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipes/:id', component: RecipeDetailsComponent },
  { path: 'create-recipe', component: CreateRecipeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Preusmjeravanje na login
  { path: '**', redirectTo: '/login' } // Preusmjeravanje za nepostojeće rute
];

export { routes };

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
