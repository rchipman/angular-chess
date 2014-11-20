Chess.factory("pieceService",
[ "pawnService", "rookService", "knightService", "bishopService", "queenService", "kingService",
function(pawnService, rookService, knightService, bishopService, queenService, kingService) {
    return {
        pawn: pawnService,
        rook: rookService,
        knight: knightService,
        bishop: bishopService,
        queen: queenService,
        king: kingService
    }
}])
