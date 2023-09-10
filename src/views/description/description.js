import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";

export class DescriptionView extends AbstractView {
  state = {
    id: null,
    card: [],
    loading: false,
  };
  constructor(appState) {
    super();
    this.appState = appState;
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle("Книжка");
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
      console.log(data);
    }
  }
  getId() {
    this.state.id = location.hash.split("=")[1];
  }
  render() {
    this.getId();
    const main = document.createElement("div");
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
