import { Component, Input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-components-card',
  standalone: true,
  imports: [MatCardModule, MatMenuModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input({
    alias: "card-title",
    required: false
  })
  public cardTitle: string = "Card Title"
}
