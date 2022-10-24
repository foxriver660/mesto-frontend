import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);       

    this._popupImage = this._popup.querySelector(".photo-grid__image_popup");
    this._popupImageDescription = this._popup.querySelector(
      ".photo-grid__place-name_popup"
    );
  }

  openPopup({ link, name }) {
    super.openPopup();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageDescription.textContent = name;
  }
}
