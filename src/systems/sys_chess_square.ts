import {Entity, Game} from "../game";
import {Has} from "../world";

const QUERY = Has.ChessSquare;

export function sys_chess_square(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    const {x, y} = game.World.ChessSquare[entity];
    const chessboard = game.World.Transform2D[entity].Parent!;
    const chessboard_center = game.World.Transform2D[chessboard].Translation;

    game.Context2D.fillStyle = (x + y) % 2 === 0 ? "white" : "gray";
    game.Context2D.fillRect(
        game.SquareSize * y + chessboard_center[0] - game.BoardSize / 2,
        game.SquareSize * x + chessboard_center[1] - game.BoardSize / 2,
        game.SquareSize,
        game.SquareSize
    );
}
