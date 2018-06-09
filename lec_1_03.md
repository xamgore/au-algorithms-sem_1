# Разделяй и властвуй

**Идея:**
1. Задача разделяется на подзадачи меньшего размера, но того же типа
2. Подзадачи решаются
3. Результаты решения подзадач объединяются в решение исходной задачи

## Умножение длинных битовых чисел

**Вход**: два $n$-битовых числа, $x$ и $y$
**Выход**: $x \cdot y$

Сложность сложения двух чисел — $O(n)$
Сложность классического умножения (в столбик) — $O(n^2)$

$$x = x_u \cdot 2^{n/2} + x_l$$

$$y = y_u \cdot 2^{n/2} + y_l$$

$$x\cdot y = x_u\cdot y_u\cdot 2^n + (x_u\cdot y_l + x_l\cdot y_u)\cdot 2^{n/2} + x_l\cdot y_l$$

Таким образом умножение двух $n$-битовых чисел разложилось на четыре перемножения $\frac n2$-битовых чисел.

Пусть $T(n)$ — сложность задачи размера $n$. Тогда $T(N) = 4T(\frac n 2) + O(n)$.

База: $T(1) = 1 = O(1)$
Глубина дерева вызовов: $\log_2 n$
Число операций на уровне $k$: $4^k$ задач размера $\frac{n}{2^k}$
$T(n) = \sum\limits_{l=0}^{\log_2n} O(\frac{n}{2^l})\cdot 4^l = O(n^2)$

### Алгоритм Карацубы

$$x\cdot y = x_u\cdot y_u\cdot 2^n + ((x_u+x_l)(y_u+y_l) - x_u\cdot y_u - x_l\cdot y_l)\cdot 2^{\frac n 2} + x_l\cdot y_l$$

$T(n) = 3T\left(\frac n 2\right) + O(n)$

$T(n) = \sum\limits_{l=0}^{\log_2n} O(\frac{n}{2^l})\cdot 3^l = O(n^{\log_23})$
$3^{\log_2n}=n^{\log_23}$

Можно решить за $O(n\log n)$, будет во втором семестре.

## Основная теорема о рекуррентных соотношениях

**$T(n) = a T\left(\frac n b\right) + O\left(n^d\right), a \geq 1, b > 1, d\geq0$**

На уровне $l$: $a^l \cdot O\left(\left(\frac{n}{b^l} \right)^d\right)$
* $a^l$ — количество подзадач
* $O\left(\left(\frac{n}{b^l} \right)^d\right)$ — стоимость одной задачи

Всего операций:

$$T(n) = \sum\limits_{l=0}^{\log_an} a^l \cdot O\left(\left(\frac{n}{b^l} \right)^d\right) = n^d \sum\limits_{l=0}^{\log_an} \frac{a^l}{b^{d\cdot l}}$$

Получилась геометрическая прогрессия с частным $\frac{a}{b^d}$
Три варианта:
1. $a = b^d \Rightarrow T(n) = O(n^d\cdot\log n)$
2. $a < b^d \Rightarrow \sum \text{геом. прогресии} = O(1) \Rightarrow T(n) = O(n^d)$
    Число задач растет медленнее, чем их сложность, вся сложность в корне
3. $a > b^d \Rightarrow T(n) = O(n^d) \cdot \frac{\left(\frac{a}{b^d}\right)^{\log_an} - 1}{\frac{a}{b^d}- 1} \Rightarrow T(n) = O(n^{\log_ba}) $
    Число задач растет быстрее, чем их сложность, вся сложность в листьях

**Альтернативная формулировка:**
1. $\log_b a = d \Leftrightarrow a = b^d$
2. $\log_b a < d \Leftrightarrow a < b^d$
3. $\log_b a > d \Leftrightarrow a > b^d$

### Примеры

1. Двоичный поиск: $T(n) = T(\frac n 2) + O(1) \Rightarrow a=1, b=2, d=0 \Rightarrow T(n) = O(\log n)$
2. Сортировка слиянием: $T(n) = 2\cdot T(\frac n 2) + O(n) \Rightarrow a = 2, b = 2, d = 1 \Rightarrow T(n) = O(n \log n)$
3. Алгоритм Карацубы: $T(n) = 3\cdot T(\frac n 2) + O(n) \Rightarrow a = 3, b=2, d=1 \Rightarrow T(n) = O(n^{\log_23}) \approx O(n^{1.58})$


## MergeSort без рекурсии

```python
def merge_sort(a):
    q = queue()
    for i in range(n):
        q.push([a[i]])
    while q.size() > 1:
        b = q.pop()
        c = q.pop()
        q.push(merge(b, c))
    return q.pop()
```
Актуально в случае больших данных и машин с маленькими стеками.

## Нижняя оценка на сортировку сравнениями

Ограничим модель: мы можем только сравнивать элементы. В такой модели состояния программы описываются бинарным деревом, у которого в узлах находятся сравнения элементов (дерево сравнения / дерево решения).
Всего $n!$ перестановок. Для каждой перестановки существует уникальный лист.

**Какова минимальная высота дерева?**
У дерева высоты $h$ есть $2^h$ листьев.

$n!\leq 2^h \Rightarrow h \geqslant \log_2 n! \leq n \cdot \log_2 n$ — оценка сверху

$n! = \sqrt{2\pi n}\left(\frac n e\right) ^ n$ — формула Стирлинга

$\log n! \geq \log 1 + \log 2 + ... + \log \frac n 2 + ... + \log n \geq \frac n 2 \log \frac n 2 = \Omega(n \log n)$

**Таким образом** $h = \Omega(n \log n)$, и худшее время, которое сортировка, которая сортиует, основываясь только на сравнениях, составляет $\Omega(n \log n)$
