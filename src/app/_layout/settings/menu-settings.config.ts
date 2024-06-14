// Default menu settings configurations

export interface MenuItem {
  title: string;
  icon: string;
  page: string;
  isExternalLink?: boolean;
  issupportExternalLink?: boolean;
  badge: { type: string, value: string };
  disabled?:boolean;
  hide?:boolean;
  submenu: {
    items: Partial<MenuItem>[];
  };
  section: string;
  deepChild?:Array<string>
}


export interface MenuConfig {
  horizontal_menu: {
    items: Partial<MenuItem>[]
  };
  vertical_menu: {
    items: Partial<MenuItem>[]
  };
}

export const MenuSettingsConfig: MenuConfig = {
  horizontal_menu: {
    items: [
      {
        title: 'Home',
        icon: 'la-home',
        page: '/master/dashboard',
      },
      {
        title: 'Manage Organisation',
        icon: 'la-sitemap',
        page: '/master/manageOrganisation',
      },
      {
        title: 'Manage Users',
        icon: 'la-user',
        page: '/master/manageUsers',
      },
      {
        title: 'Manage Library',
        icon: 'la-globe',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Country',
              icon: 'la-flag',
              page: '/master/manageLibrary/manageCountry'
            },
            {
              title: 'State',
              icon: 'la-map',
              page: '/master/manageLibrary/manageState'
            },
            {
              title: 'City',
              icon: 'la-map-marker',
              page: '/master/manageLibrary/manageCity'
            },
            {
              title: 'Controller Vocabulary',
              icon: 'la-user',
              page: '/master/manageLibrary/manageController'
            },
          ]
        }
      },
      {
        title: 'Settings',
        icon: 'la-cog',
        page: '/master/configure-settings',
      },
      {
        title: 'Change Menu View',
        icon: 'la-television',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Horizontal',
              page: 'null'
            },
            {
              title: 'Vertical',
              page: 'null'
            },
          ]
        }
      },
      {
        title: 'Audit Trail',
        icon: 'la-text-height',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'System Audit Trail',
              icon: 'la-flag',
              page: '/master/auditTrail/systemTrail'
            },
            {
              title: 'Login Audit Trail',
              icon: 'la-map',
              page: '/master/auditTrail/loginTrail'
            }
          ]
        },
      }
    ]
  },
  vertical_menu: 
  {
    items: [
      {
        title: 'Home',
        icon: 'la-home',
        page: '/master/dashboard',
      },
      {
        title: 'Manage Organisation',
        icon: 'la-sitemap',
        page: '/master/manageOrganisation',
      },
      {
        title: 'Manage Users',
        icon: 'la-user',
        page: '/master/manageUsers',
      },
      {
        title: 'Manage Library',
        icon: 'la-globe',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Country',
              icon: 'la-flag',
              page: '/master/manageLibrary/manageCountry'
            },
            {
              title: 'State',
              icon: 'la-map',
              page: '/master/manageLibrary/manageState'
            },
            {
              title: 'City',
              icon: 'la-map-marker',
              page: '/master/manageLibrary/manageCity'
            },
            {
              title: 'Controller Vocabulary',
              icon: 'la-user',
              page: '/master/manageLibrary/manageController'
            },
          ]
        }
      },
      {
        title: 'Settings',
        icon: 'la-cog',
        page: '/master/configure-settings',
      },
      {
        title: 'Change Menu View',
        icon: 'la-television',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Horizontal',
              page: 'null'
            },
            {
              title: 'Vertical',
              page: 'null'
            },
          ]
        }
      },
      {
        title: 'Audit Trail',
        icon: 'la-text-height',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'System Audit Trail',
              icon: 'la-flag',
              page: '/master/auditTrail/systemTrail'
            },
            {
              title: 'Login Audit Trail',
              icon: 'la-map',
              page: '/master/auditTrail/loginTrail'
            }
          ]
        },
      }
    ]
  }

};
export const OrganisationMenuConfig: MenuConfig = {
  horizontal_menu: {
    items: [
      {
        title: 'Home',
        icon: 'la-home',
        page: '/organisation/dashboard',
      },
      {
        title: 'Studies and Roles',
        icon: 'la-server',
        page: '/studiesAndRoles',
      },
      {
        title: 'Manage Users',
        icon: 'la-user',
        page: '/organisation/manageUsers',
      },
      {
        title: 'Manage Depot',
        icon: 'la-newspaper-o',
        page: '/organisation/manageDepot',
      },
      {
        title: 'Manage Site',
        icon: 'la-sitemap',
        page: '/organisation/manageSite',
      },
      {
        title: 'Drug Pooling',
        icon: 'la-files-o',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Manage Kits',
              icon: 'la-map',
              page: '/organisation/drugPooling/manageKits'
            },
            {
              title: 'Inventory',
              icon: 'la-map-marker',
              page: '/organisation/drugPooling/inventory'
            },
            {
              title: 'View Kit Lists',
              icon: 'la-user',
              page: '/organisation/drugPooling/kitLists'
            },
          ]
        }
      },
      {
        title: 'Audit Trail',
        icon: 'la-text-height',
        page: '/organisation/auditTrail',
      }
    ]
  },
  vertical_menu: 
  {
    items: [
      {
        title: 'Home',
        icon: 'la-home',
        page: '/organisation/dashboard',
      },
      {
        title: 'Studies and Roles',
        icon: 'la-server',
        page: '/studiesAndRoles',
      },
      {
        title: 'Manage Users',
        icon: 'la-user',
        page: '/organisation/manageUsers',
      },
      {
        title: 'Manage Library',
        icon: 'la-globe',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Country',
              icon: 'la-flag',
              page: '/organisation/manageLibrary/manageCountry'
            },
            {
              title: 'State',
              icon: 'la-map',
              page: '/organisation/manageLibrary/manageState'
            },
            {
              title: 'City',
              icon: 'la-map-marker',
              page: '/organisation/manageLibrary/manageCity'
            },
            {
              title: 'Controller Vocabulary',
              icon: 'la-user',
              page: '/organisation/manageLibrary/manageController'
            },
          ]
        }
      },
      {
        title: 'Manage Depot',
        icon: 'la-newspaper-o',
        page: '/organisation/manageDepot',
      },
      {
        title: 'Manage Site',
        icon: 'la-sitemap',
        page: '/organisation/manageSite',
      },
      {
        title: 'Drug Pooling',
        icon: 'la-files-o',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Manage Kits',
              icon: 'la-map',
              page: '/organisation/drugPooling/manageKits',
              
            },
            {
              title: 'Inventory',
              icon: 'la-map-marker',
              page: '/organisation/drugPooling/inventory'
            },
            {
              title: 'View Kit Lists',
              icon: 'la-user',
              page: '/organisation/drugPooling/kitLists'
            },
          ]
        }
      },
      {
        title: 'Audit Trail',
        icon: 'la-text-height',
        page: '/organisation/auditTrail',
      }
    ]
  }

};
export const StudyMenuConfig: MenuConfig = {
  horizontal_menu: {
    items: [
      {
        title: 'Study Management',
        icon: 'la-hospital-o',
        page: 'null',
        submenu: {
          items: [
            {
              title: 'Studies and Roles',
              icon: 'la-server',
              page: '/studiesAndRoles',
              hide:false,
              disabled:false
            },
            {
              title: 'Dashboard',
              icon: 'la-home',
              page: '/study/dashboard',
              hide:false,
              disabled:false
            },
            {
              title: 'Study Details',
              icon: 'la-user',
              page: '/study/studyDetails',
              hide:false,
              disabled:false
            },
            {
              title: 'Manage Roles',
              icon: 'la-newspaper-o',
              page: '/study/manageRoles',
              hide:false,
              disabled:false
            },
            {
              title: 'Manage Cohort',
              icon: 'la-sitemap',
              page: '/study/manageCohort',
              hide:false,
              disabled:false
            },
            {
              title: 'Manage Treatments',
              icon: 'la-sitemap',
              page: '/study/manageTreatments',
              hide:false,
              disabled:false
            },
            {
              title: 'Manage Kit Types',
              icon: 'la-sitemap',
              page: '/study/manageKitTypes',
              hide:false,
              disabled:false
            },
            {
              title: 'Randomization',
              icon: 'la-sitemap',
              page: '/study/t&kSetup',
              hide:false,
              disabled:false
            },
            {
              title: 'Study Settings',
              icon: 'la-sitemap',
              page: '/study/studySettings',
              hide:false,
              disabled:false
            },
            {
              title: 'Depot Management',
              icon: 'la-sitemap',
              page: '/study/depotManagement',
              hide:false,
              disabled:false
            },
            {
              title: 'Site Management',
              icon: 'la-sitemap',
              page: '/study/siteManagement',
              hide:false,
              disabled:false
            },
            {
              title: 'Manage Users',
              icon: 'la-sitemap',
              page: '/study/manageUsers',
              hide:false,
              disabled:false
            },
          ]
        }
      },
      {
        title: 'Subjects',
        icon: 'la-wheelchair',
        page: '/study/subjects',
      },
      {
        title: 'Supplies',
        icon: 'la-truck',
        page: '/study/supplies',
      },
      {
        title: 'Data Changes',
        icon: 'la-edit',
        page: '/study/dataChanges',
      },
      {
        title: 'Reports',
        icon: 'la-bar-chart',
        page: '/study/reports',
      },
      {
        title: 'Audit Trail',
        icon: 'la-text-height',
        page: '/study/auditTrail',
      }
    ]
  },
  vertical_menu: {
    items: [
      {
        title: 'Studies and Roles',
        icon: 'la-server',
        page: '/studiesAndRoles',
        hide:false,
        deepChild:['/study/studyDetails','/study/addOrEditStudy']
      },
      {
        title: 'Dashboard',
        icon: 'la-home',
        page: '/study/dashboard',
        hide:false
      },
      {
        title: 'Study Management',
        icon: 'la-hospital-o',
        page: 'null',
        hide:false,
        submenu: {
          items: [
            {
              title: 'Manage Roles',
              icon: 'la-newspaper-o',
              page: '/study/manageRoles',
                 hide:false,
              disabled:false,
              deepChild:['/study/manageRoles/addOrEditRole']
            },
            {
              title: 'Manage Cohort',
              icon: 'la-sitemap',
              page: '/study/manageCohort',
                 hide:false,
              disabled:false,
            },
            {
              title: 'Manage Treatments',
              icon: 'la-sitemap',
              page: '/study/manageTreatments',
                 hide:false,
              disabled:false,
              deepChild:['/study/manageTreatments/addOrEditTreatment']
            },
            {
              title: 'Manage Kit Types',
              icon: 'la-sitemap',
              page: '/study/manageKitTypes',
                 hide:false,
              disabled:false,
              deepChild:['/study/manageKitTypes/addOrEditKitType']

            },
            {
              title: 'Manage Visit',
              icon: 'la-sitemap',
              page: '/study/manageVisit',
                 hide:false,
              disabled:false,
              deepChild:['/study/manageVisit/visitConfig','/study/manageVisit/scheduleVisits']

            },
            {
              title: 'Randomization',
              icon: 'la-sitemap',
              page: '/study/randomization',
                 hide:false,
              disabled:false,
              deepChild:['/study/randomization/listDetails']
            },
            {
              title: 'Subject Settings',
              icon: 'la-sitemap',
              page: '/study/subjectSettings',
                 hide:false,
              disabled:false
            },
            {
              title: 'Stratification',
              icon: 'la-sitemap',
              page: '/study/stratification',
                 hide:false,
              disabled:false
            },
            {
              title: 'Depot Management',
              icon: 'la-sitemap',
              page: '/study/depotManagement',
                 hide:false,
              disabled:false,
              deepChild:['/study/manageDepot/addOrEditDepot','/study/manageDepot/depotStatus']
            },
            {
              title: 'Site Management',
              icon: 'la-sitemap',
              page: '/study/siteManagement',
                 hide:false,
              disabled:false,
              deepChild:['/study/manageSite/addOrEditSite','/study/manageSite/siteStatus','/study/manageSite/siteConfiguration','/study/manageSite/siteConfiguration/addUpdateConfiguration']

            },
            {
              title: 'Assign Users',
              icon: 'la-sitemap',
              page: '/study/manageUsers',
                 hide:false,
              disabled:false,
              deepChild:['/study/manageUsers/addOrEditUser']
            },
          ]
        },
      },
      {
        title: 'Subjects',
        icon: 'la-wheelchair',
        page: '/study/subjects',
        hide:false
      },
      {
        title: 'Supplies',
        icon: 'la-truck',
        page: 'null',
        hide:false,
        submenu: {
          items: [
            {
              title: 'Settings',
              icon: 'la-newspaper-o',
              page: '/supply/settings',
              hide:false,
              disabled:false,
              deepChild:['/study/manageRoles/addOrEditRole']
            },
            {
              title: 'Request Orders',
              icon: 'la-sitemap',
              page: '/supply/requestOrders',
                 hide:false,
              disabled:false,
            },
            {
              title: 'Transact Orders',
              icon: 'la-sitemap',
              page: '/supply/transactOrders',
                 hide:false,
              disabled:false,
              deepChild:['/study/manageTreatments/addOrEditTreatment']
            },
            {
              title: 'Admit Orders',
              icon: 'la-sitemap',
              page: '/supply/admitOrders',
                 hide:false,
              disabled:false,
              deepChild:['/study/manageKitTypes/addOrEditKitType']

            },
            {
              title: 'Update Kit Details',
              icon: 'la-sitemap',
              page: '/supply/kitDetails',
                 hide:false,
              disabled:false,
              deepChild:['/study/manageVisit/visitConfig','/study/manageVisit/scheduleVisits']

            },
            {
              title: 'Accountability',
              icon: 'la-sitemap',
              page: '/supply/accountability',
                 hide:false,
              disabled:false,
              deepChild:['/study/randomization/listDetails']
            }
          ]
        }
      },
      {
        title: 'Data Changes',
        icon: 'la-edit',
        page: '/study/dataChanges',
        hide:false
      },
      {
        title: 'Reports',
        icon: 'la-bar-chart',
        page: '/study/reports',
        hide:false
      },
      {
        title: 'Audit Trail',
        icon: 'la-text-height',
        page: '/study/auditTrail',
        hide:false
      }
    ]
  }
  

};





