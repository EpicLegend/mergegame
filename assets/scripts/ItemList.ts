import { _decorator, Component, Node, instantiate, SpriteFrame, Prefab } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('Item')
export class Item {
    @property(String) typeElement : string = '1';
    @property(SpriteFrame) icon: SpriteFrame | null = null;
    
}

@ccclass
export class ItemList extends Component {
    @property([Item]) items: Item[] = [];
    @property(Prefab) itemPrefab: Prefab | null = null;

    getItems() {
        return this.items;
    }

    getPrefab() {
        return this.itemPrefab;
    }
}