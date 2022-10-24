import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);       

    this._popupImage = this._popup.querySelector(".photo-grid__image_popup");
    this._popupImageDescription = this._popup.querySelector(
      ".photo-grid__place-name_popup"
    );
  }

  open({ link, name }) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageDescription.textContent = name;
  }
}
