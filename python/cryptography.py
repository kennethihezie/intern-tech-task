class Cryptography:
    alphabets = 'abcdefghijklmnopqrstuvwxyz'
    keys = '#*%&><!)"(@abcdefghijklmno'

    def __init__(self):
        pass

    def encrypt_message(self, message):
        new_message = ''

        for i in message:
            if i == ' ':
                new_message += ' '
                continue
            index = self.alphabets.index(i)
            new_message += self.keys[index]
        return new_message

    def decrypt_message(self, encrypted_message):
        new_message = ''
        for i in encrypted_message:
            if i == ' ':
               new_message += ' '
               continue
            index = self.keys.index(i)
            new_message += self.alphabets[index]
        return new_message
 