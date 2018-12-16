import {Component, OnInit} from '@angular/core';

import * as actions from '../pizza.actions';
import * as fromPizza from '../pizza.reducer';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';


@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.scss']
})
export class PizzaOrderComponent implements OnInit {

  pizza$: Observable<any>;

  constructor(private store: Store<fromPizza.State>) {
  }

  ngOnInit() {
    this.pizza$ = this.store.pipe(
      select(fromPizza.selectAll)
    );
  }

  createPizza() {
    const pizza: fromPizza.Pizza = {
      id: new Date().getUTCMilliseconds().toString(),
      size: 'small'
    };
    this.store.dispatch(new actions.Create(pizza));
  }

  udpatePizza(id: string, size: string) {
    this.store.dispatch(new actions.Update(id, {size}));
  }

  deletePizza(id: string) {
    this.store.dispatch(new actions.Delete(id));
  }

}
