﻿import { Component, Inject, OnInit , Injectable, Directive, ElementRef ,Renderer2} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd, NavigationCancel } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AppConstants } from './_helpers/app.constants';
import { MenuSettingsService } from './_layout/settings/menu-settings.service';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-main',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit {
  @BlockUI('login') blockUIlogin: NgBlockUI;

  public _menuSettingsConfig: any;
  public _unsubscribeAll: Subject<any>;
  private _unsubscribeAllMenu: Subject<any>;
  showContent = false;
  public title;
  constructor(
    private spinner: NgxSpinnerService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    public loader: LoadingBarService,
    private deviceService: DeviceDetectorService,
    public _menuSettingsService: MenuSettingsService,
    private titleService: Title
  ) {
    this._unsubscribeAll = new Subject();
    this._unsubscribeAllMenu = new Subject();
    this.setTitle();
  }
  ngOnInit() {
 

    this._menuSettingsService.config
      .pipe(takeUntil(this._unsubscribeAllMenu))
      .subscribe((config) => {
        this._menuSettingsConfig = config;
      });
    // page progress bar percentage
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // set page progress bar loading to start on NavigationStart event router
        this.loader.start();
        this.spinner.show();

      }
      if (event instanceof RouteConfigLoadStart) {
        this.loader.increment(35);
        // this.spinner.show(35);
        this.spinner.show();
        


      }
      if (event instanceof RouteConfigLoadEnd) {
        this.loader.increment(75);
        this.spinner.show();

      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        // set page progress bar loading to end on NavigationEnd event router
        this.loader.complete();
        this.spinner.hide();

        this.showContent = true;
        // close menu for mobile view
        if (this.deviceService.isMobile() || window.innerWidth < AppConstants.MOBILE_RESPONSIVE_WIDTH) {
          if (document.body.classList.contains('menu-open')) {
            document.body.classList.remove('menu-open');
            document.body.classList.add('menu-close');
          }
        }
      }
    });
    this.blockUIlogin.start('Loading..');
    setTimeout(() => {
      this.blockUIlogin.stop();
    }, 2500);
  }

  setTitle() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        for (let i = 0; i < this._menuSettingsConfig?.vertical_menu?.items.length; i++) {
          if (!this._menuSettingsConfig.vertical_menu.items[i].submenu &&
            this._menuSettingsConfig.vertical_menu.items[i].page === this.router.url) {
            this.title = this._menuSettingsConfig.vertical_menu.items[i].title;
            break;
          } else if (this._menuSettingsConfig.vertical_menu.items[i].submenu) {
            // Level 1 menu
            for (let j = 0; j < this._menuSettingsConfig.vertical_menu.items[i].submenu.items.length; j++) {
              if (!this._menuSettingsConfig.vertical_menu.items[i].submenu.items[j].submenu &&
                this._menuSettingsConfig.vertical_menu.items[i].submenu.items[j].page === this.router.url) {
                this.title = this._menuSettingsConfig.vertical_menu.items[i].submenu.items[j].title;
                break;
              } else if (this._menuSettingsConfig.vertical_menu.items[i].submenu.items[j].submenu) {
                // Level 2 menu
                for (let k = 0; k < this._menuSettingsConfig.vertical_menu.items[i].submenu.items[j].submenu.items.length; k++) {
                  if (this._menuSettingsConfig.vertical_menu.items[i].submenu.items[j].submenu.items[k].page === this.router.url) {
                    this.title = this._menuSettingsConfig.vertical_menu.items[i].submenu.items[j].submenu.items[k].title;
                  }
                }
              }
            }
          }
        }


      }
    });
  }
}
@Directive({ selector: '[preventCutCopyPaste]' })

export class CopyDirective {
    constructor(el: ElementRef, renderer: Renderer2) {
      var events = 'cut copy paste';
      events.split(' ').forEach(e => 
      renderer.listen(el.nativeElement, e, (event) => {
        event.preventDefault();
        })
      );
    
    }
}