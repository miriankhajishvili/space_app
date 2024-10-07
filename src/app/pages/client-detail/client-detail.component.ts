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
    private NgToastService: NgToastService,
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCards();

    this.activeId = parseInt(this.activateRoute.snapshot.params['id'], 10);

    this.clientService
      .getCurrentClient(this.activeId)
      .pipe(takeUntil(this.mySub$))
      .subscribe((res: IClient) => {
        console.log(res);
        this.currentClient = res;
      });
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

  getCards() {
    this.store.dispatch(getBonusCards.getBonusCardsAction());
  }

  showDialog(card?: ICard) {
    console.log(card);
    if (card) {
      this.isEditing = true;
      this.cardToEdit = card;
    } else {
      this.isEditing = false;
      this.cardToEdit = null;
    }
    // this.visible = true;

    this.dialog.open(BonusCardComponent, {
      data: {
        currentClient: this.currentClient,
        card: card,
        isEditing: this.isEditing,
      },
    });
  }

  onEdit(clientId: number | undefined) {
    this.router.navigate(['/edit-client', clientId]);
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
