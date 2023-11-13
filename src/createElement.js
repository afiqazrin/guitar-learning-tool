function createElement(elemName, elemClass, elemContent) {
    let element = document.createElement(`${elemName}`)
    element.className = `${elemClass}`
    element.innerHTML = `${elemContent}`
    return element
}

export {createElement}