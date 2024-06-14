import { Routes, RouterModule } from '@angular/router';
import { PublicLayoutComponent } from './_layout/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './_layout/private-layout/private-layout.component';
import { RegisterComponent } from './register';
import { LoginComponent } from './login';
import { ChangelogComponent } from './changelog/changelog.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ViewOrganisationsComponent } from './master-module/manage-organisation/view-organisations/view-organisations.component';
import { AddOrUpdateOrganisationComponent } from './master-module/manage-organisation/add-or-update-organisation/add-or-update-organisation.component';
import { ViewUsersComponent } from './master-module/manage-user/view-users/view-users.component';
import {AuthGuard} from './services/auth-guard.guard'
import {ModuleGuard} from './services/module.guard'
import {StudyGuard} from './services/study.guard'
import { AddOrUpdateUserComponent } from './master-module/manage-user/add-or-update-user/add-or-update-user.component';
import {ManageCityComponent} from './master-module/manage-library/manage-city/manage-city.component';
import {ManageCountryComponent} from './master-module/manage-library/manage-country/manage-country.component';
import {ManageStateComponent} from './master-module/manage-library/manage-state/manage-state.component';
import {ManageControllerVocabularyComponent} from './master-module/manage-library/manage-controller-vocabulary/manage-controller-vocabulary.component';
import { SettingsComponent } from './master-module/settings/settings.component';
import { MasterDashboardComponent } from './master-module/master-dashboard/master-dashboard.component';
import { SystemComponent } from './master-module/master-audit-trail/system/system.component';
import { LoginTrailComponent } from './master-module/master-audit-trail/login-trail/login-trail.component';
import { StudiesAndRolesComponent } from './organization-module/studies-and-roles/studies-and-roles.component';
import { ManageKitsComponent } from './organization-module/drug-pooling/manage-kits/manage-kits.component';
import { InventoryComponent } from './organization-module/drug-pooling/inventory/inventory.component';
import { KitListsComponent } from './organization-module/drug-pooling/kit-lists/kit-lists.component';
import { DashboardComponent } from './organization-module/dashboard/dashboard.component';
import { ViewUserComponent } from './organization-module/manage-user/view-user/view-user.component'
import { AddOrUpdateUsersComponent } from './organization-module/manage-user/add-or-update-users/add-or-update-users.component'
import { AddOrUpdateSitesComponent } from './organization-module/manage-site/add-or-update-sites/add-or-update-sites.component'
import { ViewSitesComponent } from './organization-module/manage-site/view-sites/view-sites.component'
import { ViewDepotComponent } from './organization-module/manage-depot/view-depot/view-depot.component'
import { AddOrUpdateDepotComponent } from './organization-module/manage-depot/add-or-update-depot/add-or-update-depot.component'
import {AuditTrailComponent} from './organization-module/audit-trail/audit-trail.component';
import {ChangePasswordComponent} from './master-module/change-password/change-password.component'
import {ChangePassComponent} from './organization-module/change-pass/change-pass.component'
import {KitTypesComponent} from './study-module/study-manage-kit-types/kit-types/kit-types.component'
import { AddUpdateKitTypesComponent } from './study-module/study-manage-kit-types/add-update-kit-types/add-update-kit-types.component';
import { SiteDetailsComponent } from './study-module/study-manage-site/site-details/site-details.component';
import { AddEditSiteDetailsComponent } from './study-module/study-manage-site/add-edit-site-details/add-edit-site-details.component';
import { TreatmentsComponent } from './study-module/study-manage-treatments/treatments/treatments.component';
import { AddEditTreatmentsComponent } from './study-module/study-manage-treatments/add-edit-treatments/add-edit-treatments.component';
import { ViewCohartComponent } from './study-module/study-manage-cohart/view-cohart/view-cohart.component';
import {ViewRolesComponent} from './study-module/study-manage-roles/view-roles/view-roles.component'
import { CreatEditRolesComponent } from './study-module/study-manage-roles/creat-edit-roles/creat-edit-roles.component';
import { AddEditStudiesComponent } from './study-module/manage-studies/add-edit-studies/add-edit-studies.component';
import { ViewStudiesComponent } from './study-module/manage-studies/view-studies/view-studies.component';
import {StudiesPageComponent} from './study-module/manage-studies/studies-page/studies-page.component';
import { ViewDepotsComponent } from './study-module/study-manage-depot/view-depots/view-depots.component';
import { AddEditDepotsComponent } from './study-module/study-manage-depot/add-edit-depots/add-edit-depots.component';
import { StratificationFactorComponent } from './study-module/stratification-factor/stratification-factor.component';
import { DepotKitsComponent } from './organization-module/drug-pooling/depot-kits/depot-kits.component';
import { ViewRandomizationListComponent } from './study-module/study-randomization/view-randomization-list/view-randomization-list.component';
import { DetailedListComponent } from './study-module/study-randomization/detailed-list/detailed-list.component';
import { ViewVisitsComponent } from './study-module/study-manage-visit/view-visits/view-visits.component';
import { ConfigureVisitsComponent } from './study-module/study-manage-visit/configure-visits/configure-visits.component';
import { ScheduleVisitsComponent } from './study-module/study-manage-visit/schedule-visits/schedule-visits.component';
import {DepotStatusComponent} from './study-module/study-manage-depot/depot-status/depot-status.component'
import {AssignUserComponent} from './study-module/assign-user/assign-user.component'
import {StudyManageUsersComponent} from './study-module/study-manage-users/study-manage-users.component'
import { SiteStatusComponent } from './study-module/study-manage-site/site-status/site-status.component';
import {AddUpdateSiteConfigurationComponent} from './study-module/study-manage-site/add-update-site-configuration/add-update-site-configuration.component'
import { ViewSiteConfigurationComponent } from './study-module/study-manage-site/view-site-configuration/view-site-configuration.component';
import {SubjectMainComponent} from './study-module/subject-settings/subject-main/subject-main.component'
import { OrgManageCountryComponent } from './organization-module/manage-library/manage-country/manage-country.component'
import { OrgManageCityComponent } from './organization-module/manage-library/manage-city/manage-city.component'
import { OrgManageStateComponent } from './organization-module/manage-library/manage-state/manage-state.component';
import {OrgManageControllerVocabularyComponent} from './organization-module/manage-library/manage-controller-vocabulary/manage-controller-vocabulary.component';
import { SupplyHomeComponent } from './supplies/settings/supply-home/supply-home.component'
import { SettingsSupplyComponent } from './supplies/settings/settings-supply/settings-supply.component';
import { TransactHomeComponent } from './supplies/transact-orders/transact-home/transact-home.component';
import { TransactDepotsComponent } from './supplies/transact-orders/transact-depots/transact-depots.component';
import { AdmitHomeComponent } from './supplies/admit-orders/admit-home/admit-home.component';
import { AdmitDepotComponent } from './supplies/admit-orders/admit-depot/admit-depot.component';
import { SettingsInventoryComponent } from './supplies/settings/settings-inventory/settings-inventory.component';
import { SettingsKitsComponent } from './supplies/settings/settings-kits/settings-kits.component';
import { SetKitdetailsComponent } from './supplies/settings/set-kitdetails/set-kitdetails.component';
import { SettingsCountryComponent } from './supplies/settings/settings-country/settings-country.component';
import { SettingsAccComponent } from './supplies/settings/settings-acc/settings-acc.component';
import { SettingsDispenseComponent } from './supplies/settings/settings-dispense/settings-dispense.component';
import { SettingsStrategyComponent } from './supplies/settings/settings-strategy/settings-strategy.component';
import { SettingsAllocationComponent } from './supplies/settings/settings-allocation/settings-allocation.component';
import { SettingsEditAllocationComponent } from './supplies/settings/settings-edit-allocation/settings-edit-allocation.component';

const appRoutes: Routes = [
  // Public layout
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'recover', component: ForgotPasswordComponent },
      { path: 'setPassword', component: SetPasswordComponent},
      { path: '', component: LoginComponent },
      // { path: '**', redirectTo: 'login' }

    ]
  },
    // Private layout
    {
      path: 'master',
      component: PrivateLayoutComponent,
      children: [
        { path: 'logout', component: LoginComponent, },
        { path: 'dashboard', component: MasterDashboardComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Master Admin'],
       }  },
        { path: 'manageOrganisation', component: ViewOrganisationsComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Master Admin'],
       }  },
        { path: 'manageOrganisation/addOrEditOrganisation', component: AddOrUpdateOrganisationComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Master Admin'],
       }  },
        { path: 'manageUsers', component: ViewUsersComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Master Admin'],
       }  },
        { path: 'manageUsers/addOrEditUser', component: AddOrUpdateUserComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Master Admin'],
       }  },
        { path: 'manageLibrary/manageCountry', component: ManageCountryComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Master Admin'],
       }  },
        { path: 'manageLibrary/manageState', component: ManageStateComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Master Admin'],
       }  },
        { path: 'manageLibrary/manageCity', component: ManageCityComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Master Admin'],
       }  },
        { path: 'manageLibrary/manageController', component:ManageControllerVocabularyComponent ,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Master Admin'],
       }  },
        { path: 'configure-settings', component:SettingsComponent ,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Master Admin'],
       }  },
        { path: 'auditTrail/systemTrail', component:SystemComponent ,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Master Admin'],
       }  },
        { path: 'auditTrail/loginTrail', component:LoginTrailComponent ,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Master Admin'],
       }  },
       { path: 'changePassword', component:ChangePasswordComponent ,canActivate: [AuthGuard,ModuleGuard], data:{
        role: ['Master Admin'],
     }  },
        { path: '**', redirectTo: 'dashboard' }
  
      ]
    },
    {
      path:'',
      component:PrivateLayoutComponent,
      children:[{ path: 'studiesAndRoles', component: ViewStudiesComponent,canActivate: [AuthGuard,ModuleGuard], data:{
        role: ['Studies'],
       } }]
      }
       ,
    {
      path:'organisation',
      component:PrivateLayoutComponent,
      children:[
        { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard,ModuleGuard] , data:{
          role: ['Organization Admin'],
       } },
        { path: 'manageDepot', component: ViewDepotComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Organization Admin'],
       } },
        { path: 'manageDepot/addOrEditDepot', component: AddOrUpdateDepotComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Organization Admin'],
       } },
        { path: 'manageUsers', component: ViewUserComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Organization Admin'],
       } },
        { path: 'manageUsers/addOrEditUser', component: AddOrUpdateUsersComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Organization Admin'],
       } },
        { path: 'manageSite', component: ViewSitesComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Organization Admin'],
       } },
        { path: 'manageSite/addOrEditSite', component: AddOrUpdateSitesComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Organization Admin'],
       } },
       { path: 'manageLibrary/manageCountry', component: OrgManageCountryComponent,canActivate: [AuthGuard,ModuleGuard], data:{
        role: ['Organization Admin'],
      }  },
        { path: 'manageLibrary/manageState', component: OrgManageStateComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Organization Admin'],
      }  },
        { path: 'manageLibrary/manageCity', component: OrgManageCityComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Organization Admin'],
      }  },
        { path: 'manageLibrary/manageController', component:OrgManageControllerVocabularyComponent ,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Organization Admin'],
      }  },
        { path: 'drugPooling/manageKits', component: ManageKitsComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Organization Admin'],
       } },
        { path: 'drugPooling/kitLists', component: KitListsComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Organization Admin'],
       } },
       { path: 'drugPooling/kitLists/depotKitLists', component: DepotKitsComponent,canActivate: [AuthGuard,ModuleGuard], data:{
        role: ['Organization Admin'],
     } },
        { path: 'drugPooling/inventory', component: InventoryComponent,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Organization Admin'],
       } },
        { path: 'auditTrail', component:AuditTrailComponent ,canActivate: [AuthGuard,ModuleGuard], data:{
          role: ['Organization Admin'],
       } },
       { path: 'changePassword', component:ChangePassComponent ,canActivate: [AuthGuard,ModuleGuard], data:{
        role: ['Organization Admin'],
     } },
        { path: '**', redirectTo: 'studiesAndRoles' },
      ]
    },
    {
      path:'study',
      component:PrivateLayoutComponent,
      children:[
        { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[-10]
       } },
        { path: 'manageKitTypes', component: KitTypesComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[7],
       } },
        { path: 'manageCohort', component: ViewCohartComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[5],
       } },
        { path: 'manageKitTypes/addOrEditKitType', component: AddUpdateKitTypesComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[7],
       } },
        { path: 'manageUsers', component: StudyManageUsersComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[0]
       } },
        { path: 'manageUsers/addOrEditUser', component: AssignUserComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[0]
       } },
        { path: 'siteManagement', component: SiteDetailsComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[3],
       } },
       { path: 'manageSite/siteStatus', component: SiteStatusComponent, canActivate: [AuthGuard,ModuleGuard],data:{
        role: ['Study Admin'],code:[3],
          } },
          { path: 'manageSite/siteConfiguration', component: ViewSiteConfigurationComponent, canActivate: [AuthGuard,ModuleGuard],data:{
            role: ['Study Admin'],code:[3],
              } },
              { path: 'manageSite/siteConfiguration/addUpdateConfiguration', component: AddUpdateSiteConfigurationComponent, canActivate: [AuthGuard,ModuleGuard],data:{
                role: ['Study Admin'],code:[3],
                  } },
        { path: 'manageSite/addOrEditSite', component: AddEditSiteDetailsComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[3],
       } },
       { path: 'depotManagement', component: ViewDepotsComponent, canActivate: [AuthGuard,ModuleGuard],data:{
        role: ['Study Admin'],code:[14],
        } },
          { path: 'manageDepot/addOrEditDepot', component: AddEditDepotsComponent, canActivate: [AuthGuard,ModuleGuard],data:{
            role: ['Study Admin'],code:[13],
        } },
        { path: 'manageDepot/depotStatus', component: DepotStatusComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[13],
        } },
        { path: 'manageVisit', component: ViewVisitsComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[13],
      } },
      { path: 'manageVisit/visitConfig', component: ConfigureVisitsComponent, canActivate: [AuthGuard,ModuleGuard],data:{
        role: ['Study Admin'],code:[13],
        } },
        { path: 'manageVisit/scheduleVisits', component: ScheduleVisitsComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[13],
      } },
       { path: 'manageTreatments', component: TreatmentsComponent, canActivate: [AuthGuard,ModuleGuard],data:{
        role: ['Study Admin'],code:[7],
        } },
          { path: 'manageTreatments/addOrEditTreatment', component: AddEditTreatmentsComponent, canActivate: [AuthGuard,ModuleGuard],data:{
            role: ['Study Admin'],code:[7],
        } },
        { path: 'manageRoles', component: ViewRolesComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[5],
      } },
        { path: 'manageRoles/addOrEditRole', component: CreatEditRolesComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[5],
      } },
        { path: 'addOrEditStudy', component: AddEditStudiesComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[2],
      } },
    //   { path: 'studiesRoles', component: ViewStudiesComponent, canActivate: [AuthGuard,ModuleGuard],data:{
    //     role: ['Study Admin'],code:[0],
    //  } },
          { path: 'studyDetails', component: StudiesPageComponent, canActivate: [AuthGuard,ModuleGuard],data:{
            role: ['Study Admin'],code:[0]
        } },
        { path: 'stratification', component: StratificationFactorComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[0],
      } },
        { path: 'drugPooling/manageKits', component: ManageKitsComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[0],
       } },
       { path: 'randomization', component: ViewRandomizationListComponent, canActivate: [AuthGuard,ModuleGuard],data:{
            role: ['Study Admin'],code:[0],
        } },
        { path: 'randomization/listDetails', component: DetailedListComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[0],
      } },
        { path: 'drugPooling/kitLists', component: KitListsComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[0],
       } },
        { path: 'drugPooling/inventory', component: InventoryComponent, canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[0],
       } },
        { path: 'auditTrail', component:AuditTrailComponent , canActivate: [AuthGuard,ModuleGuard],data:{
          role: ['Study Admin'],code:[0],
       } },
       { path: 'subjectSettings', component:SubjectMainComponent , canActivate: [AuthGuard,ModuleGuard],data:{
        role: ['Study Admin'],code:[9],
       } },
       { path: 'changePassword', component:ChangePassComponent , canActivate: [AuthGuard,ModuleGuard],data:{
        role: ['Study Admin'],code:[0],
     } },
        { path: '**', redirectTo: 'studiesAndRoles' },
      ]
    },
    {
      path:'supply',
      component:PrivateLayoutComponent,
      children:[
        { path: 'settings', component: SupplyHomeComponent , canActivate: [AuthGuard], data:{
          role: ['Study Admin'],code:[0]
        } },
        { path: 'settings/supplyInfo', component: SettingsSupplyComponent  , canActivate: [AuthGuard], data:{
          role: ['Study Admin'],code:[0]
        } }, 
        { path: 'settings/supplyInfo', component: SettingsSupplyComponent , data:{
          role: ['Study Admin'],code:[0]
        } },  
        { path: 'settings/inventoryRelease', component: SettingsInventoryComponent , data:{
          role: ['Study Admin'],code:[0]
        } },  
        { path: 'settings/kitLists', component: SettingsKitsComponent , data:{
          role: ['Study Admin'],code:[0]
        } },  
        { path: 'settings/kitLists/kitDetails', component: SetKitdetailsComponent , data:{
          role: ['Study Admin'],code:[0]
        } }, 
        { path: 'settings/countryRelease', component: SettingsCountryComponent , data:{
          role: ['Study Admin'],code:[0]
        } },   
        { path: 'settings/accountability', component: SettingsAccComponent , data:{
          role: ['Study Admin'],code:[0]
        } }, 
        { path: 'settings/dispenseSettings', component: SettingsDispenseComponent , data:{
          role: ['Study Admin'],code:[0]
        } }, 
        { path: 'settings/strategySettings', component: SettingsStrategyComponent , data:{
          role: ['Study Admin'],code:[0]
        } },
        { path: 'settings/allocationSettings', component: SettingsAllocationComponent , data:{
          role: ['Study Admin'],code:[0]
        } },
        { path: 'settings/allocationSettings/editSettings', component: SettingsEditAllocationComponent , data:{
          role: ['Study Admin'],code:[0]
        } },
        { path: 'requestOrders', component: SupplyHomeComponent , data:{
          role: ['Study Admin'],code:[0]
        } },        
        { path: 'transactOrders', component: TransactHomeComponent , data:{
          role: ['Study Admin'],code:[0]
        } },   
        { path: 'transactOrder/depots', component: TransactDepotsComponent , data:{
          role: ['Study Admin'],code:[0]
        } },      
        { path: 'admitOrders', component: AdmitHomeComponent , data:{
          role: ['Study Admin'],code:[0]
        } },        
        { path: 'admitOrders/depots', component: AdmitDepotComponent , data:{
          role: ['Study Admin'],code:[0]
        } },  
        { path: 'kitDetails', component: SupplyHomeComponent , data:{
          role: ['Study Admin'],code:[0]
        } },        
        { path: 'accountability', component: SupplyHomeComponent , data:{
          role: ['Study Admin'],code:[0]
        } },
      
      ]
      },
    { path: '**', redirectTo: 'login' }

  // otherwise redirect to home
];

export const routing = RouterModule.forRoot(appRoutes, { scrollOffset: [0, 0], scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' });
