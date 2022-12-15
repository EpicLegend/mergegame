import { _decorator, Component, Sprite, Label, CCInteger,BoxCollider2D, Collider2D, Contact2DType, IPhysics2DContact, Prefab, instantiate, EventTouch, Node, Vec3, Widget } from 'cc';
const { ccclass, property } = _decorator;

interface TypeMove {
    default : number,
    empty : number,
    fullDifferent : number,
    full : number
}

@ccclass('ItemTemplate')
export class ItemTemplate extends Component {
    @property(String) public typeElement : String = '';
    @property(Sprite) public icon: Sprite | null = null;

    private oldPosition : Vec3 | null = null;
    private oldParent : Node | null = null;

    private currentTypeMove : number = 0;
    private typeMove : TypeMove = {
        default : 0,
        empty: 1,
        fullDifferent: 2,
        full: 3
    };
    private targetNode : Node | null = null;

    start() {
        
        this.node.on(Node.EventType.TOUCH_START, (event : EventTouch) => {
            this.oldPosition = this.node.getPosition();
            this.oldParent = this.node.parent;
            this.node.parent = this.node.parent.parent.parent;
        });
        this.node.on(Node.EventType.TOUCH_MOVE, (event : EventTouch) => {
            console.log("TOUCH_MOVE");
            let pos = event.getLocation();
            this.node.setWorldPosition( new Vec3(pos.x, pos.y, 0) );
        })

        this.node.on(Node.EventType.TOUCH_END, (event : EventTouch)=> {
            switch ( this.currentTypeMove ) {
                case 0:
                    this.node.parent = this.oldParent;
                    break;
                case 1:
                    this.node.parent = this.targetNode;
                    break;
                case 2:
                    // this.node.parent = this.targetNode;
                    // const count : number = this.node.parent.children[0].children.length;
                    // let index : number | null = null;

                    // // Поиск индекса свободной ячейки
                    // for(let i = 0; i < count; i++) {
                    //     if ( this.node.parent.children[0].children[i].children.length ) {
                            
                    //         index = i;
                    //         break;
                    //     }
                    // }
                    break;
                case 3:
                    
                    break;
            
                default:
                    break;
            }

            
            this.node.setPosition( this.oldPosition );
        })

         let collider = this.getComponent(BoxCollider2D);
         if (collider) {
             collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
             collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
             collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
             collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
         }
    }

    init(data: Item) {
        this.typeElement = data.typeElement;
        this.icon.spriteFrame = data.icon;
    }

    onBeginContact (selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {

        // Мы над ячейкой
        if(otherCollider.node.parent) {
            if( otherCollider.node.name == 'Cell' || otherCollider.node.parent.name == 'Cell') {
                // кол-во предметов в ячейке
                let countChildren : number = otherCollider.node.name == 'Cell' ? otherCollider.node.children.length : otherCollider.node.parent.children.length;
    
                // Ячейка не пуста
                if ( countChildren ) {
                    this.currentTypeMove = this.typeMove.fullDifferent;
                    this.targetNode = otherCollider.node;
                }
                // Ячейка пуста
                else {
                    this.currentTypeMove = this.typeMove.empty;
                    this.targetNode = otherCollider.node;
                }
            } else {
                this.currentTypeMove = this.typeMove.default;
            }
        }
    }
    onEndContact (selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if(otherCollider.node.parent) {
            if( otherCollider.node.name == 'Cell' || otherCollider.node.parent.name == 'Cell') {
                let countChildren : number = otherCollider.node.name == 'Cell' ? otherCollider.node.children.length : otherCollider.node.parent.children.length;
                if (countChildren) {
                    this.currentTypeMove = this.typeMove.default;
                    this.targetNode =this.oldParent;
                } else {
                    this.currentTypeMove = this.typeMove.default;
                    this.targetNode = this.oldParent;
                }
            }
        }
    }
    onPreSolve (selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {}
    onPostSolve (selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {}
}