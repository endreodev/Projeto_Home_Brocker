import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.css'
})
export class NavItemComponent { 
    @Input() link: string = '';
    @Input() icon: string = ''; // Pass the class for the svg icon
    @Input() title: string = '';
  }
