import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { ICard } from '../../interfaces/card.interface';
import { CardService } from '../../services/card.service';
import { Store } from '@ngrx/store';
import { addBonusCard } from '../../../store/action';

@Component({
  selector: 'app-bonus-card',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './bonus-card.component.html',
  styleUrl: './bonus-card.component.scss',
})
export class BonusCardComponent implements OnInit {
  visible: boolean = false;

  mySub$ = new Subject();
  cardForm!: FormGroup;
  readonly dialogRef = inject(MatDialogRef<any>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  bonusType: string = 'freespin'; // default value
  currentUSerCards: any[] = [];
  isEditing: boolean = false;
  cardToEdit: ICard | null = null;
  currency: any[] = [{ name: 'USD' }, { name: 'GEL' }, { name: 'EUR' }];
  showCurrency = false; // Control to show/hide the currency field

  constructor(
    private fb: FormBuilder,
    private cardService: CardService,
    private NgToastService: NgToastService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.store.select;
  }

  getImageSource(cardType: string) {
    const basePath = 'assets/images/';
    const cardTypeImages: { [key: string]: string } = {
      Freespin: 'freeSpin.jpg',
      Freebet: 'freeBet.jpg',
      Money: 'money.jpg',
    };

    return basePath + (cardTypeImages[cardType] || 'default.jpg');
  }

  onSubmit() {
    if (this.cardForm.invalid)
      return this.NgToastService.error({
        detail: 'Error Messege',
        summary: 'Please fill all needed fields.',
      });

    const formData = this.cardForm.value;

    if (this.isEditing && this.cardToEdit) {
      const editedCard = {
        id: this.cardToEdit.id,
        userID: this.cardToEdit.userID,
        cardType: formData.cardType,
        currencies: formData.currencies,
        isActive: formData.isActive,
      };
      this.cardService
        .editCard(editedCard)
        .pipe(takeUntil(this.mySub$))
        .subscribe(() => {
          this.NgToastService.success({
            detail: 'Success Messege',
            summary: 'Card was eddited successfully',
          });
          const index = this.currentUSerCards.findIndex(
            (card) => card.id === editedCard.id
          );
          if (index !== -1) {
            this.currentUSerCards[index] = editedCard;
          }
        });
    } else {
      const newCard = {
        userID: this.data.currentClient?.id,
        cardType: formData.cardType,
        currencies: formData.currencies,
        quantity: formData.quantity,
      
      };
      console.log()
      this.store.dispatch(addBonusCard.addBonusCardAction({ bonusCard: newCard }));
    }
  }

  initForm(): void {
    this.cardForm = this.fb.group({
      cardType: new FormControl('', Validators.required),
      currencies: new FormControl('', Validators.required),
      quantity: new FormControl(''),
    });
  }

  onCardTypeChange(value: string) {
    this.showCurrency = value === 'Money';

    if (this.showCurrency) {
      this.cardForm.get('currencies')?.setValidators([Validators.required]);
    } else {
      this.cardForm.get('currencies')?.clearValidators();
    }
    this.cardForm.get('currencies')?.updateValueAndValidity();
  }

  onNoClick(): void {
    this.NgToastService.warning({
      detail: 'Error Messege',
      summary: 'Edit card was cancelled !',
    });
    this.dialogRef.close();
  }
}
