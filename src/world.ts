import {ChessSquare} from "./components/com_chess_square.js";
import {Draw} from "./components/com_draw.js";
import {Transform2D} from "./components/com_transform2d.js";
import {Entity} from "./game.js";

const enum Component {
    Draw,
    Transform2D,
    ChessSquare,
}

export const enum Has {
    Draw = 1 << Component.Draw,
    Transform2D = 1 << Component.Transform2D,
    ChessSquare = 1 << Component.ChessSquare,
}

export class World {
    Signature: Array<number> = [];
    Graveyard: Array<Entity> = [];

    // Component data
    Draw: Array<Draw> = [];
    Transform2D: Array<Transform2D> = [];
    ChessSquare: Array<ChessSquare> = [];
}
