import { _decorator, Component, Node, instantiate, SpriteFrame, Prefab } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('Item')
export class Item {
    @property(String) typeElement : string = '';
    @property(SpriteFrame) icon: SpriteFrame | null = null;
}

@ccclass
export class ItemList extends Component {
    @property([Item]) items: Item[] = [];
    @property(Prefab) itemPrefab: Prefab | null = null;

    public getItems() : Item[] {
        return this.items;
    }

    public getPrefab() : Prefab | null {
        return this.itemPrefab;
    }
}