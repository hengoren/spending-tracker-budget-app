import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { EntryPage } from '../entry/entry';
import { BudgetPage } from '../budget/budget';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EntryPage;
  tab3Root = BudgetPage;

  constructor() {

  }
}
