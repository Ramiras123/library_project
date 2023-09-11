import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { CardDiscription } from "../../components/card-descrition/card-description.js";

export class DescriptionView extends AbstractView {
  state = {
    id: null,
    card: [],
    loading: false,
  };
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle("Книжка");
  }
  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  async getCard() {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${this.state.id}`
    );
    return res.json();
  }
  async stateHook(path) {
    if (path === "id") {
      this.state.loading = true;
      const data = await this.getCard();
      this.state.card = data.docs[0];
      this.state.loading = false;
    }
    if (path === "loading") {
      this.render();
    }
  }
  getId() {
    this.state.id = location.hash.split("=")[1];
  }
  render() {
    this.getId();
    const main = document.createElement("div");
    main.append(new CardDiscription(this.appState, this.state.card, this.state).render());
    this.app.innerHTML = "";
    this.app.append(main);
    this.renderHeader();
  }
  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }

  destroy() {
    onChange.unsubscribe(this.state);
  }
}
