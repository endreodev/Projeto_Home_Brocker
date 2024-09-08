from app import app

if __name__ == "__main__":
    ssl_context=('./certificates/fullchain.pem', './certificates/privkey.pem')
    app.run(host='0.0.0.0', port=5000, debug=True , ssl_context=ssl_context)
