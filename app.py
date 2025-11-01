from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/maps/<path:filename>')
def serve_map(filename):
    return send_from_directory('maps', filename)

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5050)
