import { _decorator, Component, Node, CCInteger, Prefab, instantiate, EventTouch, Vec3, RigidBody2D, SpriteFrame, UITransform  } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MapManager')
export class MapManager extends Component {

    @property(Prefab) cellPrefab: Prefab | null = null;
    @property(CCInteger) countCellX : number  = 3;
    @property(CCInteger) countCellY : number  = 2;
    @property(CCInteger) countElementInMap : number = 3;

    start() {
        this.getComponent('cc.Layout').constraintNum = this.countCellX;
        this.generationMap();
    }

    private generationMap() {

        let countElements : number = this.getCountCell();

        const items : Item[] = this.node.getComponent('ItemList').getItems();
        const countItems : Number = items.length;
        const ItemPrefab : Prefab = this.node.getComponent('ItemList').getPrefab();

        for(let i = 0; i < countElements; i++) {

            const item = instantiate( this.cellPrefab );
            if ( i < countItems ) {
                let innerItem : any;
                innerItem = instantiate( ItemPrefab );
                const data = items[i];
                innerItem.getComponent('ItemTemplate').init(data);

                item.addChild( innerItem );
            }

            // item.indexX = i;
            
            this.node.addChild( item );
        }

    }

    public getCountCell() : number {
        return this.countCellX * this.countCellY;
    }

   
}

