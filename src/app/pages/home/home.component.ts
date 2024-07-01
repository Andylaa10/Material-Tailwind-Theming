import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
  ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from '@angular/material/slide-toggle';
import { PeriodicElement } from '../../core/models/periodicElement.model';
import { ThemeService } from '../../core/services/helper/theme.service';

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
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatRipple,
    MatRow,
    MatRowDef,
    MatSlideToggle,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = ELEMENT_DATA;

  @HostBinding('class') className: string = '';
  @ViewChild('toggle') toggle!: MatSlideToggle;

  private _themeService: ThemeService = inject(ThemeService);

  ngAfterViewInit(): void {
    /**
     * It is wrap around setTimeout even though the timer is 0
     * Otherwise the dark theme wont load if it was the last preferred one
     */
    setTimeout(() => {
      if (this._themeService.$theme() === 'dark') {
        this.toggle.checked = true;
        this.className = 'dark';
      }
    }, 0);
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
