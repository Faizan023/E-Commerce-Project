import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @ViewChild('sidebarButton') sidebarButton!: ElementRef;
  
  ngAfterViewInit() {
    if (this.sidebarButton) {
      this.sidebarButton.nativeElement.addEventListener('click', () => {
        document.body.classList.toggle('toggle-sidebar');
      });
    }
  }
}
