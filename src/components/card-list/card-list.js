import { DivComponent } from "../../common/div-component";
import { Card } from "../card/card";
import { Footer } from "../footer/footer";
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
    const cardGrid = document.createElement("div");
    cardGrid.classList.add("card_grid");
    const maxDisplay = this.parentState.numDisplay;
    let currentDisplay = 0;
    for (const card of this.parentState.list) {
      if (maxDisplay === currentDisplay) {
        break;
      }
      cardGrid.append(new Card(this.appState, card).render());
      currentDisplay++;
    }
    this.el.append(cardGrid);
    return this.el;
  }
}
