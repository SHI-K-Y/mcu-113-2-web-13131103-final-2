import { CommonModule } from '@angular/common';
import { Component, computed, input, model, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  standalone: true,
})
export class PaginationComponent {
  readonly totalCount = input.required<number, string | number>({ transform: numberAttribute });

  readonly pageSize = input.required<number, string | number>({ transform: numberAttribute });

  readonly pageIndex = model.required();

  readonly range = computed(() => {
    const length = Math.ceil(this.totalCount() / this.pageSize());
    return Array.from({ length }, (_, i) => i + 1);
  });
}
