from flask import Flask, request, jsonify, render_template
import xmlrpc.client
import os

app = Flask(__name__)

# Koneksi ke server RPC (ganti URL jika RPC server di-deploy terpisah)
proxy = xmlrpc.client.ServerProxy("https://rpc-server-alpha.vercel.app/")

@app.route('/')
def index():
    # Render halaman kalkulator
    return render_template('index.html')

@app.route('/calculate', methods=['GET'])
def calculate():
    # Ambil parameter dari request
    operation = request.args.get('operation')
    num1 = float(request.args.get('num1'))
    num2 = float(request.args.get('num2'))

    # Panggil fungsi RPC berdasarkan operasi yang dipilih
    if operation == 'add':
        result = proxy.add(num1, num2)
    elif operation == 'subtract':
        result = proxy.subtract(num1, num2)
    elif operation == 'multiply':
        result = proxy.multiply(num1, num2)
    elif operation == 'divide':
        result = proxy.divide(num1, num2)
    else:
        result = "Operasi tidak valid"

    # Kembalikan hasil dalam format JSON
    return jsonify({'result': result})

# Jalankan Flask server di port yang diberikan oleh Render
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
