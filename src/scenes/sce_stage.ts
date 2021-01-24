import {draw_chess_square, draw_piece} from "../components/com_draw.js";
import {instantiate} from "../entity.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    game.World = new World();

    const pieces = [];

    // chessboard
    for (let x = 0; x < game.ChessBoard.length; x++) {
        for (let y = 0; y < game.ChessBoard[x].length; y++) {
            instantiate(game, {
                Using: [draw_chess_square([x, y])],
            });

            const piece = game.ChessBoard[x][y];

            if (piece) {
                pieces.push([x, y]);
            }
        }
    }

    for (const [x, y] of pieces) {
        instantiate(game, {
            Using: [draw_piece([x, y], game.ChessBoard[x][y]!)],
        });
    }
}
