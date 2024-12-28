import { Route } from "@angular/router";
import { LoginComponent } from "./page/login.component";
import { authGuard } from "../../core/guard/auth/auth.guard";

export const routes: Route[] = [
  {
    path: '', component: LoginComponent,

  }
]
