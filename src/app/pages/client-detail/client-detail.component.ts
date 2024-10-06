import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClientService } from '../../shared/services/client.service';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { IClient } from '../../shared/interfaces/client.interface';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { ICard } from '../../shared/interfaces/card.interface';
import { CardService } from '../../shared/services/card.service';
import { NgToastService } from 'ng-angular-popup';
import { InputTextModule } from 'primeng/inputtext';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import {
  addBonusCard,
  deleteBonusCard,
  editBonusCard,
  getBonusCards,
} from '../../store/action';
import { selectBonusCards } from '../../store/reducer';
import { BonusCardComponent } from '../../shared/components/bouns-card/bouns-card.component';

interface OptionsType {
  name: string;
}
@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    RadioButtonModule,
    MultiSelectModule,
    CardModule,
    InputTextModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    BonusCardComponent,
  ],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.scss',
})
export class ClientDetailComponent implements OnInit, OnDestroy {
  mySub$ = new Subject();
  cardForm!: FormGroup;
  bonusCards$: Observable<any> = this.store.select(selectBonusCards);
  activeId!: number;

  currentClient!: IClient;

  visible: boolean = false;
  currentUSerCards: any[] = [];

  types: OptionsType[] = [
    { name: 'Freespin' },
    { name: 'Freebet' },
    { name: 'Money' },
  ];
  currency: OptionsType[] = [{ name: 'USD' }, { name: 'GEL' }, { name: 'EUR' }];
  selectedCurrency!: OptionsType[];
  isEditing: boolean = false;
  cardToEdit: ICard | null = null;

  constructor(
    private activateRoute: ActivatedRoute,
    private clientService: ClientService,
    private router: Router,
    private fb: FormBuilder,
    private cardService: CardService,
    private NgToastService: NgToastService,
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCards();
    this.initForm();

    this.activeId = parseInt(this.activateRoute.snapshot.params['id'], 10);

    this.clientService
      .getCurrentClient(this.activeId)
      .pipe(takeUntil(this.mySub$))
      .subscribe((res: IClient) => (this.currentClient = res));
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

  initForm(): void {
    this.cardForm = this.fb.group({
      cardType: new FormControl('', Validators.required),
      currencies: new FormControl('', Validators.required),
      isActive: new FormControl(''),
    });
  }

  get cardType() {
    return this.cardForm.controls['cardType'];
  }
  get currencies() {
    return this.cardForm.controls['currencies'];
  }
  get isActive() {
    return this.cardForm.controls['isActive'];
  }

  getCards() {
    this.store.dispatch(getBonusCards.getBonusCardsAction());
  }
  showDialog(card?: ICard) {
    if (card) {
      this.isEditing = true;
      this.cardToEdit = card;

      this.cardForm.patchValue({
        cardType: card.cardType,
        currencies: card.currencies,
      });
    } else {
      this.cardForm.reset();
      this.isEditing = false;
      this.cardToEdit = null;
    }
    // this.visible = true;

    this.dialog.open(BonusCardComponent, {
      data: { currentClient: this.currentClient, card: card },
    });
  }

  onEdit(clientId: number | undefined) {
    this.router.navigate(['/edit-client', clientId]);
  }

  onSubmit(visible: boolean) {
    if (this.cardForm.invalid)
      return this.NgToastService.error({
        detail: 'Error Messege',
        summary: 'Please fill all needed fields.',
      });
    const formData = this.cardForm.value;
    console.log(this.isEditing);
    console.log(this.cardToEdit);

    if (!this.isEditing && this.cardToEdit) {
      const editedCard = {
        id: this.cardToEdit.id,
        userID: this.cardToEdit.userID,
        cardType: formData.cardType,
        currencies: formData.currencies,
        isActive: formData.isActive,
      };
      // this.cardService
      //   .editCard(editedCard)
      //   .pipe(takeUntil(this.mySub$))
      //   .subscribe(() => {
      //     this.NgToastService.success({
      //       detail: 'Success Messege',
      //       summary: 'Card was eddited successfully',
      //     });
      //     const index = this.currentUSerCards.findIndex(
      //       (card) => card.id === editedCard.id
      //     );
      //     if (index !== -1) {
      //       this.currentUSerCards[index] = editedCard;
      //     }
      //   });

      this.store.dispatch(
        editBonusCard.editBonusCardAction({ bonusCard: editedCard })
      );
    } else {
      const newCard = {
        userID: this.currentClient?.id,
        cardType: formData.cardType,
        currencies: formData.currencies,
        isActive: 'true',
      };
      // this.cardService
      //   .addCard(newCard)
      //   .pipe(takeUntil(this.mySub$))
      //   .subscribe((addedCard) => {
      //     if (!this.currentUSerCards.find((card) => card.id === addedCard.id)) {
      //       this.currentUSerCards.push(addedCard);
      //     }
      //     this.cardForm.reset();
      //     this.cardForm.markAllAsTouched();
      //   });
      // this.NgToastService.success({
      //   detail: 'Success Messege',
      //   summary: 'Card added successfully',
      // });

      this.store.dispatch(
        addBonusCard.addBonusCardAction({ bonusCard: newCard })
      );
    }
  }

  cancel(visible: boolean) {
    this.visible = visible;
    this.NgToastService.warning({
      detail: 'Error Messege',
      summary: 'Edit card was cancelled !',
    });
  }

  deleteCard(id: number) {
    this.store.dispatch(deleteBonusCard.deleteBonusCardAction({ id: id }));
  }
  ngOnDestroy(): void {
    this.mySub$.next(null), this.mySub$.complete();
  }
}
