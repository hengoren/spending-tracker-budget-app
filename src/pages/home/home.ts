import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { BackandProvider } from '../../providers/backand/backand';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	transactions = []
  descending: boolean = false;
  order: number;
  date: String = 'createdAt'

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public backandService: BackandProvider) {
  	this.loadTransactions()
    console.log(this.transactions)
  }

  private loadTransactions() {
  	this.backandService.getTransactions()
  	.subscribe(
  		data => {
  			this.transactions = data.data
  		},
  		err => this.logError(err)
  		);
  };

  public transactionSelected(item: {}) {
    let prompt = this.alertCtrl.create({
      title: 'Edit Transaction & Transaction Details',
      message: "You paid " + item['recipient'] + " £" + item['amount'] + " for " + item['expense'],
      buttons: [
        {
          text: 'OK',
          handler: data => {
            console.log('Cancel clicked');
          }
        }
      ]
    })
    prompt.present()
  	console.log('selected item: ', item)
    // console.log('amount: £', item

  }

  public createTransaction() {
  	let prompt = this.alertCtrl.create({
  		title: 'New transaction',
  		message: "What did you buy?",
  		inputs: [
  			{
  				name: 'expense',
  				placeholder: 'Item'
  			},
  			{
  				name: 'description',
  				placeholder: 'Description'
  			},
  			{
  				name: 'recipient',
  				placeholder: 'Recipient'
  			},
  			{
  				name: 'amount',
  				placeholder: 'Enter amount in $'
  			},
        {
          name: 'category',
          placeholder: 'Select category (Luxury, Transportation, Groceries, Recreation, Food, Miscellaneous)'
        }
  		],
  		buttons: [
  			{
  				text: 'Cancel',
  				handler: data => {
  					console.log('Cancel clicked');
  				}
  			},
  			{
  				text:'Save',
  				handler: data => {
  					this.saveTransaction(data.expense, data.description, data.recipient, data.amount, data.category);
  				}
  			}
  		]
  	})
  	prompt.present()
  }

  public saveTransaction(expense: string, description: string, recipient: string, amount: number, category: string) {
    this.backandService.addTransaction(expense, description, recipient, amount, category).subscribe(
      data => {
        this.transactions.push(data);
      },
      err => this.logError(err)
    );
  }

  public removeTransaction(id: string) {
    this.backandService.removeTransaction(id).subscribe(
      data => {
        this.loadTransactions();
      },
      err => this.logError(err)
    );
  }
 
  public logError(err: TemplateStringsArray) {
    console.error('Error: ' + err);
  }

  ionViewDidLoad() {
    this.loadTransactions()
  }

  sort() {
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

}
