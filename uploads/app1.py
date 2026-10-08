from flask import Flask, render_template, request, jsonify
import chess

app = Flask(__name__)

board = chess.Board()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/move", methods=["POST"])
def move():
    data = request.json
    move = data["move"]

    try:
        chess_move = chess.Move.from_uci(move)

        if chess_move in board.legal_moves:
            board.push(chess_move)
            return jsonify({
                "status": "ok",
                "board": board.fen(),
                "game_over": board.is_game_over()
            })
        else:
            return jsonify({"status": "illegal"})

    except:
        return jsonify({"status": "error"})


@app.route("/board")
def get_board():
    return jsonify({"board": board.fen()})

if __name__ == "__main__":
    app.run(debug=True)