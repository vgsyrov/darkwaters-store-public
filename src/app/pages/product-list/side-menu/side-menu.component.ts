import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
  @Input()
  set categories(categories: string[]) {
    this.menuItems = categories.map((category: string) => {
      return <MenuItem>{
        label: category,
        command: () => {
          this.router.navigate([''], { queryParams: { category: category } });
        },
      };
    });
  }

  @Output()
  selectedCategory = new EventEmitter<string>();

  menuItems: MenuItem[] = [];

  constructor(private router: Router) {}
}
