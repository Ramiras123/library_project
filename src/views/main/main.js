import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { Search } from "../../components/search/search.js";
import { CardList } from "../../components/card-list/card-list.js";
import { Footer } from "../../components/footer/footer.js";

export class MainView extends AbstractView {
  state = {
    list: [],
    loading: false,
    numFound: 0,
    searchQuery: undefined,
    offset: 0,
    numDisplay: 9,
  };
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle("Поиск книг");
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  async loadlist(q, offset) {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&offset=${offset}`
    );
    return res.json();
  }

  async stateHook(path) {
    if (path === "searchQuery" || path === "offset") {
      if (path === "searchQuery") {
        this.state.offset = 0;
      }
      this.state.loading = true;
      const data = await this.loadlist(
        this.state.searchQuery,
        this.state.offset
      );
      this.state.list = data.docs;
      this.state.numFound = await data.numFound;
      this.state.loading = false;
      console.log(data);
    }
    if (path === "loading") {
      this.render();
    }
    if (path === "list") {
      this.render();
    }
  }

  render() {
    const main = document.createElement("div");
    main.append(new Search(this.state).render());
    const searchLength = document.createElement("h1");
    searchLength.innerText = `Найденно книг - ${this.state.numFound}`;
    main.append(searchLength);
    main.append(new CardList(this.appState, this.state).render());
    this.app.innerHTML = ``;
    this.app.append(main);
    this.renderFooter();
    this.renderHeader();
  }
  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }

  renderFooter() {
    const footer = new Footer(this.state).render();
    this.app.append(footer);
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }
}
