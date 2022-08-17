from number_converter import NumberConverter
from cryptography import Cryptography

number_converter = NumberConverter()
cryptography = Cryptography()

words_conversion_test_cases = ["one dollar", "twenty five euro", "seven hundred and sixty five million naira", "two million euro", "five point two dollar"]
number_conversion_test_cases = [25, 100, 101, 305, 10000, 500210]
decrypted_messages = ["my name is kenneth ihezie", "bezao", "algorithm", "encryption"]
encrypted_messages = ['bn c#b> "h @>cc>i) ")>o">', '*>o#d', '#a!dg"i)b', '>c%gnei"dc']

for test in words_conversion_test_cases:
    print(number_converter.word_to_num(test))


for test in number_conversion_test_cases:
    print(number_converter.number_to_words(test))


for test in encrypted_messages:
    print(cryptography.decrypt_message(test))

for test in decrypted_messages:
    print(cryptography.encrypt_message(test))
