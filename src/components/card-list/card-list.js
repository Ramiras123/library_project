import { DivComponent } from "../../common/div-component";
import "./card-list.css";

export class CardList extends DivComponent {
  constructor(appState, parentState) {
    super();
    this.appState = appState;
    this.parentState = parentState;
  }

  render() {
    if (this.parentState.loading) {
      this.el.classList.add("card_list__loading");
      this.el.innerHTML = `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

      return this.el;
    }
    this.el.classList.add("card_list");
    this.el.innerHTML = `<h1>Найденно книг - ${this.parentState.list.length}`;
    return this.el;
  }
}
