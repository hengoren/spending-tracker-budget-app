import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { BackandProvider } from '../../providers/backand/backand'

/**
 * Generated class for the EntryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class EntryPage {

	form: FormGroup
  transactions = []

	submitAttempt: boolean = false


  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public backandService: BackandProvider) {
    this.form = formBuilder.group({
      item: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      description: ['', Validators.required],
      recipient: ['', Validators.required],
      amount: ['', Validators.required],
      category: ['']
    })	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntryPage');
  }

  addTransaction() {

    this.submitAttempt = true

    if (!this.form.valid) {
      console.log("Error")
    }
    else {
      console.log("Success!")
      console.log(this.form.value)
      console.log(this.form.value.item)
      this.backandService.addTransaction(this.form.value.item, this.form.value.description, this.form.value.recipient, this.form.value.amount, this.form.value.category).subscribe(
      data => {
        this.transactions.push(data);
      },
      err => this.logError(err)
    );
    }

  }

  public logError(err: TemplateStringsArray) {
    console.error('Error: ' + err);
  }

}
