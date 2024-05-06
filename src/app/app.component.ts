import {
  AfterViewInit,
  Component,
  HostBinding,
  inject,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { ThemeService } from './core/services/theme.service';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { MatIcon } from '@angular/material/icon';
import {PeriodicElement} from "./core/models/periodicElement.model";

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButton, MatTableModule, MatSlideToggle, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = ELEMENT_DATA;

  @HostBinding('class') className: string = '';
  @ViewChild('toggle') toggle!: MatSlideToggle;

  private _themeService: ThemeService = inject(ThemeService);

  ngAfterViewInit(): void {
    if (this._themeService.$theme() === 'dark') {
      this.toggle.checked = true;
      this.className = 'dark';
    }
  }

  changeTheme($event: MatSlideToggleChange): void {
    if ($event.checked) {
      this._themeService.setTheme('dark');
      this.className = 'dark';
    } else {
      this._themeService.setTheme('');
      this.className = '';
    }
  }
}
