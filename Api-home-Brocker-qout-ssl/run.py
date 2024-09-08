from app import app


if __name__ == "__main__":
    # app.run()
    context = ('C:/xampp/apache/conf/ssl.crt/server.crt', 'C:/xampp/apache/conf/ssl.key/server.key')
    app.run(host='0.0.0.0', port=5000, debug=True , ssl_context=context)
