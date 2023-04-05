import openai
import os
import re
openai.api_key = os.getenv("OPENAI_KEY")
print("Welcome to the OpenAI assistant. Type exit to exit.")
print(os.getenv("OPENAI_KEY"))
history = []

make_shorter = " make your response shorter no description no instructions only answer."

def get_code(text):
    pattern = r"```(.+?)```"
    match = re.search(pattern, text, re.DOTALL)
    if match:
        return match.group(1)

def chat():
    global history
    while True:
        user_input = input("You: ")
        if user_input == "exit":
            break
        history.append({"role":"user","content":user_input + make_shorter})
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=history)
        reply = response["choices"][0].message.content
        history.append({"role":"assistant","content":reply})
        print("Assistant: ", reply)
        code = get_code(reply)
        if code:
            exec(code)
        

chat() 