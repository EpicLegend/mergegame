
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Cell')
export class Cell extends Component {
    private _indexX : number | null = null;
    private _indexY : number | null = null;

    public set indexX(index : number)  { this._indexX = index; }
    public get indexX() : number  { return this._indexX; }

    public set indexY(index : number)  { this._indexY = index; }
    public get indexY() : number  { return this._indexY; }
}