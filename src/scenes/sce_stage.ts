import {chess_square} from "../components/com_chess_square.js";
import {Blueprint2D, instantiate} from "../entity.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();

    // chessboard
    const chess_squares: Array<Blueprint2D> = [];
    for (let x = 0; x < game.ChessBoard.length; x++) {
        for (let y = 0; y < game.ChessBoard[x].length; y++) {
            chess_squares.push({
                Using: [chess_square(x, y)],
            });
        }
    }

    instantiate(game, {
        Translation: [game.ViewportWidth / 2, game.ViewportHeight / 2],
        Children: chess_squares,
    });
}
