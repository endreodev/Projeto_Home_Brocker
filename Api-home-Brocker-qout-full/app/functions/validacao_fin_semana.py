from datetime import datetime

def is_weekend():
    # Obtém o dia da semana atual como um número inteiro,
    # onde segunda-feira é 0 e domingo é 6.
    today = datetime.now().weekday()

    # Verifica se é sábado (5) ou domingo (6)
    if today == 5 or today == 6:
        return True
    else:
        return False

# Usando a função
# if is_weekend():
#     print("Hoje é fim de semana!")
# else:
#     print("Hoje não é fim de semana.")