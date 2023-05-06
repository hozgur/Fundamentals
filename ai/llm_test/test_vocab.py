from vocab import remove_punctuation, create_words, create_vocabulary, read_text

def test_remove_punctuation():
    sample_word = "!!(hello)!:"
    expected = ["!", "!", "(", "hello", ")", "!", ":"]
    actual = remove_punctuation(sample_word)
    assert actual == expected

def test_create_words():
    sample_text = "Hello, how are you?"
    expected = ["hello", ",", "how", "are", "you", "?"]
    actual = create_words(sample_text.lower())
    assert actual == expected

def test_create_vocabulary():
    sample_text = "Hello, how are you?"
    expected = ({"hello": 1, ",": 2, "how": 3, "are": 4, "you": 5, "?": 6}, {1: "hello", 2: ",", 3: "how", 4: "are", 5: "you", 6: "?"})
    actual = create_vocabulary(sample_text)
    assert actual == expected


if __name__ == "__main__":
    test_remove_punctuation()
    test_create_words()
    print("All tests passed!")
