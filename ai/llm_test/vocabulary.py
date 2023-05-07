#vocabulary.py
import string
punctuation = string.punctuation + '”' + '“' + '—' + '‘' + '’' + '…' + '«' + '»' + '–'
vocab = None
tokens = None

def remove_middle(word,symbol):
    assert (symbol in word)
    pre_tokens = []
    post_tokens = []
    words = word.split(symbol)
    pre_tokens.extend(remove_punctuation(words[0]))
    post_tokens.extend(remove_punctuation(words[1]))
    return pre_tokens  + [symbol] +  post_tokens    

def remove_punctuation(word):
    pre_tokens = []
    post_tokens = []
    #find apostrophe and split word
    if "’" in word:
        return remove_middle(word,"’")
    #find hyphen and split word
    if len(word) > 3 and "–" in word:
        return remove_middle(word,"–")

    #pre_punctions
    if word[0] in punctuation:
        while word[0] in punctuation:
            pre_tokens.append(word[0])
            word = word[1:]
            if len(word) == 0:
                break    
    #post_punctions
    if word[-1] in punctuation:
        while word[-1] in punctuation:
            post_tokens.append(word[-1])
            word = word[:-1]
            if len(word) == 0:
                break
    return pre_tokens + [word] + post_tokens[::-1]

def read_text(text_file):
    f = open(text_file, "r")
    text = f.read().lower()
    f.close()
    return text

def create_tokens(words):
    tokens = []
    for word in words:
        tokens.extend(remove_punctuation(word))
    return tokens


def create_vocabulary(text):
    global vocab
    global tokens
    words = text.lower().split()
    tokens = create_tokens(words)
    vocab = set(tokens)
    # convert words to integers
    vocab = sorted(vocab)
    vocab_to_int = {word: ii for ii, word in enumerate(vocab, 1)}
    int_to_vocab = {ii: word for ii, word in enumerate(vocab, 1)}
    return vocab_to_int, int_to_vocab