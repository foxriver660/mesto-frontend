export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  renderItems() {
  //  return typeof(this._items) == Array
  //     ? this._items.forEach((item) => this._renderer(item))
  //     : this._renderer(this._items);

    this._items.forEach((item) => this._renderer(item));
  }
}
