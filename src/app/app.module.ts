import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatExpansionModule, MatListModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';

// componentes creados
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { WallComponent } from './wall/wall.component';
import { ChatComponent } from './chat/chat.component';
import { ActiveComponent } from './active/active.component';
import { DiarieComponent } from './diarie/diarie.component';
import { ImputLoginComponent } from './imput-login/imput-login.component';
import { LoginAuthComponent } from './login-auth/login-auth.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { DataService } from './data.service';

// material angular io
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ImputPostComponent } from './imput-post/imput-post.component';
import { ImputChatComponent } from './imput-chat/imput-chat.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'diarioMural',
    component: DiarieComponent
  },
  {
    path: 'home',
    component: DiarieComponent
  },
  {
    path: 'Actividades',
    component: ActiveComponent
  },
  {
    path: 'Consejo_curso',
    component: WallComponent
  },
  {
    path: 'Chat',
    component: ChatComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomePageComponent,
    WallComponent,
    ChatComponent,
    ActiveComponent,
    DiarieComponent,
    ImputLoginComponent,
    LoginAuthComponent,
    ImputPostComponent,
    ImputChatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    AngularFireDatabaseModule,
    MatCardModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    AngularFireMessagingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatListModule,
  ],

  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatListModule
  ],
  providers: [AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
