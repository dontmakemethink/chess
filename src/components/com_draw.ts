import {Vec2} from "../../common/math.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

export type Draw = DrawText | DrawRect | DrawSelection | DrawChessSquare | DrawPiece;

export const enum DrawKind {
    Text,
    Rect,
    Selection,
    ChessSquare,
    Piece,
}

export interface DrawText {
    Kind: DrawKind.Text;
    Text: string;
    Font: string;
    FillStyle: string;
}

export function draw_text(text: string, font: string, fill_style: string) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Draw;
        game.World.Draw[entity] = {
            Kind: DrawKind.Text,
            Text: text,
            Font: font,
            FillStyle: fill_style,
        };
    };
}

export interface DrawRect {
    Kind: DrawKind.Rect;
    Width: number;
    Height: number;
    Color: string;
}

export function draw_rect(Width: number, Height: number, Color: string) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Draw;
        game.World.Draw[entity] = {
            Kind: DrawKind.Rect,
            Width,
            Height,
            Color,
        };
    };
}

export interface DrawSelection {
    Kind: DrawKind.Selection;
    Color: string;
}

export function draw_selection(color: string) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Draw;
        game.World.Draw[entity] = {
            Kind: DrawKind.Selection,
            Color: color,
        };
    };
}

export interface DrawChessSquare {
    Kind: DrawKind.ChessSquare;
    Coords: Vec2;
}

export function draw_chess_square(coords: Vec2) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Draw;
        game.World.Draw[entity] = {
            Kind: DrawKind.ChessSquare,
            Coords: coords,
        };
    };
}

export interface DrawPiece {
    Kind: DrawKind.Piece;
    Coords: Vec2;
    Piece: Piece;
}

export const enum Piece {
    WPawn = 1,
    BPawn,
}

export function draw_piece(coords: Vec2, piece: Piece) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Draw;
        game.World.Draw[entity] = {
            Kind: DrawKind.Piece,
            Piece: piece,
            Coords: coords,
        };
    };
}
