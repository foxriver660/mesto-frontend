import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector, _popup);
    this._popupImage = super._popup.querySelector(".photo-grid__image_popup");
    this._popupImageDescription = super._popup.querySelector(
      ".photo-grid__place-name_popup"
    );
  }

  openPopup({link, name}) {
    super.openPopup();
    this._popupImage.src = link;
    this._popupImageDescription.textContent = name;
  }
}
