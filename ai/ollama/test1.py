import ollama

def main():
    response = ollama.chat(
    model='llama3.2:latest',
    messages=[
        {
            'role': 'user',
            'content': '3+2=?',
            
        }]
    )
    print(response.message.content)

if __name__ == "__main__":
    main()