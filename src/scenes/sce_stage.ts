import {draw_chess_square} from "../components/com_draw.js";
import {instantiate} from "../entity.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();

    // chessboard
    for (let x = 0; x < game.ChessBoard.length; x++) {
        for (let y = 0; y < game.ChessBoard[x].length; y++) {
            instantiate(game, {
                Using: [draw_chess_square([x, y])],
            });
        }
    }
}
