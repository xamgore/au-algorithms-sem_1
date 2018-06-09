## Частичные сортировки

Требуется узнать первые $k$ элементов в отсортированном массиве.

Варианты:
1. Отсортировать весь массив полностью $O(n\log n)$
2. Неполная HeapSort:
    $T(k, n) = T(makeheap) + k \cdot T(extract_min) = O(n) + k\cdot O(\log n)$.
    Если $k=o\left(\frac{n}{\log n}\right) \Rightarrow T(k, n) = O(n)$.
    Быстрее (ассимптотически) сделать нельзя.
3. Запустить QuickSort только на тех левых половинах, длина которых меньше $k$.
    Время работы $O(n + k\log k)$ в среднем (доказательство ниже).

## Порядковые статистики

$k$-я *порядковая статистика* для массива -- это элемент, который будет стоять на $k$-ом месте в отсортированном массиве.
Медиана -- это $\left\lceil\frac n2\right\rceil$ порядковая статистика

### Randomized selection

```python
def randomized_selection(a, r, l, k):
    px = rand(l, r)
    m_l, m_r = partition3(a, l, r, px)  # берем partition, который учитывает одинаковые элементы
    if m_l - l > k:
        return randomized_selection(a, l, m_l, k)
    elif m_r - l > k:
        return a[m_l]
    else:
        return randomized_selection(a, m_r, r, k - m_r)
```

**Оценка:**
1. Худший случай:
    $T(n) \leq T(n-1) + O(n) = O(n^2)$
2. Средний случай:
    $E(\#\text{partition: получим "хорошее разбиение"}) = 2$
    $E(T(n)) \leq E(T(3/4 n)) + E(\#...) \cdot O(n) = E(T(3/4 n)) + O(n) = O(n)$

**Сравнение с частичной сортировкой:**
$T(\text{PartialQuickSort(n, k)}) \leq T(\text{RandomizedSelection(n, k)}) + T(\text{QuickSort(k)}) = O(n) + O(k\log k)$

### "Медиана медиан" (Блюм-Флойд-Пратт-Равест-Таржан)

1. Разбиваем массив на группы по пять элементов
2. Сортируем группы
3. Строим массив `b`, состоящий из медиан этих групп
4. Вызываемся рекурсивно на `b` и получаем медиану `m`
5. Используем `m` в `partition` и вызываемся рекурсивно

```python
def mm(a, l, r, k):
    if l - r == 1:
        return a[l]
    sort_by_5(a, l, r)
    b = medians_by_5(a, l, r)
    m = mm(b, 0, len(b), len(b) / 2)
    px = a[m]
    i = partition(a, l, r, px)
    if i == k:
        return a[i]
    if i > k:
        return mm(a, l, i, k)
    else:
        return mm(a, i, r, k - d)
```

**Оценка:**
<!-- *Тут была красивая картинка с разбиением массива на пятерки* -->
$T(n) \leq T\left(\frac n5\right) + T\left(n\cdot \frac 7{10}\right) + O(n)$
Хотим доказать $T(n) = O(n) \leq C\cdot n + d$
$C\cdot n + d \leq C\cdot \frac n5 + d + C\cdot \frac {7n}{10} + d + \alpha n + \beta$
* $d = \beta$
* $C\cdot \left( 1 - \frac 15 - \frac 7{10}\right) = 0.1 C = \alpha \Rightarrow C = 10\alpha$

**Следствие:**
QuickSort можно реализовать за $O(n\log n)$ в худшем случае.
