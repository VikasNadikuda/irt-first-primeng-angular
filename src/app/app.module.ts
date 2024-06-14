import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';  
import { NgbModule, NgbCarouselConfig, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AuthGuard } from './_guards/auth.guard';
import { AlertComponent } from './_directives/alert.component';
import { AlertService } from './_services/alert.service';
import { AuthService } from './_services/auth.service';

// Routing
import { routing } from './app.routing';

// Components
import { AppComponent } from './app.component';

import { SettingsModule } from './_layout/settings/settings.module';
import { ThemeSettingsConfig } from './_layout/settings/theme-settings.config';
import { MenuSettingsConfig } from './_layout/settings/menu-settings.config';
import { OrganisationMenuConfig } from './_layout/settings/menu-settings.config';
import {StudyMenuConfig} from './_layout/settings/menu-settings.config'
import { HeaderComponent } from './_layout/header/header.component';
import { VerticalComponent as HeaderVerticalComponent } from './_layout/header/vertical/vertical.component';
import { HorizontalComponent as HeaderHorizontalComponent } from './_layout/header/horizontal/horizontal.component';
import { FullLayoutNavbarComponent } from './_layout/header/full-layout-navbar/full-layout-navbar.component';

import { FooterComponent } from './_layout/footer/footer.component';
import { NavigationComponent as AppNavigationComponent } from './_layout/navigation/navigation.component';

import { PublicLayoutComponent } from './_layout/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './_layout/private-layout/private-layout.component';

import { RegisterComponent } from './register';
import { SocialSigninComponent } from './social-signin/social-signin.component';
import { LoginComponent } from './login';

import { ChangelogComponent } from './changelog/changelog.component';

import { NavbarService } from './_services/navbar.service';
import { VerticalnavComponent } from './_layout/navigation/verticalnav/verticalnav.component';
import { HorizontalnavComponent } from './_layout/navigation/horizontalnav/horizontalnav.component';

// perfect scroll bar
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
// spinner
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DeviceDetectorModule } from 'ngx-device-detector';
import { RouterModule } from '@angular/router';
import { CustomizerComponent } from './_layout/customizer/customizer.component';
import { PartialsModule } from './content/partials/partials.module';
import { BreadcrumbModule } from './_layout/breadcrumb/breadcrumb.module';
import { DataApiService } from './_services/data.api';
import { HorizontalCustomizerComponent } from './_layout/customizer/horizontal-customizer/horizontal-customizer.component';
import { BlockTemplateComponent } from './_layout/blockui/block-template.component';
import { BlockUIModule } from 'ng-block-ui';
import { MatchHeightModule } from './content/partials/general/match-height/match-height.module';
import { FullLayoutComponent } from './_layout/full-layout/full-layout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SettingsComponent } from './master-module/settings/settings.component' ;
import { ViewUsersComponent } from './master-module/manage-user/view-users/view-users.component'
;
import { AddOrUpdateUserComponent } from './master-module/manage-user/add-or-update-user/add-or-update-user.component'
;
import { AddOrUpdateOrganisationComponent } from './master-module/manage-organisation/add-or-update-organisation/add-or-update-organisation.component'
;
import { ViewOrganisationsComponent } from './master-module/manage-organisation/view-organisations/view-organisations.component'
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import { ToastrModule } from 'ngx-toastr';
import {FileUploadModule} from 'primeng/fileupload';
import {SplitButtonModule} from 'primeng/splitbutton';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ToolbarModule} from 'primeng/toolbar';
import {InputNumberModule} from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';
import {TokenInterceptorService } from './services/token-interceptor.service'
import { CustomSpinnerComponent } from './_layout/custom-spinner/custom-spinner.component'
import {InputSwitchModule} from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';
import { ManageCountryComponent } from './master-module/manage-library/manage-country/manage-country.component'
import { OrgManageCountryComponent } from './organization-module/manage-library/manage-country/manage-country.component'

import { ManageStateComponent } from './master-module/manage-library/manage-state/manage-state.component';
import { OrgManageCityComponent } from './organization-module/manage-library/manage-city/manage-city.component'
import {ManageControllerVocabularyComponent} from './master-module/manage-library/manage-controller-vocabulary/manage-controller-vocabulary.component';
import { OrgManageStateComponent } from './organization-module/manage-library/manage-state/manage-state.component';
import { ManageCityComponent } from './master-module/manage-library/manage-city/manage-city.component'
import {OrgManageControllerVocabularyComponent} from './organization-module/manage-library/manage-controller-vocabulary/manage-controller-vocabulary.component';
import { MasterDashboardComponent } from './master-module/master-dashboard/master-dashboard.component';
import { SystemComponent } from './master-module/master-audit-trail/system/system.component';
import { LoginTrailComponent } from './master-module/master-audit-trail/login-trail/login-trail.component';
import { DatePipe } from '@angular/common';
import { StudiesAndRolesComponent } from './organization-module/studies-and-roles/studies-and-roles.component';
import { ManageKitsComponent } from './organization-module/drug-pooling/manage-kits/manage-kits.component';
import { InventoryComponent } from './organization-module/drug-pooling/inventory/inventory.component';
import { KitListsComponent } from './organization-module/drug-pooling/kit-lists/kit-lists.component';
import { DashboardComponent } from './organization-module/dashboard/dashboard.component'
import { ViewUserComponent } from './organization-module/manage-user/view-user/view-user.component'
import { AddOrUpdateUsersComponent } from './organization-module/manage-user/add-or-update-users/add-or-update-users.component'
import { AddOrUpdateSitesComponent } from './organization-module/manage-site/add-or-update-sites/add-or-update-sites.component'
import { ViewSitesComponent } from './organization-module/manage-site/view-sites/view-sites.component'
import { ViewDepotComponent } from './organization-module/manage-depot/view-depot/view-depot.component'
import { AddOrUpdateDepotComponent } from './organization-module/manage-depot/add-or-update-depot/add-or-update-depot.component'
import {AuditTrailComponent} from './organization-module/audit-trail/audit-trail.component'
import { ChangePassComponent } from './organization-module/change-pass/change-pass.component';
import { ChangePasswordComponent } from './master-module/change-password/change-password.component';
import { StudyManageUsersComponent } from './study-module/study-manage-users/study-manage-users.component'

import { ViewRolesComponent } from './study-module/study-manage-roles/view-roles/view-roles.component';
import { CreatEditRolesComponent } from './study-module/study-manage-roles/creat-edit-roles/creat-edit-roles.component';
import { KitTypesComponent } from './study-module/study-manage-kit-types/kit-types/kit-types.component';
import { AddUpdateKitTypesComponent } from './study-module/study-manage-kit-types/add-update-kit-types/add-update-kit-types.component';
import { SiteDetailsComponent } from './study-module/study-manage-site/site-details/site-details.component';
import { AddEditSiteDetailsComponent } from './study-module/study-manage-site/add-edit-site-details/add-edit-site-details.component';
import { TreatmentsComponent } from './study-module/study-manage-treatments/treatments/treatments.component';
import { AddEditTreatmentsComponent } from './study-module/study-manage-treatments/add-edit-treatments/add-edit-treatments.component';
import { ViewCohartComponent } from './study-module/study-manage-cohart/view-cohart/view-cohart.component';
import { ViewStudiesComponent } from './study-module/manage-studies/view-studies/view-studies.component';
import { AddEditStudiesComponent } from './study-module/manage-studies/add-edit-studies/add-edit-studies.component';
import { StudiesPageComponent } from './study-module/manage-studies/studies-page/studies-page.component';
import { ViewDepotsComponent } from './study-module/study-manage-depot/view-depots/view-depots.component';
import { AddEditDepotsComponent } from './study-module/study-manage-depot/add-edit-depots/add-edit-depots.component';;
import { StratificationFactorComponent } from './study-module/stratification-factor/stratification-factor.component'
import { ModuleGuard } from './services/module.guard';
import { StudyGuard } from './services/study.guard';;
import { DepotKitsComponent } from './organization-module/drug-pooling/depot-kits/depot-kits.component'
;
import {AccordionModule} from 'primeng/accordion';

import { ViewVisitsComponent } from './study-module/study-manage-visit/view-visits/view-visits.component'
;
import { ScheduleVisitsComponent } from './study-module/study-manage-visit/schedule-visits/schedule-visits.component'
;
import { ViewRandomizationListComponent } from './study-module/study-randomization/view-randomization-list/view-randomization-list.component'
;
import { DetailedListComponent } from './study-module/study-randomization/detailed-list/detailed-list.component'
import { GenerateRandomComponent } from './study-module/study-randomization/generate-random/generate-random.component'
;
import { ConfigureVisitsComponent } from './study-module/study-manage-visit/configure-visits/configure-visits.component'
;
import { DepotStatusComponent } from './study-module/study-manage-depot/depot-status/depot-status.component'
;
import { AssignUserComponent } from './study-module/assign-user/assign-user.component'
;
import { SiteStatusComponent } from './study-module/study-manage-site/site-status/site-status.component'
import {SubjectMainComponent} from './study-module/subject-settings/subject-main/subject-main.component'
import { ViewSiteConfigurationComponent } from './study-module/study-manage-site/view-site-configuration/view-site-configuration.component'
import {AddUpdateSiteConfigurationComponent} from './study-module/study-manage-site/add-update-site-configuration/add-update-site-configuration.component'
;
import { SupplyHomeComponent } from './supplies/settings/supply-home/supply-home.component'
;
import { SettingsSupplyComponent } from './supplies/settings/settings-supply/settings-supply.component'
;
import { TransactHomeComponent } from './supplies/transact-orders/transact-home/transact-home.component'
;
import { TransactDepotsComponent } from './supplies/transact-orders/transact-depots/transact-depots.component'
;
import { AdmitHomeComponent } from './supplies/admit-orders/admit-home/admit-home.component'
;
import { AdmitDepotComponent } from './supplies/admit-orders/admit-depot/admit-depot.component'
;
import { AdmitSiteComponent } from './supplies/admit-orders/admit-site/admit-site.component'
;
import { SettingsInventoryComponent } from './supplies/settings/settings-inventory/settings-inventory.component'
;
import { SettingsKitsComponent } from './supplies/settings/settings-kits/settings-kits.component'
;
import { SetKitdetailsComponent } from './supplies/settings/set-kitdetails/set-kitdetails.component'
;
import { SettingsCountryComponent } from './supplies/settings/settings-country/settings-country.component'
;
import { SettingsAccComponent } from './supplies/settings/settings-acc/settings-acc.component'
;
import { SettingsDispenseComponent } from './supplies/settings/settings-dispense/settings-dispense.component';;
import { SettingsStrategyComponent } from './supplies/settings/settings-strategy/settings-strategy.component';
import { SettingsAllocationComponent } from './supplies/settings/settings-allocation/settings-allocation.component'
;
import { SettingsEditAllocationComponent } from './supplies/settings/settings-edit-allocation/settings-edit-allocation.component';
import { TransactSiteComponent } from './supplies/transact-orders/transact-site/transact-site.component'
@NgModule({
    imports: [
        BrowserModule,
        PartialsModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        AccordionModule,
        BrowserAnimationsModule,
        MatchHeightModule,
        BreadcrumbModule,
        TableModule,
        CalendarModule,
        SliderModule,
        DialogModule,
        MultiSelectModule,
        ContextMenuModule,
        FileUploadModule,
        DropdownModule,
        ButtonModule,
        ToastModule,
        RadioButtonModule,
        InputTextModule,
        InputTextareaModule,
        ProgressBarModule,
        NgbModule,
        NgxSpinnerModule,
        CalendarModule,
        SplitButtonModule,
        ToolbarModule,
        CheckboxModule,
        TabViewModule,
        NgxChartsModule,
        InputNumberModule,
        TabMenuModule,
        InputSwitchModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features
         routing,
        // Settings modules
        SettingsModule.forRoot(ThemeSettingsConfig, MenuSettingsConfig,OrganisationMenuConfig,StudyMenuConfig),
        PerfectScrollbarModule,
        NgxSpinnerModule,
        DeviceDetectorModule.forRoot(),
        ToastrModule.forRoot({
            autoDismiss:true,
            maxOpened:1
          }), 
        LoadingBarRouterModule,
        BlockUIModule.forRoot({
          template: BlockTemplateComponent
        })
    ],
    declarations: [
        AppComponent,
        PublicLayoutComponent,
        PrivateLayoutComponent,
        HeaderComponent,
        FullLayoutNavbarComponent,
        HeaderHorizontalComponent,
        HeaderVerticalComponent,
        SubjectMainComponent,
        FooterComponent,
        AppNavigationComponent,
        AlertComponent,
        RegisterComponent,
        SocialSigninComponent,
        LoginComponent,
        ChangelogComponent,
        VerticalnavComponent ,
        HorizontalnavComponent ,
        CustomizerComponent,
        HorizontalCustomizerComponent,
        BlockTemplateComponent,
        FullLayoutComponent,
        ForgotPasswordComponent,
        SetPasswordComponent,
        ChangePassComponent,
        ChangePasswordComponent,
        SettingsComponent ,
        ViewUsersComponent ,
        AddOrUpdateUserComponent ,
        CustomSpinnerComponent,
        AddOrUpdateOrganisationComponent ,
        ViewOrganisationsComponent,
        ManageCityComponent,
        ManageStateComponent,
        ManageCountryComponent,
        OrgManageCountryComponent,
        OrgManageCityComponent,
        OrgManageStateComponent,
        ManageControllerVocabularyComponent,
        OrgManageControllerVocabularyComponent,
        MasterDashboardComponent,
        SystemComponent,
        LoginTrailComponent ,
        StudiesAndRolesComponent ,
        ManageKitsComponent ,
        InventoryComponent,
        DashboardComponent,
        KitListsComponent,
        ViewUserComponent,
        AddOrUpdateUsersComponent,
        AddOrUpdateSitesComponent ,
        ViewSitesComponent ,
        ViewDepotComponent ,
        AddOrUpdateDepotComponent ,
        AuditTrailComponent ,
        StudyManageUsersComponent,
        ViewRolesComponent ,
        CreatEditRolesComponent ,
        KitTypesComponent ,
        AddUpdateKitTypesComponent ,
        SiteDetailsComponent,
        AddEditSiteDetailsComponent,
        TreatmentsComponent ,
        AddEditTreatmentsComponent ,
        ViewCohartComponent,
        ViewStudiesComponent,
        AddEditStudiesComponent,
        StudiesPageComponent,
        ViewDepotsComponent,
        AddEditDepotsComponent
,
        StratificationFactorComponent
,
        DepotKitsComponent
,
        ViewVisitsComponent ,
        ScheduleVisitsComponent ,
        ViewRandomizationListComponent ,
        DetailedListComponent ,
        GenerateRandomComponent ,
        ConfigureVisitsComponent ,
        DepotStatusComponent ,
        AssignUserComponent ,
        SiteStatusComponent,
        AddUpdateSiteConfigurationComponent,
        ViewSiteConfigurationComponent,
        SupplyHomeComponent,
        SettingsSupplyComponent,
        TransactHomeComponent,
        TransactDepotsComponent
,
        AdmitHomeComponent
,
        AdmitDepotComponent
,
        AdmitSiteComponent
,
        SettingsInventoryComponent ,
        SettingsKitsComponent ,
        SetKitdetailsComponent ,
        SettingsCountryComponent ,
        SettingsAccComponent
,
        SettingsDispenseComponent,
        SettingsStrategyComponent
,
        SettingsAllocationComponent ,
        SettingsEditAllocationComponent ,
        TransactSiteComponent      
],
    providers: [
        AuthGuard,
        ModuleGuard,
        StudyGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
        },
        AlertService,
        NavbarService,
        DataApiService,
        AuthService,
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: HammerGestureConfig
        },
        NgbCarouselConfig,
        NgbModalConfig,
        DatePipe
    ],
    entryComponents: [
      BlockTemplateComponent
    ],
    bootstrap: [AppComponent],
    exports: [RouterModule]
})

export class AppModule {

}
