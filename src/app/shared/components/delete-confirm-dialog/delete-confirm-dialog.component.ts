import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, concatMap, switchMap, takeUntil } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { deleteClient } from '../../../store/action';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrl: './delete-confirm-dialog.component.scss',
})
export class DeleteConfirmDialogComponent implements OnInit {
  destroyRef: DestroyRef = inject(DestroyRef);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  currentUserId!: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    private store: Store
  ) {}

  ngOnInit(): void {}

  onYesClick() {
    this.store.dispatch(deleteClient.deleteClientAction({ id: this.data.id }));
  }
}
