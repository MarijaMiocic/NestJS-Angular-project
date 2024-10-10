import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // za *ngIf
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Dodano za rad sa formama
    FormsModule, // Dodano za rad sa formama
    HttpClientModule, // Dodano za rad sa HTTP zahtjevima
    // CommonModule, // Dodano za *ngIf i ostale Angular direktive
    AppRoutingModule, // Dodano ovdje kako bi rute bile registrirane
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 500 })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
