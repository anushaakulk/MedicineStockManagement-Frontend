import {Routes} from '@angular/router';

import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UpdatepasswordComponent } from './component/updatepassword/updatepassword.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { CategoryComponent } from './component/category/category.component';
import { UserComponent } from './component/user/user.component';
import { authGuard } from './_guard/auth.guard';
import { UserroleComponent } from './component/userrole/userrole.component';
import { AddcategoryComponent } from './component/addcategory/addcategory.component';
import { MedicineComponent } from './component/medicine/medicine.component';
import { InventoriesComponent } from './component/inventories/inventories.component';
import { AboutComponent } from './component/about/about.component';
import { ContactComponent } from './component/contact/contact.component';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { SalesComponent } from './component/sales/sales.component';
import { AddmedicinelistComponent } from './component/addmedicinelist/addmedicinelist.component';
import { AddinventoriesComponent } from './component/addinventories/addinventories.component';
import { AddsalesComponent } from './component/addsales/addsales.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';
import { AddorderDetailsComponent } from './component/addorder-details/addorder-details.component';

export const routes: Routes = [
    {path:'',component:HomeComponent,canActivate:[authGuard]},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'updatepassword',component:UpdatepasswordComponent},
    {path:'resetpassword',component:ResetpasswordComponent},
    {path:'category',component:CategoryComponent,canActivate:[authGuard]},
    {path:'medicine',component:MedicineComponent,canActivate:[authGuard]},
    {path:'Inventories',component:InventoriesComponent,canActivate:[authGuard]},
    {path:'Sales',component:SalesComponent,canActivate:[authGuard]},
    {path:'OrderDetails',component:OrderDetailsComponent,canActivate:[authGuard]},
    {path:'category/add',component:AddcategoryComponent,canActivate:[authGuard]},
    {path:'category/edit/:id',component:AddcategoryComponent,canActivate:[authGuard]},
    {path:'medicine/add',component:AddmedicinelistComponent,canActivate:[authGuard]},
    {path:'medicine/edit/:id',component:AddmedicinelistComponent,canActivate:[authGuard]},
    {path:'Inventories/add',component:AddinventoriesComponent,canActivate:[authGuard]},
    {path:'Inventories/edit/:id',component:AddinventoriesComponent,canActivate:[authGuard]},
    {path:'Sales/add',component:AddsalesComponent,canActivate:[authGuard]},
    {path:'Sales/edit/:id',component:AddsalesComponent,canActivate:[authGuard]},
    {path:'OrderDetails/add',component:AddorderDetailsComponent,canActivate:[authGuard]},
    {path:'OrderDetails/edit/:id',component:AddorderDetailsComponent,canActivate:[authGuard]},
    {path:'user',component:UserComponent,canActivate:[authGuard]},
    {path:'userrole',component:UserroleComponent,canActivate:[authGuard]},
    {path:'about',component:AboutComponent},
    {path:'contact',component:ContactComponent},
    {path:'feedback',component:FeedbackComponent}
    
];
