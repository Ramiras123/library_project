import { DescriptionView } from "./views/description/description";
import { FavoritesView } from "./views/favorites/favorites";
import { MainView } from "./views/main/main";

class App {
  routes = [
    { path: "", view: MainView },
    { path: "#favorites", view: FavoritesView },
    { path: "#card", view: DescriptionView },
  ];
  appState = {
    favorites: [],
  };
  constructor() {
    window.addEventListener("hashchange", this.route.bind(this));
    this.route();
  }
  route() {
    if (this.currentView) {
      this.currentView.destroy();
    }
    const hash = location.hash;
    const view = this.routes.find((r) => {
      if (r.path === "#card") {
        const params = new URLSearchParams(hash.split("?")[1]);
        return hash.includes(r.path) && params.has("id");
      } else {
        return r.path == hash;
      }
    }).view;
    this.currentView = new view(this.appState);
    this.currentView.render();
  }
}

new App();
