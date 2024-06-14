import { Injectable,Input,Output,EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuSharedService {
  @Output() fire: EventEmitter<any> = new EventEmitter();
  @Output() perm: EventEmitter<any> = new EventEmitter();
  @Output() menu: EventEmitter<any> = new EventEmitter();
  permiss
  constructor() { }
  changeRole(role) {
    console.log('change started',role); 
     this.fire.emit(role);
   }
   changeMenu(menu) {
    console.log('menu started',menu); 
     this.menu.emit(menu)
   }
   
  getMenu() {
     return this.menu;
   }
  getRole() {
     return this.fire;
   }
   permissions(permissions) {
    console.log('perm started'); 
    this.permiss=permissions
     this.perm.emit(permissions);
   }

   getperm() {
     return this.perm;
   }
   getPermissions(){
     return this.permiss
   }
}
