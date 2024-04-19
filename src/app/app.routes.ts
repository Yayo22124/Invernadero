import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "invernadero",
    children: [
      {
        path: "usuarios",
        async loadComponent() {
          const component = await import("@pages/users/users.component");

          return component.UsersComponent;
        },
      },
      {
        path: "reportes",
        async loadComponent() {
          const component = await import("@pages/reports/reports.component");

          return component.ReportsComponent;
        },
      },
      {
        path: "control",
        async loadComponent() {
          const component = await import("@pages/controls/controls.component");

          return component.ControlsComponent;
        },
      },
      {
        path: "**",
        redirectTo: "usuarios"
      }
    ]
  },
  {
    path: "**",
    redirectTo: "/invernadero/usuarios"
  }
];
