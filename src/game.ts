import {Vec2} from "../common/math.js";
import {Piece} from "./components/com_draw.js";
import {loop_start, loop_stop} from "./loop.js";
import {sys_draw2d} from "./systems/sys_draw2d.js";
import {sys_framerate} from "./systems/sys_framerate.js";
import {sys_transform2d} from "./systems/sys_transform2d.js";
import {World} from "./world.js";

export type Entity = number;

export class Game {
    World = new World();

    DevicePixelRatio = window.devicePixelRatio;
    ViewportWidth = window.innerWidth * this.DevicePixelRatio;
    ViewportHeight = window.innerHeight * this.DevicePixelRatio;

    BoardSize = Math.min(this.ViewportHeight, this.ViewportWidth) * 0.8;
    SquareSize = this.BoardSize / 8;

    Images: Record<string, HTMLImageElement> = {};

    ChessBoard: (Piece | null)[][] = [
        [null, Piece.WPawn, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, Piece.BPawn, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ];

    PieceToMove: Vec2 | null = null;

    InputState: Record<string, number> = {};
    InputDelta: Record<string, number> = {};

    Ui = document.querySelector("main")!;
    Context2D: CanvasRenderingContext2D;

    constructor() {
        document.addEventListener("visibilitychange", () =>
            document.hidden ? loop_stop() : loop_start(this)
        );

        window.addEventListener("keydown", (evt) => {
            if (!evt.repeat) {
                this.InputState[evt.code] = 1;
                this.InputDelta[evt.code] = 1;
            }
        });
        window.addEventListener("keyup", (evt) => {
            this.InputState[evt.code] = 0;
            this.InputDelta[evt.code] = -1;
        });
        this.Ui.addEventListener("mousedown", (evt) => {
            this.InputState[`Mouse${evt.button}`] = 1;
            this.InputDelta[`Mouse${evt.button}`] = 1;
        });
        this.Ui.addEventListener("mouseup", (evt) => {
            this.InputState[`Mouse${evt.button}`] = 0;
            this.InputDelta[`Mouse${evt.button}`] = -1;
        });
        this.Ui.addEventListener("mousemove", (evt) => {
            this.InputState.MouseX = evt.offsetX;
            this.InputState.MouseY = evt.offsetY;
            this.InputDelta.MouseX = evt.movementX;
            this.InputDelta.MouseY = evt.movementY;
        });
        this.Ui.addEventListener("wheel", (evt) => {
            this.InputDelta.WheelY = evt.deltaY;
        });
        this.Ui.addEventListener("contextmenu", (evt) => evt.preventDefault());

        let canvas2d = document.querySelector("canvas")!;
        this.Context2D = canvas2d.getContext("2d")!;

        canvas2d.style.width = this.ViewportWidth + "px";
        canvas2d.style.height = this.ViewportHeight + "px";
        canvas2d.width = Math.floor(this.ViewportWidth * this.DevicePixelRatio);
        canvas2d.height = Math.floor(this.ViewportHeight * this.DevicePixelRatio);
        this.Context2D.scale(this.DevicePixelRatio, this.DevicePixelRatio);
    }

    FrameReset() {
        for (let name in this.InputDelta) {
            this.InputDelta[name] = 0;
        }
    }

    FrameUpdate(delta: number) {
        let now = performance.now();

        if (this.InputState.Escape && this.PieceToMove) {
            this.PieceToMove = null;
        }

        if (this.InputState.Mouse0 && !this.PieceToMove) {
            let y: number | null = Math.floor(
                (this.InputState.MouseX -
                    (this.ViewportWidth - this.BoardSize) / 2 / this.DevicePixelRatio) /
                    (this.SquareSize / this.DevicePixelRatio)
            );

            let x: number | null = Math.floor(
                (this.InputState.MouseY -
                    (this.ViewportHeight - this.BoardSize) / 2 / this.DevicePixelRatio) /
                    (this.SquareSize / this.DevicePixelRatio)
            );

            if (
                !(
                    x > this.ChessBoard.length - 1 ||
                    x < 0 ||
                    y > this.ChessBoard[0].length - 1 ||
                    y < 0
                ) &&
                this.ChessBoard[x][y]
            ) {
                this.PieceToMove = [x, y];
            }
        }

        sys_transform2d(this, delta);
        sys_draw2d(this, delta);
        sys_framerate(this, delta, performance.now() - now);
    }
}
