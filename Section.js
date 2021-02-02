class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        this.renderItems();
    }

    addItem(element) { // отрисовывает элементы
        this._container.prepend(element);
    }


    renderItems() { // принимает dom-элемент и добовляет в контейнер

        this._renderedItems.forEach(item => {
            this.addItem(this._renderer(item));
        })
}
}

export {Section};