export class OnlyNumbers {

  private readonly _inputElements = document.querySelectorAll<HTMLElement>('.js-input-num');

  static check(event: KeyboardEvent): void {
    if (
      !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key) &&
      Number.isNaN(Number(event.key))
    ) {
      event.preventDefault();
    }
  }

  public init(): void {
    for (let i = 0, l = this._inputElements.length; i < l; i++) {
      this._inputElements[i].addEventListener('keypress', OnlyNumbers.check);
    }
  }

}
