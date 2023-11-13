import { createElement } from "./createElement";

const guitarChords = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export var buttonList = [];
function createButtons() {
    for(let i = 0; i < guitarChords.length; i++){
        let chordButton = createElement("button", "grid-item", guitarChords[i])
        buttonList.push(chordButton)
    }
    return buttonList
}
export {createButtons}