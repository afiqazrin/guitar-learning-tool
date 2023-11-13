import { createElement } from "./createElement";

const guitarChords = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'Em', 'Am', 'Dm'];

export var buttonList = [];
function populateChordList() {
    for(let i = 0; i < guitarChords.length; i++){
        let chordButton = createElement("button", "grid-item", guitarChords[i])
        buttonList.push(chordButton)
    }
    return buttonList
}
export {guitarChords, populateChordList}