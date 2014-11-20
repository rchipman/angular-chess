Chess.factory("boardService", function() {

    function isDark(a, n) {
        return (n % 2 && _.contains(['A', 'C', 'E', 'G'], a)) || (!(n % 2) && _.contains(['B', 'D', 'F', 'H'], a))
    }

    function getSpecialPiece(player, a) {
        piece = {player: player}
        if (a == 'A' || a == 'H') {
            piece.type = 'Rook'
        } else if (a == 'B' || a == 'G') {
            piece.type = 'Knight'
        } else if (a == 'C' || a == 'F') {
            piece.type = 'Bishop'
        } else if (a == 'D') {
            if (piece.player == 'black') {
                piece.type = 'Queen'
            } else {
                piece.type = 'King'
            }
        } else {
            if (piece.player == 'white') {
                piece.type = 'Queen'
            } else {
                piece.type = 'King'
            }
        }
        return piece;
    }

    function getPiece(a, n) {
        piece = null
        if (n == 8) {
            piece = getSpecialPiece('black', a)
        } else if (n == 7) {
            piece = {'player': 'black', type: 'Pawn'}
        } else if (n == 2) {
            piece = {'player': 'white', type: 'Pawn'}
        } else if (n == 1) {
            piece = getSpecialPiece('white', a)
        }
        return piece;
    }

    function getBoard() {
        alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        num = [8, 7, 6, 5, 4, 3, 2, 1];

        squares = []
        for (i = 0; i < num.length; i++) {
            n = num[i];
            for (y = 0; y < alpha.length; y++) {
                a = alpha[y];
                coords = a + n;
                square = {
                    coords: coords,
                    dark: isDark(a, n),
                    viableMove: false,
                    piece: getPiece(a, n)
                }
                squares.push(square);
            }
        }
        return squares;
    }

    function processMove(board, oldCoords, newCoords) {
        oldSquare = _.findWhere(board, {coords: oldCoords});
        piece = _.clone(oldSquare.piece);
        oldSquare.piece = null;
        return _.map(board, function(square) {
            square.viableMove = false;
            square.selected = false;
            if (square.coords === newCoords) {
                square.piece = piece;
            }
            return square;
        })
    }

    function getPiecePositions(board) {
        return _.reduce(board,
            (function(pieces, square) {
                if (square.piece != null) {
                    pieces.push({ coords: square.coords, player: square.piece.player });
                }
                return pieces;
            }),
        [])
    }

    function setValidMoves(board, coordArray) {
        return _.map(board, function(square) {
            square.viableMove = _.contains(coordArray, square.coords);
            return square;
        });
    }

    return {
        getBoard: getBoard,
        getPiecePositions: getPiecePositions,
        processMove: processMove,
        setValidMoves: setValidMoves
    };
})
