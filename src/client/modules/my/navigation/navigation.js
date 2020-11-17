import { LightningElement, api, track } from 'lwc';

const NAV_BAR_ITEM_SELECTOR = '.nav-bar .item',
    CLASS_FOCUS = 'focus';

class MarauderNavigationItem {
    element;

    constructor(i) {
        this.element = i;
    }

    focus() {
        this.element.classList.add(CLASS_FOCUS);
    }

    blur() {
        this.element.classList.remove(CLASS_FOCUS);
    }
}

class MarauderNavigation {
    elementArray = [];
    selectedIndex;

    constructor() {}

    hasElements() {
        return this.elementArray.length > 0;
    }

    addElements(items) {
        for (const i of items) {
            this.addElement(i);
        }
        return this;
    }

    addElement(i) {
        this.elementArray.push(new MarauderNavigationItem(i));
        return this;
    }

    selectFirst() {
        if (this.hasElements()) {
            this.selectByIndex(0);
        }
    }

    selectByIndex(index) {
        this.deselectAll();
        this.selectedIndex = index;
        this.elementArray[index].focus();
    }

    deselectAll() {
        for (let item of this.elementArray) {
            item.blur();
        }
    }
    hasNext() {
        return this.selectedIndex + 1 < this.elementArray.length;
    }

    hasPrev() {
        return this.selectedIndex - 1 > -1;
    }

    next() {
        if (this.hasNext()) {
            this.selectByIndex(++this.selectedIndex);
        }
    }

    prev() {
        if (this.hasPrev()) {
            this.selectByIndex(--this.selectedIndex);
        }
    }
}

export default class Navigation extends LightningElement {
    @track ready = false;
    @track navigation = new MarauderNavigation();

    renderedCallback() {
        if (!this.ready) {
            const items = this.template.querySelectorAll(NAV_BAR_ITEM_SELECTOR); // Select First Item
            if (items) {
                this.navigation.addElements(items).selectFirst();
                this.ready = true;
            }
        }
    }

    /**
     * UI Accessors
     */

    get navigationItems() {
        return this.template.querySelectorAll(NAV_BAR_ITEM_SELECTOR);
    }

    /**
     * Event Accessors
     */

    @api
    keyPressed(key) {
        switch (key) {
            case 'ArrowRight':
                this.navigation.next();
                break;
            case 'ArrowLeft':
                this.navigation.prev();
                break;
            default:
                break;
        }
    }
}
