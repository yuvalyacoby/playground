from typing import Dict, cast


x: Dict[str, any] = {
    "a": "true",
    "b": "false"
}

casted = {k: cast(bool,v) for k, v in x.items()}

print(x)
print('--------')
print(casted)