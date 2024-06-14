import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { THEME_SETTINGS_CONFIG } from './theme-settings.service';
import { MENU_SETTINGS_CONFIG, ORGANISATION_MENU_CONFIG,STUDY_MENU_CONFIG } from './menu-settings.service';

@NgModule()
export class SettingsModule {
  constructor(@Optional() @SkipSelf() parentModule: SettingsModule) {
    if (parentModule) {
      throw new Error('SettingsModule is already loaded. Import it in the AppModule only!');
    }
  }

  static forRoot(themeConfig, menuConfig,orgMenu,studyMenu): ModuleWithProviders<SettingsModule> {
    return {
      ngModule: SettingsModule,
      providers: [
        {
          provide: THEME_SETTINGS_CONFIG,
          useValue: themeConfig
        },
        {
          provide: MENU_SETTINGS_CONFIG,
          useValue: menuConfig
        },
        {
          provide: ORGANISATION_MENU_CONFIG,
          useValue: orgMenu
        },
        {
          provide: STUDY_MENU_CONFIG,
          useValue: studyMenu
        }
      ]
    };
  }
}
