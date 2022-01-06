import numpy as np
from time import time
from js import array_size


def timeit(fn, args, iterations: int = 10):
    s = time()
    for _ in range(iterations):
        output = fn(*args)
    time_taken = (time() - s)  * 1000
    print(f"python function {fn.__name__} timeit: {time_taken} ms")
    return time_taken, output

arr = np.random.random(array_size)
time_taken, output = timeit(np.sum, (arr,))