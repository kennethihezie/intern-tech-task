class NumberConverter:
    number_dict = {'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7,
    'eight': 8, 'nine': 9, 'ten': 10, 'eleven': 11,'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15, 'sixteen': 16,
    'seventeen': 17, 'eighteen': 18, 'nineteen': 19,'twenty': 20, 'thirty': 30,'forty': 40, 'fifty': 50,'sixty': 60,
    'seventy': 70, 'eighty': 80,'ninety': 90,'hundred': 100,'thousand': 1000,'million': 1000000,'billion': 1000000000,'point': '.' }
    decimal_words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    currency = {'naira' : 'NGN', 'dollar': '$', 'euro': 'EURO'}
    ones = ('Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine')
    twos = ('Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen')
    tens = ('Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety', 'Hundred')
    suffixes = ('', 'Thousand', 'Million', 'Billion')

    def __init__(self):
        pass

    def format_number(self, number_words):
         """function to form numeric multipliers for million, billion, thousand etc.
         input: list of strings return value: integer"""
         numbers = []
         for number_word in number_words:
            numbers.append(self.number_dict[number_word])
         if len(numbers) == 4:
            return (numbers[0] * numbers[1]) + numbers[2] + numbers[3]
         elif len(numbers) == 3:
            return numbers[0] * numbers[1] + numbers[2]
         elif len(numbers) == 2:
            if 100 in numbers:
               return numbers[0] * numbers[1]
            else:
               return numbers[0] + numbers[1]
         else:
            return numbers[0]
   
    def get_decimal_sum(self, decimal_digit_words):
        decimal_number_str = []
        for dec_word in decimal_digit_words:
            if(dec_word not in self.decimal_words):
                return 0
            else:
                decimal_number_str.append(self.number_dict[dec_word])
        final_decimal_string = '0.' + ''.join(map(str,decimal_number_str))
        return float(final_decimal_string)

    def word_to_num(self, number_sentence):
        if type(number_sentence) is not str:
          raise ValueError("Type of input is not string! Please enter a valid number word (eg. \'seven hundred and sixty five thousand\')")

        number_sentence = number_sentence.replace('-', ' ')
        number_sentence = number_sentence.lower()  # converting input to lowercase

        if(number_sentence.isdigit()):  # return the number if user enters a number string
          return int(number_sentence)

        split_words = number_sentence.strip().split()  # strip extra spaces and split sentence into words

        clean_numbers = []
        clean_decimal_numbers = []
        # removing and, & etc.
        for word in split_words:
          if word in self.number_dict:
             clean_numbers.append(word)

        # Error message if the user enters invalid input!
        if len(clean_numbers) == 0:
           raise ValueError("No valid number words found! Please enter a valid number word (eg. seven hundred and sixty five million)") 

        # Error if user enters million,billion, thousand or decimal point twice
        if clean_numbers.count('thousand') > 1 or clean_numbers.count('million') > 1 or clean_numbers.count('billion') > 1 or clean_numbers.count('point')> 1:
           raise ValueError("Redundant number word! Please enter a valid number word (eg. seven hundred and sixty five million)")

        # separate decimal part of number (if exists)
        if clean_numbers.count('point') == 1:
          clean_decimal_numbers = clean_numbers[clean_numbers.index('point')+1:]
          clean_numbers = clean_numbers[:clean_numbers.index('point')]

        billion_index = clean_numbers.index('billion') if 'billion' in clean_numbers else -1
        million_index = clean_numbers.index('million') if 'million' in clean_numbers else -1
        thousand_index = clean_numbers.index('thousand') if 'thousand' in clean_numbers else -1

        if (thousand_index > -1 and (thousand_index < million_index or thousand_index < billion_index)) or (million_index>-1 and million_index < billion_index):
          raise ValueError("Malformed number! Please enter a valid number word (eg. seven hundred and sixty five million)")

        total_sum = 0  # storing the number to be returned

        if len(clean_numbers) > 0:
           # hack for now, better way TODO
            if len(clean_numbers) == 1:
                total_sum += self.number_dict[clean_numbers[0]]

            else:
                if billion_index > -1:
                   billion_multiplier = self.format_number(clean_numbers[0:billion_index])
                   total_sum += billion_multiplier * 1000000000

                if million_index > -1:
                  if billion_index > -1:
                     million_multiplier = self.format_number(clean_numbers[billion_index+1:million_index])
                  else:
                     million_multiplier = self.format_number(clean_numbers[0:million_index])
                  total_sum += million_multiplier * 1000000

                if thousand_index > -1:
                   if million_index > -1:
                      thousand_multiplier = self.format_number(clean_numbers[million_index+1:thousand_index])
                   elif billion_index > -1 and million_index == -1:
                      thousand_multiplier = self.format_number(clean_numbers[billion_index+1:thousand_index])
                   else:
                      thousand_multiplier = self.format_number(clean_numbers[0:thousand_index])
                   total_sum += thousand_multiplier * 1000

                if thousand_index > -1 and thousand_index != len(clean_numbers)-1:
                   hundreds = self.format_number(clean_numbers[thousand_index+1:])
                elif million_index > -1 and million_index != len(clean_numbers)-1:
                   hundreds = self.format_number(clean_numbers[million_index+1:])
                elif billion_index > -1 and billion_index != len(clean_numbers)-1:
                   hundreds = self.format_number(clean_numbers[billion_index+1:])
                elif thousand_index == -1 and million_index == -1 and billion_index == -1:
                   hundreds = self.format_number(clean_numbers)
                else:
                  hundreds = 0
                total_sum += hundreds
        
        # adding decimal part to total_sum (if exists)
        if len(clean_decimal_numbers) > 0:
          decimal_sum = self.get_decimal_sum(clean_decimal_numbers)
          total_sum += decimal_sum
      
        if(number_sentence.__contains__('naira')):
           return self.currency['naira'] + "{:,.2f}".format(total_sum)
        elif(number_sentence.__contains__('dollar')):
           return self.currency['dollar'] + "{:,.2f}".format(total_sum)
        elif(number_sentence.__contains__('euro')):
           return self.currency['euro'] + "{:,.2f}".format(total_sum)
        else:
           return "{:,.2f}".format(total_sum)

    def pre_process_number(self, number, index, ln):
        if number=='0':
           return 'Zero'
    
        length = len(number)
    
        if(length > 3):
           return False
    
        number = number.zfill(3)
        words = ''
 
        hdigit = int(number[0])
        tdigit = int(number[1])
        odigit = int(number[2])
    
        words += '' if number[0] == '0' else self.ones[hdigit]
        words += ' Hundred ' if not words == '' else ''
    
        if index==0 and ln>3:
          words+=' and '
        elif words=='':
          words+=''
        elif index==0 and tdigit==0 and odigit==0:
          words+=''
        elif index==0:
          words+= ' and '
        else:
          words+=''
    
        if(tdigit > 1):
          words += self.tens[tdigit - 2]
          words += ' '
          words += self.ones[odigit]
    
        elif(tdigit == 1):
          words += self.twos[(int(tdigit + odigit) % 10) - 1]
        elif(tdigit == 0):
          words += self.ones[odigit]
        if(words.endswith('Zero')):
          words = words[:-len('Zero')]
        else:
          words += ' '
     
        if(not len(words) == 0):    
          words += self.suffixes[index]
        
        return words
   
    def number_to_words(self, number):
        length = len(str(number))

        if length>12:
           return 'This program supports up to 12 digit numbers.'
    
        count = length // 3 if length % 3 == 0 else length // 3 + 1
        copy = count
        words = []
 
        for i in range(length - 1, -1, -3):
           words.append(self.pre_process_number(str(number)[0 if i - 2 < 0 else i - 2 : i + 1], copy - count, length))
           count -= 1;

        final_words = ''
        for s in reversed(words):
           temp = s + ' '
           final_words += temp
    
        return final_words

