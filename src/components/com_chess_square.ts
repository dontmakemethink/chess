import {Entity, Game} from "../game";
import {Has} from "../world";

export interface ChessSquare {
    x: number;
    y: number;
}

export function chess_square(x: number, y: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ChessSquare;
        game.World.ChessSquare[entity] = {
            x,
            y,
        };
    };
}
