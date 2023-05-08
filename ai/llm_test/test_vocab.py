from vocabulary import remove_punctuation, create_vocabulary, read_text, analyze_text, punctuation

def test_remove_punctuation():
    sample_word = "!!(ben-im'den)!:"
    expected = ["!", "!", "(", "ben","-", "im","'", "den", ")", "!", ":"]
    actual = remove_punctuation(sample_word)
    assert actual == expected

    sample_word = "--"
    expected = ["-", "-"]
    actual = remove_punctuation(sample_word)
    sample_word = "2/3"
    expected = ["2", "/", "3"]
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

def test_analyze_tokens():
    sample_text = "-Bugün dün'den daha güzel olacakmış; dün'den bugüne ismi-cihet bir yapı kurdum değil mi?"
    expected = {"-": 2, "'": 2, ";": 1, "?": 1}
    actual = analyze_text(sample_text)
    assert actual == expected



if __name__ == "__main__":
    test_remove_punctuation()
    test_analyze_tokens()
    print("All tests passed!")
