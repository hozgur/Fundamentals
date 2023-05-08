#vocabulary.py
import string
punctuation = string.punctuation + '”' + '“' + '—' + '‘' + '’' + '…' + '«' + '»' + '–'
print(punctuation)
vocab = None
tokens = None
vocab_to_int = None
int_to_vocab = None

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
    if "'" in word:
        return remove_middle(word,"'")
    #find hyphen and split word
    if len(word) > 2 and "-" in word:
        return remove_middle(word,"-")
    if len(word) > 2 and "/" in word:
        return remove_middle(word,"/")

    #pre_punctions
    if len(word) > 0 and word[0] in punctuation:
        while word[0] in punctuation:
            pre_tokens.append(word[0])
            word = word[1:]
            if len(word) == 0:
                break    
    #post_punctions
    if len(word) > 0 and word[-1] in punctuation:
        while word[-1] in punctuation:
            post_tokens.append(word[-1])
            word = word[:-1]
            if len(word) == 0:
                break
    
    result = []
    if len(pre_tokens) > 0:
        result.extend(pre_tokens)
    if len(word) > 0:
        result.append(word)
    if len(post_tokens) > 0:
        result.extend(post_tokens[::-1])
    return result

def read_text(text_file):
    f = open(text_file, "r")
    text = f.read().lower()
    f.close()
    return text

def filter_text(text,replacement_dict):
    for key in replacement_dict:
        text = text.replace(key,replacement_dict[key])
    return text

def analyze_text(text):
    punctuations = {}
    words = text.lower().split()
    # search punctioation in words
    for word in words:
        for char in word:
            if char in punctuation:
                punctuations[char] = punctuations.get(char,0) + 1
    return punctuations


def create_tokens(words):
    tokens = []
    for word in words:
        tokens.extend(remove_punctuation(word))
    return tokens


def create_vocabulary(text):
    global vocab
    global tokens
    global vocab_to_int
    global int_to_vocab
    words = text.lower().split()
    tokens = create_tokens(words)
    vocab = set(tokens)
    # convert words to integers
    vocab = sorted(vocab)
    vocab_to_int = {word: ii for ii, word in enumerate(vocab, 1)}
    int_to_vocab = {ii: word for ii, word in enumerate(vocab, 1)}
    
def get_vocab():
    global vocab
    return vocab

def get_tokens():
    global tokens
    return tokens

def get_vocab_to_int():
    global vocab_to_int
    return vocab_to_int

def get_int_to_vocab():
    global int_to_vocab
    return int_to_vocab