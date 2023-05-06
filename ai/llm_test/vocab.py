#vocab.py
import string
punctuation = string.punctuation + '”' + '“' + '—' + '‘' + '’' + '…' + '«' + '»' + '–'
def remove_punctuation(word):
    pre_tokens = []
    post_tokens = []
    if word[0] in punctuation:
        while word[0] in punctuation:
            pre_tokens.append(word[0])
            word = word[1:]
            if len(word) == 0:
                break    
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

def create_words(text):
    words = []
    for word in text.split():
        words.extend(remove_punctuation(word))
    return words


def create_vocabulary(text_file):
    text = read_text(text_file)
    words = create_words(text)
    vocab = set(words)
    # convert words to integers
    vocab = sorted(vocab)
    vocab_to_int = {word: ii for ii, word in enumerate(vocab, 1)}
    int_to_vocab = {ii: word for ii, word in enumerate(vocab, 1)}
    return vocab_to_int, int_to_vocab
    
    
    
