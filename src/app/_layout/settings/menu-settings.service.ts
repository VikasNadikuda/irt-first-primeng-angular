import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import {MenuSharedService} from '../../services/menu-shared.service'
import * as _ from 'lodash';

export const MENU_SETTINGS_CONFIG = new InjectionToken('menuCustomConfig');
export const ORGANISATION_MENU_CONFIG = new InjectionToken('orgCustomConfig');
export const STUDY_MENU_CONFIG = new InjectionToken('studyCustomConfig');

@Injectable({
  providedIn: 'root'
})
export class MenuSettingsService {

  private _configSubject: BehaviorSubject<any>;
  public  _defaultConfig: any;
  public validRoutes=[]
  public role
  constructor(private _router: Router, @Inject(MENU_SETTINGS_CONFIG) private _config,@Inject(ORGANISATION_MENU_CONFIG) private _org_config,@Inject(STUDY_MENU_CONFIG) private _study_config,private menuService:MenuSharedService) {
    // Set the default config from the user provided config (from forRoot)
    this.ngOnit()
  }
  ngOnit(){
    // const stConfig=this._study_config
    console.log(this._study_config)
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(currentUser)
    // this.role=this.menuService.getRole()
    this.role=localStorage.getItem('r_id')

    console.log(this.role)
    if(this.role?.trim()=='Master Admin'){
      // console.log(this.role?)
      this._defaultConfig = this._config;

    }
    else if(this.role?.trim()=='Organization Admin'){
          console.log(this.role)
      this._defaultConfig = this._org_config;

    }
    else{
      if(this.role?.trim()=='Study Admin'){
        this._defaultConfig =_.cloneDeep(this._study_config);
        for(let j=1;j< this._defaultConfig.vertical_menu.items.length;j++){
          this._defaultConfig.vertical_menu.items[j].hide=true
        }
      }
      else{
        this._defaultConfig =_.cloneDeep(this._study_config);
        this._defaultConfig =this._study_config;

        let b=[]
        this.validRoutes=[]
        let a=''
        this.menuService.getperm().subscribe(
          item=>{
            a=item
          }
          )
        b=a.split("")
        console.log(a)
  
        for(let i=0;i<b.length;i++){
          // console.log(this._defaultConfig.vertical_menu.items[2].submenu)
          if(b[i]=='1'){
            if(this._defaultConfig.vertical_menu.items[2].submenu.items[i]){
              this._defaultConfig.vertical_menu.items[2].submenu.items[i].disabled=false
              console.log('1')
              this.validRoutes.push(this._defaultConfig.vertical_menu.items[2].submenu.items[i].page)
            }
          }
          else{
            if(this._defaultConfig.vertical_menu.items[2].submenu.items[i]){
              this._defaultConfig.vertical_menu.items[2].submenu.items[i].disabled=true
              console.log('0')
            }              }
        }
      }
      
      console.log(this._defaultConfig)
    }
    this.menuService.changeMenu(this._defaultConfig)
    // Initialize the service
    this._init();
  }

  private _init(): void {
    // Set the config from the default config
    this._configSubject = new BehaviorSubject(_.cloneDeep(this._defaultConfig));
    // console.log(this._configSubject.getValue().layout, this._defaultConfig)

    // Reload the default layout config on every RoutesRecognized event
    // if the current layout config is different from the default one
    this._router.events
      .pipe(filter(event => event instanceof RoutesRecognized))
      .subscribe(() => {
        // console.log(this._configSubject,this._defaultConfig)
        if (!_.isEqual(this._configSubject.getValue().layout, this._defaultConfig.layout)) {
          // Clone the current config
          const config = _.cloneDeep(this._configSubject.getValue());

          // Set the config
          this._configSubject.next(config);
        }
      });
      this.menuService.changeMenu(this._defaultConfig)

  }
  menuChange(){
    this._configSubject = new BehaviorSubject(_.cloneDeep(this._defaultConfig));
    var role=localStorage.getItem('r_id')
    // this._defaultConfig=this._org_config
    console.log(this._defaultConfig,this._config)

    console.log(role)
    if(role?.trim()=='Master Admin'){
      // console.log(role)
      this._defaultConfig = this._config;

    }
    else if(role?.trim()=='Organization Admin'){
      console.log('org')
        this._defaultConfig =this. _org_config;
    }
      else{
        console.log(this._study_config)
        if(this.role?.trim()=='Study Admin'){
          this._defaultConfig =_.cloneDeep(this._study_config);
          for(let j=1;j< this._defaultConfig.vertical_menu.items.length;j++){
            this._defaultConfig.vertical_menu.items[j].hide=true
          }
        }
        else{
          this._defaultConfig =_.cloneDeep(this._study_config);
          let b=[]
        let a=''
        a=this.menuService.getPermissions()           
        b=a.split("")
        console.log(a)
        this.validRoutes=[]
        for(let i=0;i<b.length;i++){
          // console.log(this._defaultConfig.vertical_menu.items[2].submenu)
          if(b[i]=='1'){
            if(this._defaultConfig.vertical_menu.items[2].submenu.items[i]){
              this._defaultConfig.vertical_menu.items[2].submenu.items[i].disabled=false
              console.log('1')
              if(this._defaultConfig.vertical_menu.items[2].submenu.items[i].page=='/study/manageRoles'){
                console.log('c ')
              }
              this.validRoutes.push(this._defaultConfig.vertical_menu.items[2].submenu.items[i].page)

            }
          }
          else{
            if(this._defaultConfig.vertical_menu.items[2].submenu.items[i]){
              this._defaultConfig.vertical_menu.items[2].submenu.items[i].disabled=true
              console.log('0')
            }              }
        }
      }
    }
    this._configSubject = new BehaviorSubject(_.cloneDeep(this._defaultConfig));

    console.log(this._configSubject,this._defaultConfig)
    console.log(this._configSubject.getValue(), this._defaultConfig)
    // if (!_.isEqual(this._configSubject.getValue().layout, this._defaultConfig.layout)) {
    //   // Clone the current config
      const config = _.cloneDeep(this._configSubject.getValue());

      // Set the config
      console.log(config)
      this._configSubject.next(config);
    // }
  }
  set config(value) {
    console.log(value)
    let config = this._configSubject.getValue();

    // Merge the new config
    config = _.merge({}, config, value);

    // Notify the observers
    this._configSubject.next(config);
  }

  get config(): any | Observable<any> {
    return this._configSubject.asObservable();
  }
  getMenu(){
    return this._defaultConfig
  }
}
