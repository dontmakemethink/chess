import {Piece} from "./components/com_draw.js";
import {Game} from "./game.js";
import {loop_start} from "./loop.js";
import {scene_stage} from "./scenes/sce_stage.js";

let game = new Game();

function add_image(index: string, asset: string) {
    const image = new Image();
    image.src = `http://localhost:1234/assets/${asset}`;
    game.Images[index] = image;
}

add_image(Piece.BPawn.toString(), "pawn_black.svg");
add_image(Piece.WPawn.toString(), "pawn_white.svg");

scene_stage(game);
loop_start(game);

// @ts-ignore
window.game = game;
