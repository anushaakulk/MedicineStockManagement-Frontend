import { Routes } from '@angular/router';
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

export const routes: Routes = [
    {path:'',component:HomeComponent,canActivate:[authGuard]},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'updatepassword',component:UpdatepasswordComponent},
    {path:'resetpassword',component:ResetpasswordComponent},
    {path:'category',component:CategoryComponent,canActivate:[authGuard]},
    {path:'medicine',component:MedicineComponent,canActivate:[authGuard]},
    {path:'Inventories',component:InventoriesComponent,canActivate:[authGuard]},
    {path:'category/add',component:AddcategoryComponent,canActivate:[authGuard]},
    {path:'category/edit/:id',component:AddcategoryComponent,canActivate:[authGuard]},
    {path:'user',component:UserComponent,canActivate:[authGuard]},
    {path:'userrole',component:UserroleComponent,canActivate:[authGuard]}
];
