export function copyToClipboard(text: string) {
  const windowSelection = window.getSelection() as Selection;
  const documentSelection = window.getSelection() as Selection;

  //Store previously selected range of elements to restore it later
  let userSelectedTextRange: Range | undefined = undefined;
  if (userHasElementsSelected()) {
    userSelectedTextRange = documentSelection.getRangeAt(0);
    //remove the current selection
    windowSelection.removeRange(userSelectedTextRange);
  }

  //Append an HTML Element with the text you want to copy to the body and select it
  const textContainerElement = createTextContainerElement(text);
  document.body.appendChild(textContainerElement);
  const copyRange: Range = selectElement(textContainerElement);

  copyCurrentSelection();

  //remove the selection range (Chrome throws a warning if we don't.) and HTML element
  windowSelection.removeRange(copyRange);
  document.body.removeChild(textContainerElement);

  //re-select what the user had previously selected
  if (userSelectedTextRange) {
    windowSelection.addRange(userSelectedTextRange);
  }
}

function userHasElementsSelected(): boolean {
  const selection = document.getSelection();
  if (selection == null) {
    return false;
  }
  return selection?.rangeCount > 0;
}

function createTextContainerElement(text: string): HTMLElement {
  const textContainerElement: HTMLElement = document.createElement('div');
  textContainerElement.innerHTML = text;
  const strippedText: string = textContainerElement.textContent as string;
  textContainerElement.innerHTML = strippedText
    .replaceAll('>', '<br>> ')
    .slice('<br>'.length);

  //set the position to be absolute and off the screen
  textContainerElement.style.position = 'absolute';
  textContainerElement.style.left = '-9999px';
  return textContainerElement;
}

function selectElement(element: HTMLElement): Range {
  const selectedRange: Range = document.createRange();
  selectedRange.selectNode(element);
  window.getSelection()?.addRange(selectedRange);
  return selectedRange;
}

function copyCurrentSelection(): void {
  try {
    document.execCommand('copy');
  } catch (err) {
    window.alert("Your Browser Doesn't support this! Error : " + err);
  }
}
