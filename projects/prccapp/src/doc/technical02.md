# Source Code Overview

## Angular application
PRCC is a typical Angular application.

### important files
all files are in the git project.

`./package.json`  
./angular.json  
./tsconfig.json  
`./deploy.sh` - the deploy script. You run it on your development machine and it builds and deploys the app to a public site (currently - github pages)

./projects/prccapp/tsconfig.app.json

`./projects/prccapp/src` - the root folder for source files. All subsequent files are under this location!

`src/index.html`  
src/main.ts  
src/styles.less  
src/common.less  

`src/assets/` - location of HTML and IMAGE files used by the app.

`src/app/` - location of all other source files  

## Angular Modules
The root module is AppModule (in `app.module.ts`), and it bootstraps the component that is the
starting point of the application - AppComponent (in `app.component.ts`).  
These module and component are mandatory in any Angular app.

## Angular Routing
This app uses Angular Routing to switch between views - mainly, to change the layers displayed on the map!

in `app.module.ts` we have
```typescript
import { AppRoutingModule } from './app-routing.module';
```
The app includes a module named `app-routing.module.ts`  
in it we import angular's RouterModule:  
```typescript
import { RouterModule, Routes } from '@angular/router';
```
also, in it we configure all possible routes:
```typescript
const routes: Routes = [
  { path: 'trees', component: TreesComponent },
  { path: 'munis', component: MunisComponent },
  { path: 'munis/:id', component: MuniComponent },
  { path: 'stat-areas', component: StatAreasComponent },
  { path: 'stat-areas/:id', component: StatAreaComponent },
  { path: '', component: AboutComponent },
];
```
The paths `munis`, `stat-areas`, `trees` match the 3 main views: רשויות, איזורים סטטיסטיים, לווין.  
The `@NgModule` then uses the `routes` array:  
```typescript
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

The default route (`''`) points to the `AboutComponent`  

for Routing to work correctly, there must be a `base` tag in `index.html`:
```html
<head>
  <base href="/">

  <meta charset="utf-8">
  <title>PRCC קידום חוסן עירוני והיערכות לשינוי אקלים</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
```

Switching from one view to another is done when the user selects a View Mode in the menu.  
This is implemented in `filter.component.html` by using the `[routerLink]` attribute:
```html
<div class='filter'>
    <div class='selector'>
        <span [class]='"selected " + mode'></span>
        <a class='munis' [routerLink]='["/", "munis"]' [class.active]='mode === "munis"' queryParamsHandling='merge'>רשויות</a>
        <a class='stat-areas' [routerLink]='["/", "stat-areas"]' [class.active]='mode === "stat-areas"' queryParamsHandling='merge'>אזורים</a>
        <a class='trees' [routerLink]='["/", "trees"]' [class.active]='mode === "trees"' queryParamsHandling='merge'>לווין</a>
    </div>
```
and also in the `about.component.html` where entering the app switches to the `munis` Mode:
```html
<div class='about'>
    <div>
        <h1>פרויקט PRCC</h1>
        <h2>תכנון דיגיטלי לקידום חוסן עירוני והערכות לשינויי אקלים</h2>
        <a class='entry' routerLink='/munis'>כניסה&nbsp;&gt;</a>
    </div>
```

Note that `<router-outlet>` tag (which defines where the "routed" view will be displayed) appears only inside the
`<app-layout>` tag in the `app.component.html`:
```html
<app-layout>
  <router-outlet></router-outlet>
</app-layout>
```

`app-layout` is the selector of the `layout.component.ts` component, and appears itself only in `app.component.html`.  
`AppComponent` is the top-most component (defined as bootstrap in `app.module.ts`):
```typescript
@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    ...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
Note again that the main `routerLink`s appear in `filter.component.html`, but the `<router-outlet>` tag 
appears in `app.component.html`!

### passing a parameter to a route  
in the routes array we have this route  
```
  { path: 'munis/:id', component: MuniComponent },
```
it defines that the MuniComponent is displayed when this route is activated.  
The route parameter `:id` is passed from the URL to the component through the 
parameter of type `ActivatedRoute` to the constructor of the component `AppComponent` in `app.component.ts`:
```
export class AppComponent {
  constructor(private route: ActivatedRoute, private router: Router, private state: StateService) { 
    console.log('AppComponent constructor STARTED');
    this.router.events.pipe(
```
but it seems that the constructor is called when navigating to any URL manually, but
not when navigating further in the Angular app through its links


activate a route with code?  
the `Router` parameter in the constructor is used to call `navigate()` from inside the code.  
The `Router` parameter is dependency injected.

`navigate()` is called from the following places:  
- in `filter.component.ts` when a selection is made in the drop-down menus that appear in in `filter.component.html`  
(methods `updateCheck()`, `selectValue()`, `toggleValue()`)
- in `map.component.ts` when one of the polygons in the map is clicked
- several other places

