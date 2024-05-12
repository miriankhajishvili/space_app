import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { ClientService } from '../../shared/services/client.service';
import { Observable, tap } from 'rxjs';
import { IClient } from '../../shared/interfaces/client.interface';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { ICard } from '../../shared/interfaces/card.interface';
import { CardService } from '../../shared/services/card.service';
import { NgToastService } from 'ng-angular-popup';

interface CardTypes {
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
  ],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.scss',
})
export class ClientDetailComponent implements OnInit {
  cardForm!: FormGroup;

  activeId!: number;

  currentClient!: IClient;

  visible: boolean = false;
  currentUSerCards: any[] = [];

  types: CardTypes[] = [];
  currency: CardTypes[] = [];
  selectedCurrency!: CardTypes[];
  isEditing: boolean = false;
  cardToEdit: ICard | null = null;

  constructor(
    private activateRoute: ActivatedRoute,
    private clientService: ClientService,
    private router: Router,
    private fb: FormBuilder,
    private cardService: CardService,
    private NgToastService: NgToastService
  ) {}

  ngOnInit(): void {
    this.getCards();
    this.initForm();

    this.activeId = parseInt(this.activateRoute.snapshot.params['id'], 10);

    this.clientService
      .getCurrentClient(this.activeId)
      .subscribe((res: IClient) => (this.currentClient = res));

    this.types = [
      { name: 'მიმდინარე' },
      { name: 'შემნახველი' },
      { name: 'დაგროვებითი' },
    ];

    this.currency = [{ name: 'USD' }, { name: 'GEL' }, { name: 'EUR' }];
  }
  getImageSource(cardType: string) {
    const basePath = 'assets/images/';

    if (cardType === 'მიმდინარე') {
      return basePath + '1.png';
    } else if (cardType === 'შემნახველი') {
      return basePath + '2.png';
    } else if (cardType === 'დაგროვებითი') {
      return basePath + '3.png';
    } else {
      return basePath + 'default.jpg';
    }
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
    const activeId = this.activateRoute.snapshot.params['id'];
    this.cardService.getCards().subscribe((res) => {
      res.forEach((eachCard: ICard) => {
        if (eachCard.userID === activeId) {
          this.currentUSerCards.push(eachCard);
        }
      });
    });
  }
  showDialog(card?: ICard) {
    console.log(this.cardType);
    if (card) {
      this.isEditing = true;
      this.cardToEdit = card;

      this.cardForm.patchValue({
        cardType: card.cardType,
        currencies: card.currencies,
        isActive: card.isActive,
      });
    } else {
      this.cardForm.reset();
      this.isEditing = false;
      this.cardToEdit = null;
    }
    this.visible = true;
  }

  onEdit(clientId: number | undefined) {
    this.router.navigate(['/edit-client', clientId]);
  }

  onSubmit(visible: boolean) {
    console.log(this.cardType);

    if (this.cardForm.invalid)
      return this.NgToastService.error({
        detail: 'Error Messege',
        summary: 'Please fill all needed fields.',
      });
    this.visible = visible;
    const formData = this.cardForm.value;

    if (this.isEditing && this.cardToEdit) {
      const editedCard = {
        id: this.cardToEdit.id,
        userID: this.cardToEdit.userID,
        cardType: formData.cardType,
        currencies: formData.currencies,
        isActive: formData.isActive,
      };
      this.cardService.editCard(editedCard).subscribe(() => {
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
        userID: this.currentClient?.id,
        cardType: formData.cardType,
        currencies: formData.currencies,
        isActive: 'true',
      };
      this.cardService.addCard(newCard).subscribe((addedCard) => {
        if (!this.currentUSerCards.find((card) => card.id === addedCard.id)) {
          this.currentUSerCards.push(addedCard);
        }
        this.cardForm.reset();
        this.cardForm.markAllAsTouched();
      });
      this.NgToastService.success({
        detail: 'Success Messege',
        summary: 'Card added successfully',
      });
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
    this.cardService.deleteCard(id).subscribe(() => {
      this.NgToastService.success({
        detail: 'Success Messege',
        summary: 'Card deleted successfully',
      });
      this.currentUSerCards = this.currentUSerCards.filter(
        (card) => card.id !== id
      );
    });
  }
}
