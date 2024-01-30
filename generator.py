# Template: {name: 'Star1', pos: [-4, 5, 4], oid: 1}
from random import random;

mult = 500
def generateRng():
    randomValue = random() - 0.5;
    return randomValue * mult;

def run():
    for i in range(6, 500):
        print("{" + f"name: \"Star{i}\", pos: [{generateRng()}, {generateRng()}, {generateRng()}], oid: {i}" + "},")


if __name__ == "__main__":
    run();