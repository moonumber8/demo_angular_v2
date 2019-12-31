import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HomeComponent } from './home/home.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmEqualValidatorDirective } from './mustMatch/must-match.validator';

class MyErrorHandler implements ErrorHandler {
  handleError(error) {
   
  }
}
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    RegisterComponentComponent,
    LoginComponentComponent,
    HomeComponent,
    ConfirmEqualValidatorDirective,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'register', component: RegisterComponentComponent},
      {path: 'login', component: LoginComponentComponent},
      {path: 'home', component: HomeComponent},
      {path: '', component: HomeComponent}
    ]),
    BrowserAnimationsModule
  ],
  exports: [RouterModule],
  providers: [{provide: ErrorHandler, useClass: MyErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }


