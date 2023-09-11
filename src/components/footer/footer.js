import { DivComponent } from "../../common/div-component";
import "./footer.css";

export class Footer extends DivComponent {
  constructor(parentState) {
    super();
    this.parentState = parentState;
  }

  #isPrevActive() {
    if (this.parentState.offset && !this.parentState.loading) {
      return true;
    }
    return false;
  }

  #isNextActive() {
    if (
      this.parentState.numFound -
        this.parentState.offset -
        this.parentState.numDisplay >
        0 &&
      !this.parentState.loading
    ) {
      return true;
    }
    return false;
  }
  #prev() {
    if (this.parentState.offset) {
      this.parentState.offset -= this.parentState.numDisplay;
    }
  }

  #next() {
    if (
      this.parentState.numFound -
        this.parentState.offset -
        this.parentState.numDisplay >
      0
    ) {
      this.parentState.offset += this.parentState.numDisplay;
    }
  }
  render() {
    this.el.classList.add("footer");
    this.el.innerHTML = `
        <button class="prev button ${
          this.#isPrevActive() ? "active" : "inactive"
        }">
            <img src="/static/arrow_back.svg" alt="Arrow" />
            <div>
                Prev
            </div>
        </button>
        <button class="next button ${
          this.#isNextActive() ? "active" : "inactive"
        }">
            <div>
                Next
            </div>
            <img src="/static/arrow_next.svg" alt="Arrow" />
        </button>
    `;
    this.el
      .querySelector(".prev")
      .addEventListener("click", this.#prev.bind(this));
    this.el
      .querySelector(".next")
      .addEventListener("click", this.#next.bind(this));
    return this.el;
  }
}
