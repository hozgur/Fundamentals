from flask import Flask, request, render_template_string
import asyncio
app = Flask(__name__)

counter = 0
@app.route('/')
async def index():
    global counter
    counter += 1
    for i in range(1):
        app.logger.info(counter)
        await asyncio.sleep(1)
    return render_template_string(f'''
        <h1>Welcome to our Flask app! {counter}</h1>
        <form action="/echo" method="post">
            Enter something: <input type="text" name="text">
            <input type="submit" value="Echo">
        </form>
    ''')

@app.route('/echo', methods=['POST'])
def echo():
    user_input = request.form.get('text', '')
    return f"You entered: {user_input}"

if __name__ == '__main__':
    app.run(debug=True)
