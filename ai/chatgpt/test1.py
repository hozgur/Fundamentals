import openai
import os
import re
from dotenv import load_dotenv
load_dotenv()
openai.api_key = os.getenv("OPENAI_KEY")
print("Welcome to the OpenAI assistant. Type exit to exit.")
print(os.getenv("OPENAI_KEY"))
history = []

make_shorter = " make your response shorter no description only answer."
make_shorter_tr = " cevabınızı kısaltın açıklama yok sadece cevap."
def get_code(text):
    pattern1 = r'```(?:python)?\n(.*?)```'
    pattern2 = r'```(?:python)?(.*?)```'

    # Find code snippets using both patterns
    snippets1 = re.findall(pattern1, text, re.DOTALL)
    snippets2 = re.findall(pattern2, text, re.DOTALL)

    # Combine the results and return them
    result = snippets1 + snippets2
    return result[0] if result else ""

def get_code2(text):
    response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role":"user","content":text},{"role":"user","content":"get python code from last message. write only code. if there is no python code say only no code."}])
    reply = response["choices"][0].message.content
    if "no code" in reply.lower():
        return ""
    return reply


# function that counts characters in history array
def count():
    count = 0
    for i in history:
        count += len(i["content"])
    return count


def chat():
    global history
    user_input = ""
    loop = False
    prefix = ""
    prefix_tr = ""
    while True:
        if not loop:
            user_input = input(f"You[{count()}]: ")
            if(user_input.startswith("1")):
                user_input = "counts to ten."
                
            elif(user_input.startswith("2")):
                history = []
                print("History cleared.")
                continue
            elif(user_input.startswith(">")):
                prefix = "write a python program that "
                prefix_tr = "bana bir python programı yaz şu şekilde:"

        history.append({"role":"user","content":prefix + user_input + make_shorter})
        if user_input == "exit":
            break
        user_input = ""
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=history)
        reply = response["choices"][0].message.content
        history.append({"role":"assistant","content":reply})
        print(f"Assistant[{count()}]: ", reply)
        code = get_code(reply)
        if not code:
            code = get_code2(reply)
            code = get_code(code)
        loop = False
        if code:
            try:
                #print("Executing code: ", code)
                exec(code)
            except Exception as e:
                print(e)
                history.append({"role":"user","content":str(e)})
                response = openai.ChatCompletion.create(
                    model="gpt-3.5-turbo",
                    messages=history)
                reply = response["choices"][0].message.content
                history.append({"role":"assistant","content":reply})
                print("Assistant: ", reply)
                loop = True
                



        

chat() 