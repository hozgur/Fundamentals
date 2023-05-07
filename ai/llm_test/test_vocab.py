from vocabulary import remove_punctuation, create_vocabulary, read_text

def test_remove_punctuation():
    sample_word = "!!(ben-im’den)!:"
    expected = ["!", "!", "(", "ben","-", "im","’", "den", ")", "!", ":"]
    actual = remove_punctuation(sample_word)
    assert actual == expected

    sample_word = "--"
    expected = ["-", "-"]
    actual = remove_punctuation(sample_word)
    assert actual == expected


def test_create_vocabulary():
    sample_text = "Hello, how are you?"
    tokens = ["hello", ",", "how", "are", "you", "?"]
    expected = (
                {",": 1, "?": 2, "are": 3, "hello": 4, "how": 5, "you": 6},
                {1: ",", 2: "?", 3: "are", 4: "hello", 5: "how", 6: "you"})
    actual = create_vocabulary(sample_text)
    assert actual == expected


if __name__ == "__main__":
    test_remove_punctuation()
    test_create_vocabulary()
    print("All tests passed!")
