# Лямбда-исчисление

## 1. Сравнение функционального и императивного подходов к программированию. (Лекция 1, стр. 4 | стр. 4)

## 2. Основы $\lambda$-исчисления. $\lambda$-термы. Свободные и связанные переменные. (Лекция 1, стр. 9 | стр. 9)

Есть два способа строить выражения:
1. Применение -- применить функцию к входным данным
2. Абстрация -- объявить фунцию

$V$ -- множество переменных
$\Lambda$ -- множество термов

$\Lambda ::= V\ |\ (\Lambda\Lambda)\ |\ (\lambda V.\Lambda)$

### Комбинаторы
1. $I = \lambda x.x$
2. $\omega = \lambda x.xx$
3. $\Omega = \omega\omega = (\lambda x.xx)(\lambda x.xx)$
4. $K=\lambda xy.x$ -- выбор первой переменной
5. $K_* =\lambda xy.y$ -- выбор второй переменной
6. $C=\lambda fxy.fyx$ -- `flip`
7. $B=\lambda fgx = f(gx)$ -- композиция функций
8. $S=\lambda fgx.fx(gx)$

**Каррирование** -- подстановка аргументов в терм "по одному"

## 3. Подстановка $\lambda$-терма. Лемма подстановки. (Лекция 1, стр. 25 | стр. 25)

**Подстановка** $M[x:=N]$ -- подстановка $N$ вместо **свободных** переменных терма $M$.

**Лемма подстановки:** пусть $M,N,L\in\Lambda$. Предположим $x\not\equiv y$ и $x\notin FV(L)$. Тогда $M[x:=N][y:=L]\equiv M[y:=L][x:=N[y:=L]]$ (можно менять местами подстановки, если в первую подстановку еще и подставить правую).

## 4. $\alpha$ и $\beta$ конверсии. $\eta$-конверсия и экстенсиональная эквивалентность (Лекция 1, стр. 28 | стр. 28)

$\beta$-подстановка: $(\lambda x.M)N=M[x:=N]$

Дальше кучка правил, сводящихся к тому, что можно использовать знак $=$ (например, $M=M'\Rightarrow MZ=M'Z$)

$\alpha$-преобразование -- переименование переменных, $\lambda x.M=\lambda y.M[x:=y]$

$\eta$-преобразование: $\lambda x.Mx = M$ (в том смысле, что $(\lambda x.Mx)N = MN$)

**Принцип экстенсиональности** -- две функции эквивалентны, если они дают одинаковый результат на всех входных данных.

## 5. Расширения чистого лямбда-исчисления. $\delta$-конверсия. (Лекция 1, стр. 34 | стр. 34)

Можно расширить множество термов константами.
$\Lambda(\mathbb{C}) ::= \mathbb{C}|V|\Lambda(\mathbb{C})\Lambda(\mathbb{C})|\lambda V.\Lambda(\mathbb{C})$

Например, можно добавить булевы значения. $\mathbb{C} = {true, false, not, and, or}$

$\delta$-преобразование: правила взаиможействия констант. Например $not\ \  true =_ \delta false,\ \ \ and\ \ true\ \ false =_ \delta false$

## 6. Кодирование булевых значений, кортежей в чистом бестиповом $\lambda$-исчислении. (практика)

```
tru = λ tf.t
fls = λ tf.f

iif = λ bxy.bxy
not = λ b.b fls tru
and = λ xy. xy fls
or = λ xy. xy tru

pair = λ xyf = fxy
fst = λ p. p tru
snd = λ p. p fls
```
## 7. Кодирование чисел Чёрча в чистом бестиповом λ-исчислении. (практика)

```
0 = λ sz.z
1 = λ sz.sz
2 = λ sz.s(sz)
3 = λ sz.(s(sz))
...
n = λ sz.s^n(z)

iszro = λ n.n (λ x.fls) tru
succ = λ n sz = s(n sz)
plus = λ mn sz. m s(n sz)
mult1 = λ mn. m (plus n) 0
mult2 = λ mn sz. m (n s) z
```

## 8. Теорема о неподвижной точке. Y-комбинатор.  (Лекция 2, стр. 4 | стр. 40)

**Теорема:** для любого $\lambda$-терма $F$ существует неподвижная точка: $\forall F\in\Lambda\ \exists X\in\Lambda\ \ \ FX=X$.
**Доказательство:** введем $W=\lambda x.F(xx)$ и $X = WW$. Тогда $X=WW=(\lambda x.F(xx))W = F(WW)=FX$

**Теорема:** существует комбинатор неподвижной точки $Y$, такой что $\forall F\ \ F(YF)=YF$
**Доказательство:** введем $Y=\lambda f.(\lambda x.f(xx))(\lambda x.f(xx))$. Тогда $YF = (\lambda x.F(xx))(\lambda x.F(xx)) = F((\lambda x.F(xx))(\lambda x.F(xx))) = F(YF)$

С $Y$-комбинатором можно ввести рекурсию. Пример на факториале:
$fac=\lambda n.iif(iszro\ n) 1 (mult\ n (fac(pred\ n))) = (\lambda fn.iif(iszro\ n) 1 (mult\ n (f(pred\ n)))) fac = fac'fac$. Отсюда $fac=Y fac'$

## 9. Редексы. Одношаговая и многошаговая редукция. Нормальная форма. Редукционные графы. (Лекция 2, стр. 9 | стр. 46)

**Редукция** -- последовательное применение конверсий.
* $KI\rightarrow_\beta K_*$ -- редуцируется за 1 шаг
* $IIK_*\twoheadrightarrow_\beta K_*$ -- просто редуцируемо
* $KI =_ \beta IIK_*$ -- конвертируется (редуцируются до одного и того же)

**Редекс** -- терм вида $(\lambda x.M)N$.
Сокращение редекса -- это его $\beta$-редукция.

**Нормальная форма:** терм находится в нормальной форме, если в нем нет подтермов, являющихся $\beta$-редексами.

**Редукционный граф** -- это орграф, в котором вершины -- это термы, а ребра -- это редукции. Не все редукционные графы конечны.

## 10. Теорема Чёрча-Россера и её cледствия. (Лекция 3, стр. 24 | стр. 62)

**Теорема Чёрча-Россера:** если $M\twoheadrightarrow_\beta N,\ M\twoheadrightarrow_\beta K$, то существует такой $L$, что $N\twoheadrightarrow_\beta L$ и $K\twoheadrightarrow_\beta L$.
![свойство ромба](images/pic_10_1.png)

**Следствие 1:** если $M=_ \beta N$, то существует $L$, Такой что $M\twoheadrightarrow_\beta L$ и $N\twoheadrightarrow_\beta L$.
![доказательство](images/pic_10_2.png)

**Следствие 2:** если $M$ имеет $N$ в качестве $\beta-NF$, то $M\twoheadrightarrow_\beta N$.

**Следствие 3:** любой терм имеет не больше одной нормальной формы.

## 11. Cтратегии редукции. Теорема о нормализации. Механизмы вызова в функциональных языках. (Лекция 2, стр. 28 | стр. 66)

Стратегии редукции:
* **Нормальная стратегия:** редуцируем сначала все редексы, потом редуцируем аппликации. Всегда сокращает самый левый внешний редекс.
    ![нормальная стратегия](images/pic_11_1.png)
* **Аппликативная стратегия:** сначала редуцируем все элементы аппликации до нормальной формы, затем сокращаем редексы. Всегда сокращает самый левый внутренний редекс.
    ![аппликативная стратегия](images/pic_11_1.png)

$\lambda \vec{x}.y\vec{N}=\lambda x_1...x_n.yN_1...N_k$ -- головная нормальная форма (HNF) (в терме сначала стоит переменная (может совпадать с одним из $x_i$)).

Слабая головная нормальная форма (WHNF) -- это HNF или лямбда-абстракция, то есть не редекс на верхнем уровне.

**Теорема о нормализации:** если терм имеет нормальную форму, то последовательное сокращение самого левого внешнего редекса привожит к этой нормальной форме. Т.е. если нормальная стратегия не работает, то нормальной формы нет.

Аппликативная стратегия энергичная, сначала вычисляются аргументы, потом происходит применение функции.
Нормальная стратегия ленивая -- сначала сокращаются функции, потом аргументы используются только если нужно.

**Механизм вызова** — термин, применяемый при исследовании высокоуровневых языков программирования.

В функциональных языках:
* «вызов по значению» — аппликативный порядок редукций до WHNF
* «вызов по имени» — нормальный порядок редукций до WHNF
* «вызов по необходимости» — «вызов по имени» плюс разделение.

## 12. Функция предшествования для чисел Чёрча. Комбинатор примитивной рекурсии. (практика)

```
Вспомогательные функции
zp = pair 0 0
sp = λ p. pair (snd p) (succ (snd p))

sp (pair n m) = pair m (m + 1)

Функция предшествования
pred = λ m. fst (m sp zp) -- m раз делаем + 1
pred m = fst (m sp zp)

Примитивная рекурсия
xz = λ x. pair x 0 -- старт
fs = λ f p. pair (f (fst p) (snd p)) (succ (snd p)) -- шаг
rec = λ m f x. fst (m (fs f) (xz x)) -- некое подобие цикла for

Пример
pred = λ m. rec m (λ x y. y) 0
```

## 13. Просто типизированное $\lambda$-исчисление в стиле Карри. Предтермы. Утверждения о типизации. Контексты. Правила типизации. (Лекция 3, стр. 8 | стр. 79)

По Карри термы те же самые, что и в бестиповой теории, типы выводятся из неявных предположений о типах переменных

## 14. Просто типизированное $\lambda$-исчисление в стиле Чёрча. Предтермы. Утверждения о типизации. Контексты. Правила типизации. (Лекция 3, стр. 8 | стр. 79)

По Чёрчу у всех связанных переменных терма есть заданные типы, по ним выводится тип терма

## 15. Свойства систем просто типизированного $\lambda$-исчисления. (Лекция 3, стр. 27 | стр. 102)

**Леммы:**
* Лемма разбавления: расширение контекста не влияет на выводимость типа терма
* Лемма о свободных переменных: свободные переменные терма должны присутствовать в контексте
* Лемма сужения: сужение контекста до множества свободных переменных не влияет на выводимость типа

Есть нетипизируемые тремы, например $\omega=\lambda x.xx$ или $Y$.

## 16. Связь между системами Карри и Чёрча. Проблемы разрешимости. Сильная и слабая нормализация. (Лекция 3, стр. 34 | стр. 109)

Системы Карри и Чёрча можно переводить друг в друга.

Задачи:
* Задача проверки типа (принадлежит ли терм определенному типу?)
* Задача синтеза типа (какой тип имеет терм?)
* Задача обитаемости типа (есть ли термы с заданным типом?)

Все эти задачи разрешимы в системах Крри и Чёрча.

**Слабая нормализация:** терм называют слабо нормализуемым (WN), если существует последовательность редукций, приводящая его к нормальной форме.
**Сильная нормализация:** терм называют сильно нормализуемым (SN), если любая последовательность редукций приводит его к нормальной форме.

Система типов называет слабо/сильно нормализуемой, если все ее термы слабо/сильно нормализуемы. Обе системы (Карри и Чёрча) сильно нормализуемы.

## 17. Свойство универсальности правой свертки. Закон слияния foldr-map. (Лекция 7, стр. 25 | стр. 244)

**Свойство универсальности:** если функция `g` удовлетворяет системе уравнений
```Haskell
g [] = v
g (x:xs) = f x (g xs)

тогда

g = foldr f v
```
Доказывается по индукции. Смысл в том, что `foldr` -- единственное решение.

**Свойство слияния:**
```Haskell
foldr g w . map h = foldr (g . h) w
```

## 18. Понятие главного (наиболее общего) типа. Подстановки типа и их композиция. Унификаторы. (Лекция 13, стр. 4 | стр. 428)

**Главный тип:** -- наименьший подходящий к терму тип, из которого, при подстановке новых типов вместо простых, получаются все остальные типы.

**Подстановка типа** -- это операция $S:\mathbb{T} \rightarrow \mathbb{T}$, такая, что $S(\sigma \rightarrow \tau)\equiv S(\sigma)\rightarrow S(\tau)$.
Пример подстановки: $S = [\alpha:=\gamma\rightarrow\beta, \beta:=\alpha\rightarrow\gamma]$.
Тождественная (пустая) подстановка $S = [\ ]$

**Композиция перестановок** -- подстановка, в которой в одну подстановку подставили другую.
$S = [\alpha:=\gamma\rightarrow\beta, \beta:=\alpha\rightarrow\gamma]$
$T = [\alpha:=\beta\rightarrow\gamma, \gamma:=\beta]$
$T\circ S = [\alpha:=T(S(\alpha)), \beta=T(S(\beta)), \gamma=T(S(\gamma))]$
$T\circ S = [\alpha:=\beta\rightarrow\beta,\beta:=(\beta\rightarrow\gamma)\rightarrow\beta, \gamma\rightarrow\beta]$
Подстановки образуют моноид с единицей $[\ ]$

**Унификатор** для типов $\sigma$ и $\tau$ -- это такая подстановка $S$, что $S(\sigma)\equiv S(\tau)$

**Главный унификатор:** $S$ -- главный унификатор, если для любого другого унификатора $S'$ существует подстановка $T$, такая что $S'\equiv T\circ S$

## 19. Алгоритм унификации. (Лекция 13, стр. 36 | стр. 438)

**Теорема унификации:** существует алгоритм унификации $\mathbb{U}$, который для заданых типов $\sigma$ И $\tau$ находит главный унификатор или сообщает, что такого нет.
![алгоритм унификации](images/pic_19_1.png)
* алгоритм завершается, т.к. на каждом шаге число типовых переменных уменьшается на 1
* алгоритм унифицирует, доказывается по индукции
* алгоритм дает главный унификатор, доказывается по индукции

## 20. Алгоритм построения системы ограничений. (Лекция 13, стр. 19 | стр. 443)

**Система ограничений** -- набор уравнений на типы (в том числе свободных переменных) для терма
![система ограничений](images/pic_20_1.png)
![алгоритм](images/pic_20_2.png)

## 21. Теорема Хиндли-Милнера. (Лекция 13, стр. 21 | стр. 446)

**Главная пара** -- пара из контекста $\Gamma$ и типа $\sigma$, такая, что терм $\mathbb{M}$ в контексте $\Gamma$ имеет тип $\sigma$.

**Теорема Хинди-Миллера:** существует алгоритм $PP$, который для заданного терма находит его главную пару или сообщает, что ее нет.
![алгоритм](images/pic_21_1.png)

**Главный тип** -- тип $\sigma$ терма $\mathbb{M}$, такой, что для любого другого типа $\sigma'$ этого терма существует подстановка $S$, такая что $S(\sigma)\equiv\sigma'$

## 22. Рекурсивные типы. μ-нотация. (Лекция 14, стр. 4 | стр. 464)

Строим типы из единичного типа $1$.
Дизъюнктивная сумма -- $1+1$ -- тип, имеющий два различных значения.
Декартово произведение типов $X*Y$.
Возведение типов в степень $Y^X = X\rightarrow Y$
Параметризованный тип $\lambda X. T[X]$

Например, `data Maybe x = Nothing | Just x`, тип: $\lambda X. 1 + X$

**Рекурсивные типы:**
```Haskell
data List = Nil | Cons a (List a)
```

Тип: $L = 1 + A + A^2 + A^3 + ... = 1 + A * L$.

Если для типов определен комбинатор неподвижной точки $FIX$, то $L=(\lambda X. 1+A*X)L = FIX\ \ \ \lambda X.\ 1+A*X$

**Мю-нотация:** чтобы везде не писать $FIX\ \ \ \lambda X. T[X]$, пишут
$List A = \mu X.\ 1 + A*X$
$List = \lambda A.\ \mu X.\ 1 + A * X$

## 23. Катаморфизмы. (Лекция 14, стр. 19 | стр. 483)

**Катаморфизм** -- обобщение понятия свертки на типы
```Haskell
newtype Fix f = In (f (Fix f))

cata :: Functor f => (f a -> a) -> Fix f -> a
cata phi (In x) = phi $ fmap (cata phi) x

type Algebra f a = f a -> a
cata :: Functor f => Algebra f a -> Fix f -> a
```

## 24. Анаморфизмы и гилеоморфизмы. (Лекция 14, стр. 26 | стр. 490)

**Анаморфизм** -- штука, которая заменяет `out : Fix f -> f (Fix f)` на некоторую `psi :: a -> f a`
```Haskell
ana :: Functor f => (a -> f a) -> a -> Fix f
ana psi x = In $ fmap (ana psi) (psi x)

type Coalgebra  f a = a -> f a
ana :: Functor f => Coalgebra f a -> a -> Fix f
```

**Гилеоморфизм** -- последовательное применение анаморфизма и катаморфизма.
```Haskell
hylo :: Functor f => Algebra f a -> Coalgebra f b -> b -> a
hylo phi psi = cata phi . ana psi
```

## 25. Зипперы. Контексты с дыркой. (Лекция 15, стр. 4 | стр. 501)

**Зиппер** -- модифицированная структура данных, у которой есть окошко над каким-то элементом. Это окошко может двигаться в разные стороны, тем самым позволяя дешево изменять структуру.

```Haskell
type Triple a = (a, (a, a))
type TripleZ a = (a,       -- фокус (окошко)
                  Cntx a)  -- контекст (все остальное)
data Cntx a = C1 a a | C2 a a | C3 a a
```

А теперь магия с типами. Рассмотрим тип списка
$L(X) = 1 + X * L(X)$
$L(X) = 1 / (1 - X)$
Продифференцируем
$L'(X) = L(X) * L(X)$
Сравним с типом зиппера
```Haskell
type ListZ a = (a, CntxL a)
type CntxL a =([a], [a])
```
Тип контекста является производной типа исходной структуры, по параметризованному типу.

# Haskell

## 1. Основы программирования на Haskell. Связывание. Рекурсия. Базовые конструкции языка. (Лекция 4, стр. 8 | стр. 116)

Объявление функций, `where` и `let ... in ...`, guards,

## 2. Основные встроенные типы языка Haskell. Система модулей. Частичное применение, каррирование. (Лекция 4, стр. 17 | стр. 129)

* `Bool` — булево значение;
* `Char` — символ Юникода;
* `Int` — целое фиксированного размера;
* `Integer` — целое произвольного размера;
* `type1 -> type2` — тип функции;
* `(type1, type2, ..., typeN)` — тип кортежа;
* `()` — единичный тип, с одной константой ();
* `[type1]` — тип списка с элементами типа type1.

**Модули**
```Haskell
module A (foo, bar) where
import B (f, g, h)
foo = f g
bar = ...
```

## 3. Операторы и их сечения в Haskell. Бесточечный стиль. (Лекция 4, стр. 26 | стр. 138)

Приоритет и ассоциативность:

`infix, infixl, infixr + n (0..9)`, `n` -- приоритет (чем больше, тем больше)
У аппликации наивысший (10) приоритет

**Сечение** -- частичное применение оператора
```Haskell
foo = (2 +) = \y -> 2 + y
bar = (+ 3) = \x -> x + 3
```

**Бесточечный стиль:**
```Haskell
foo x = bar bas x
foo = bar bas
```

## 4. Ошибки. Основание. Строгие и нестрогие функции. Ленивое и энергичное исполнение. (Лекция 5, стр. 4 | стр. 150)

Основание $\perp$ -- значение, которое есть у всех типов. Основание получается, если выражение расходится (например, `bot = not bot`)

Нестрогие функции не считают некоторые свои аргументы, если им это не нужно (например, `const x y = x`)
Строгие функции наоборот. И если строгая функция принимает основание, то она его и возвращает.

Оператор `seq` форсирует подсчет элемента
```Haskell
seq :: a -> b -> b
seq ⊥ b = ⊥
seq a b = b
```

Оператор энергичной аппликации `$!`
```Haskell
infixr 0 $!
($!) :: (a -> b) -> a -> b
f $! x = x `seq` f x
```

## 5. Алгебраические типы данных. Сопоставление с образцом, его семантика. (Лекция 5, стр. 12 | стр. 159)

```Haskell
data Color = Red | Green | Blue | Indigo | Violet deriving Show

data PointDouble = PtD Double Double deriving Show

head (x:_) = x
head [] = error "empty list"
-- то же самое
head xs = case xs of
    (x:_) -> x
    [] -> error "empty list"

-- псевдонимы
dupFirst :: [a] -> [a]
dupFirst (x:xs) = x:x:xs
dupFirst s@(x:xs) = x:s
```

В конструкторе данных можно заставить программу вычислять аргументы при конструировании.
```Haskell
data Complex a = !a :+ !a
infix 6 :+
```

## 6. Объявления type и newtype . Метки полей. (Лекция 5, стр. 24 | стр. 171)

`type` -- синоним типа
`newtype` -- новый тип, задающий синоним типа

**Метки полей:**
```Haskell
data Point' a = Pt' {ptx, pty :: a} deriving Show

let myPt = Pt' 3 2
ptx myPt -- 3

let myPt' = Pt' {ptx = 3, pty = 2}

absP p = sqrt (ptx p ^ 2 + pty p ^2)
absP' (Pt' {ptx = x, pty = y}) = sqrt (x ^ 2 + y ^ 2)

let myPt4 = Pt’ {ptx = 7, pty = 8} -- (7, 8)
let myPt5 = myPt4 {ptx = 10} -- (10, 8)
```

## 7. Списки, стандартные функции для работы с ними. Генерация (выделение) списков. (Лекция 5, стр. 28 | стр. 178)

`Maybe`, `Either`

```Haskell
tail (_:xs) = xs
take n (x:xs) = x : take (n - 1) xs
filter :: (a -> Bool) -> [a] -> [a]
map :: (a -> b) -> [a] -> [b]
zip :: [a] -> [b] -> [(a, b)]
zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]

-- генераторы
[x^2 | x <- [0..9]]
-- [0,1,4,9,16,25,36,49,64,81]
[(x,y,z) | x <- [1..5], y <- [1..5], z <- [1..5], x^2 + y^2 == z^2]
-- [(3, 4, 5), (4, 3, 5)]
```

## 8. Специальный полиморфизм. Классы типов. Объявления представителей. Классы типов Eq, Ord, Enum и Bound. (Лекция 6, стр. 4 | стр. 187)

```Haskell
class Eq a where
    (==) :: a -> a -> Bool
    (/=) :: a -> a -> Bool
    a /= b = not $ a == b

instance Eq Integer where
    (==) = eqInteger

instance (Eq a) => Eq [a] where
    [] == [] = True
    (x:xs) == (y:ys) = x == y && xs == ys
    _ == _ = False

class (Eq a) => Ord a where
    compare :: a -> a -> Ordering
    (<), (<=), (>=), (>) :: a -> a -> Bool
    max, min :: a -> a -> a

class Enum a where
    succ, pred :: a -> a
    toEnum :: Int -> a
    fromEnum :: a -> Int

    enumFrom :: a -> [a]
    enumFromThen :: a -> a -> [a]
    enumFromTo :: a -> a -> [a]
    enumThenTo :: a -> a -> a -> [a]

class Bounded a where
    minBound, maxBound :: a
```

## 9. Внутренняя реализация классов типов. (Лекция 5, стр. 29 | стр. 214)

Все реализовано через словари методов для каждого класса

## 10. Стандартные классы типов: Num и его наследники, Show и Read. (Лекция 5, стр. 22 | стр. 207)

```Haskell
class (Eq a, Show a) => Num a where
    (+), (-), (*) :: a -> a -> a
    negate :: a -> a
    abs, signum :: a -> a
    fromInteger :: Integer -> a

data Ratio a = !a :% !a deriving (Eq)
(%) :: (Integral a) => a -> a -> Ratio a
numerator, denominator :: (Integral a) => Ratio a -> a

type Rational = Ratio Integer
```

![грязь](images/pic_h_11_1.png)

## 11. Моноиды. Представители класса типов Monoid. (Лекция 7, стр. 15 | стр. 231)

**Моноид** — это множество с ассоциативной бинарной операцией над ним и нейтральным элементом для этой операции.
```Haskell
class Monoid a where
    mempty :: a            -- нейтральный элемент
    mappend :: a -> a -> a -- операция
    mconcat :: [a] -> a    -- свертка
    mconcat = foldr mappend mempty
infix 6 <>
(<>) = mappend
```

Законы моноида:
```Haskell
mempty <> x = x
x <> mempty = x
(x <> y) <> z = x <> (y <> z)
```

Пример:
```Haskell
instance Monoid [a] where
    mempty = []
    mappend = (++)
```
## 12. Свёртки списков. Правая и левая свёртки. Энергичные версии. Развертки. (Лекция 7, стр. 4 | стр. 220)

```Haskell
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr f ini [] = ini
foldr f ini (x:xs) = f x (foldr f ini xs)

foldl :: (a -> b -> b) -> b -> [a] -> b
foldl f ini [] = ini
foldl f ini (x:xs) = foldl f (f ini x) xs -- копится цепочка (f ini x)
foldl f ini (x:xs) = foldl f arg xs -- не копится
            where arg = f ini x
-- Также есть foldr1 и foldl1 для непустых списков
-- для них не требуется ini

-- развертки
unfoldr :: (b -> Maybe (a, b)) -> b -> [a]
-- пример
unfoldr (\x -> if x==0 then Nothing else Just (x,x-1)) 10
-- [10,9,8,7,6,5,4,3,2,1]
```

## 13. Класс типов Foldable и его представители. (Лекция 7, стр. 21 | стр. 240)

```Haskell
-- минимальное полное определение -- foldr или foldMap
class Foldable t where
    fold = Monid m => t m -> m
    fold = foldMap id

    foldMap :: Monoid m => (a -> m) -> t a -> m
    foldMap f = foldr (mappend . f) mempty

    foldr, foldr’ :: (a -> b -> b) -> b -> t a -> b
    foldr f z t = appEndo (foldMap (Endo . f) t) z

    foldl, foldl’ :: (a -> b -> a) -> a -> t b -> a
    foldl f z t = appEndo (getDual (foldMap (Dual . Endo . flip f) t)) z

    foldr1, foldl1 :: (a -> a -> a) -> t a -> a

    toList :: t a -> [a]

    null :: t a -> Bool
    null = foldr (\_ _ -> False) True

    length :: t a -> Int
    length = foldl’ (\c _ -> c+1) 0

    elem :: Eq a => a -> t a -> Bool

    maximum, minimum :: Ord a => t a -> a

    sum, product :: Num a => t a -> a
    sum = getSum . foldMap Sum
```

## 14. Класс типов Functor и его представители. (Лекция 8, стр. 4 | стр. 255)

```Haskell
class Functor f where
    fmap :: (a -> b) -> f a -> f b
    (<$) :: a -> f b -> f a
    (<$) = fmap . const

(<$>) = fmap

instance Functor [] where
    fmap _ [] = []
    fmap g (x:xs) = g x : fmap g xs

data Tree a = Leaf a | Branch (Tree a) a (Tree a)
instance Functor Tree where
    fmap g (Leaf x) = Leaf (g x)
    fmap g (Branch l x r) = Branch (fmap g l) (g x) (fmap g r)

instance Functor (Either e) where
    fmap _ (Left x) = Left x
    fmap g (Right x) = Right $ g x

-- Законы функторов
fmap id = id
fmap (f . g) = fmap f . fmap g
```

## 15. Класс типов Applicative и его представители. (Лекция 8, стр. 15 | стр. 266)

```Haskell
class Functor f => Applicative f where
    pure :: a -> f a
    (<*>) :: f (a -> b) -> f a -> f b
infixl 4 <*>

-- Связь Applicative и Functor
fmap g xs = pure g <*> xs

-- Законы Applicative
pure id <*> v = v
pure g <*> pure x = pure $ g x
u <*> pure x = pure ($ x) <*> u
pure (.) <*> u <*> v <*> w = u <*> (v <*> w)

-- Представители
-- список как декартово произведение
instance Applicative [] where
    pure x = [x]
    gs <*> xs = [g x | g <- gs, x <- xs]
-- список как коллекция
newtype ZipList a = ZipList {getZipList :: [a]}

instance Functor ZipList where
    fmap f (ZipList xs) = ZipList (map f xs)

instance Applicative ZipList where
    pure x = ZipList [x]
    ZipList gs <*> ZipList xs = ZipList $ zipWith ($) gs xs

-- пара
instance Monoid e => Applicative ((,) e) where
    pure x = (mempty, x)
    (u, f) <*> (v, x) = (u <> v, f x)
```

## 16. Классы типов Alternative и MonadPlus. (Лекция 9, стр. 14 | стр. 302 | стр. 389)

```Haskell
class Applicative f => Alternative f where
    empty :: f a
    (<|>) :: f a -> f a -> f a
infixl 3 <|>

instance Alternative [] where
    empty = []
    (<|>) = (++)

instance Alternative Maybe where
    empty = Nothing
    Nothing <|> m = m
    m <|> _ = m
-- идея -- тащим сквозь цепочку вызовов первый Just

-- Законы Alternative
(f <|> g) <*> a = (f <*> a) <|> (g <*> a)
empty <*> a = empty

f <$> (a <|> b) = (f <$> a) <|> (f <$> b)
f <$> empty = empty

-- MonadPlus добавляет функциональность Alternative в монады
class (Alternative m, Monad m) => MonadPlus m where
    mzero :: m a
    mzero = empty

    mplus :: m a -> m a -> m a
    mplus = (<|>)

-- законы MonadPus
mzero >>= k = mzero
v >> mzero = mzero
(a 'mplus' b) >>= k = (a >>= k) 'mplus' (b >>= k)
return a 'mplus' b = return a

-- guard позволяет остановить вычисление при невыполнении условия
--  что-то типа break
guard :: Alternative f -> Bool -> f ()
guard :: MonadPlus m -> Bool -> m () -- Haskell 2010
guard True = pure ()
guard False = empty
```

## 17. Аппликативные парсеры. (Лекция 9, стр. 4 | стр. 286)

```Haskell
newtype Parser tok a = Parser {runParser :: [tok] -> Maybe ([tok], a)}

charA :: Parser Char Char
charA = Parser f where
    f (c:cs) | c == 'A' = Just (cs, c)
    f _ = Nothing

satisfy :: (tok -> Bool) -> Parser tok tok
satisfy pr = Parser f where
    f (c:cs) | pr c = Just (cs,c)
    f _ = Nothing

char c = satisfy (== c)

instance Functor (Parser tok) where
    fmap g (Parser p) = Parser f where
        f xs = case p xs of
            Just (cs, c) -> Just (cs, g c)
            Nothing -> Nothing
    -- то же самое, но компактнее
    fmap g (Parser p) = Parser $ (fmap . fmap . fmap) g p

instance Applicative (Parser tok) where
    pure x = Parser $ \s -> Just (s, x)
    Parser u <*> Parser v = Parser f where
        f xs = case u xs of
            Nothing -> Nothing
            Just (xs' g) -> case v xs' of
                Nothing -> Nothing
                Just (xs'', x) -> Just (xs'', g x)
-- идея: сначала отработал первый парсер,
--       потом на остатке строки отработал второй

multiplication :: Parser Char Int
multiplication = (*) <$> digit <*> char '*' <*> digit

instance Alternative (Parser tok) where
    empty = Parser $ \_ -> Nothing
    Parser u <|> Parser v = Parser f where
        f xs = case u xs of
            Nothing -> v xs
            z -> z
-- <|> - пробуем разные парсеры, пока один из них не сработает

lowers :: Parser Char String
lowers = (:) <$> lower <*> lowers <|> pure ""
```

## 18. Класс типов Traversable и его представители. (Лекция 9, стр. 24 | стр. 312)

```Haskell
class (Functor t, Foldable t) => Traversable t where
    -- обеспечиваем правило коммутации нашего
    -- функтора t с произвольным аппликативным функтором f .
    -- Структура внешнего контейнера t сохраняется, а апликативные
    -- эффекты внутренних f объединяются в результирующем f .
    sequenceA :: Applicative f => t (f a) -> f (t a)
    sequenceA = traverse id

    -- это map с эффектами: проезжаем по структуре t a ,
    -- последовательно применяя функцию к элементам типа a и
    -- монтируем в точности ту же структуру из результатов типа b ,
    -- параллельно «коллекционируя» эффекты.
    traverse :: Applicative f => (a -> f b) -> t a -> f (t b)
    traverse g = sequenceA . fmap g

instance Traversable Maybe where
    traverse _ Nothing = Nothing
    traverse g (Just x) = Just <$> g x

instance Traversable [] where
    traverse _ [] = []
    traverse g (x:xs) = (:) <$> g x <*> traverse g xs

-- Законы Traversable
newtype Identity a = Identity {runIdentity :: a}

instance Functor Identity where
    fmap g (Identity x) = Identity $ g x

instance Applicative Identity where
    pure = Identity
    Identity g <*> f = fmap g v

-- собственно, законы
traverse Identity = Identity
traverse (Compose . fmap g2 . g1) =
     Compose . fmap (traverse g2) . traverse g1
t . traverse g = traverse (t . g)
```

Законы Traversable дают следующие гарантии:
* Траверсы не пропускают элементов.
* Траверсы посещают элементы не более одного раза.
* `traverse pure ≡ pure`.
* Траверсы не изменяют исходную структуру — она либо сохраняется, либо полностью исчезает.

## 19. Монады. Класс типов Monad. Законы для монад. do-нотация. (Лекция 10, стр. 4 | стр. 322)

```Haskell
class Applicative m => Monad m where
    return :: a -> m a
    return = pure

    (>>=) :: m a -> (a -> m b) -> m b

    (>>) :: m a -> m b -> m b
    m1 >> m2 = m1 >>= \_ -> m2

    fail :: String -> m a
    fail s = error s
infixl 1 >>, >>=

-- Законы Monad
return a >>= k = k a
m >>= return = m
(m >>= k) >>= k' = m >>= (\x -> k x >>= k')

-- do-нотация
do {e} = e
do {e; smth} = e >> do {smth}
do {p <- e; smth} = e >>= (\p -> do {smth})
do {let v = expr; smth} = let v = expr in do {smth}
```

## 20. Стандартные монады: Maybe и списки. (Лекция 10, стр. 22 | стр. 341)

```Haskell
instance Monad Maybe where
    (Just x) >>= k = k x
    Nothing >>= _ = Nothing

    (Just _) >> m = m
    Nothing >> _ = Nothing

    fail _ = Nothing

instance Monad [] where
    return x = [x]
    xs >>= k = concat $ map k xs
    -- под действие k может получиться много результатов
    -- в монаде сохраняются все результаты
    fail _ = []

list1 = [(x, y) | x <- [1, 2, 3], y <- [1, 2, 3], x /= y]
list2 = do
    x <- [1, 2, 3]
    y <- [1, 2, 3]
    True <- pure $ x /= y
    pure $ (x, y)
list3 = do
    a <- [1, 2, 3]
    b <- [a, 2, 3]
    pure $ (a, b)
```

## 21. Ввод-вывод в чистых языках. Монада IO. Взаимодействие с файловой системой. (Лекция 11, стр. 27 | стр. 375)

```Haskell
-- Ввод-вывод рушит всю чистоту функций
-- IO на пальцах
newtype IO a = IO (RealWorld -> (RealWorld, a))

unIO :: IO a -> RealWorld -> (RealWorld, a)

instance Monad IO where
    return x = IO $ \w -> (w, x)
    (>>=) (IO m) k = IO $
        \w -> case m w of (new_w, a) -> unIO (k a) new_w
-- монада IO магическая
-- побочиные эффекты происходят в заданном порядке
-- побочный эффект каждого действия происходит только один раз

-- ввод
getChar :: IO Char
getLine :: IO String
getContents :: IO String

-- вывод
putChar :: Char -> IO ()
putStr, putStrLn :: String -> IO ()
print :: Show a => a -> IO ()

-- ввод-вывод
interact :: (String -> String) -> IO ()

-- примеры
main = do
    putStrLn "What is your name?"
    name <- getLine
    putStrLn $ "Nice to meet you, " ++ name ++ "!"

-- дальше описывается, как имея getChar/putChar
-- сделать getLine/putStr, это просто
```

## 22. Монада Reader. (Лекция 11, стр. 4 | стр. 352)

```Haskell
newtype Reader r a = Reader { runReader :: r -> a }

reader :: (r -> a) -> Reader r a
runReader :: Reader r a -> r -> a

instance Monad (Reader r) where
    return x = reader $ \e -> x
    m >>= k = reader $ \e -> let v = runReader m e
                              in runReader (k v) e
-- каждый конкретный Reader занимается тем, что читает
-- что-то типа a из окружения (источника) типа r

-- основные функции

-- ask возвращает окружение
ask :: Reader r r

-- asks выполняет какую-то функцию над окружением
asks :: (r -> a) -> Reader r a

-- local локально внутри монады модифицирует окружение
local :: (r -> r) -> Reader r a -> Reader r a

-- примеры

-- чтение инта в строчку
simpleReader :: Reader Int String
simpleReader = reader $ \e -> "Enviroment is " + show e

-- ask возвращает окружение
ask :: Reader r r

type User = String
type Password = String
type UsersTable = [(User,Password)]

pwds :: UsersTable
pwds = [("Bill", "123"), ("Ann", "qwerty"), ("John", "2sRq8P")]
firstUser :: Reader UsersTable User
firstUser = do
    table <- ask
    pure $ fst (head table)

-- asks выполняет какую-то функцию над окружением
asks :: (r -> a) -> Reader r a

-- local локально внутри монады модифицирует окружение
local :: (r -> r) -> Reader r a -> Reader r a

usersCount :: Reader UsersTable Int
usersCount = asks length

localTest :: Reader UsersTable (Int,Int)
localTest = do
    count1 <- usersCount
    count2 <- local (("Mike","1"):) usersCount
    pure (count1, count2)

runReader localTest pwds
-- (3, 4)
```

## 23. Монада Writer. (Лекция 11, стр. 11 | стр. 359)

```Haskell
newtype Writer w a = Writer { runWriter :: (a, w) }

writer :: (a, w) -> Writer w a
runWriter :: Writer w a -> (a, w)

instance (Monoid w) => Monad (Writer w) where
    return x = writer (x, mempty)
    m >>= k = let (x, u) = runWriter m
                  (y, v) = runWriter $ k x
               in writer (y, u ‘mappend‘ v)
-- Writer позволяет выполнять вычисления над типом a
--  и записывать лог типа w

runWriter :: Writer w a -> (a, w)
-- если интересует только лог
execWriter :: Writer w a -> w

-- основные функции

-- tell записывает что-то в лог
tell :: Monoid w => w -> Writer w ()

-- listen помимо значения достает из Writer'а лог
listen :: Monoid w => Writer w a -> Writer w (a, w)

-- listens -- как listen, только еще и что-то делат с логом
listens :: Monoid w => (w -> b) -> Writer w a -> Writer w (a, b)

-- censor модифицирует существующий лог
censor :: Monoid w => (w -> w) -> Writer w a -> Writer w a

-- примеры

type Vegetable = String

type Price = Double
type Qty = Double
type Cost = Double

type PriceList = [(Vegetable, Price)]
prices :: PriceList
prices = [("Potato",13),("Tomato",55),("Apple",48)]

-- tell записывает что-то в лог
tell :: Monoid w => w -> Writer w ()

addVegetable :: Vegetable -> Qty -> Writer (Sum Cost) (Vegetable, Price)
addVegetable veg qty = do
    let pr = fromMaybe 0 $ lookup veg prices
    let cost = qty * pr
    -- записали суммарную стоимость
    tell $ Sum cost
    pure (veg, pr)

runWriter $ addVegetable "Apple" 100
-- (("Apple", 48.0), Sum {getSum = 4800.0})

-- использование addVegetable
myCart0 = do
    x1 <- addVegetable "Potato" 3.5
    x2 <- addVegetable "Tomato" 1.0
    x3 <- addVegetable "AGRH!!" 1.6
    pure [x1, x2, x3]
runWriter myCart0
-- ([("Potato", 13.0),("Tomato", 55.0),("AGRH!!",0.0)],
--  Sum {getSum = 100.5})

-- listen помимо значения достает из Writer'а лог
listen :: Monoid w => Writer w a -> Writer w (a, w)

myCart1 = do
    return expression
    x1 <- listen $ addVegetable "Potato" 3.5
    x2 <- listen $ addVegetable "Tomato" 1.0
    x3 <- listen $ addVegetable "AGRH!!" 1.6
    pure [x1,x2,x3]
runWriter myCart1
-- ([(("Potato", 13.0), Sum {getSum = 45.5}), (("Tomato", 55.0),
--     Sum {getSum = 55.0}), (("AGRH!!", 0.0), Sum {getSum = 0.0})],
--  Sum {getSum = 100.5})

-- listens -- как listen, только еще и что-то делат с логом
listens :: Monoid w => (w -> b) -> Writer w a -> Writer w (a, b)
myCart1' = do
    x1 <- listens getSum $ addVegetable "Potato" 3.5
    x2 <- listens getSum $ addVegetable "Tomato" 1.0
    x3 <- listens getSum $ addVegetable "AGRH!!" 1.6
    pure [x1,x2,x3]
runWriter myCart1’
-- ([(("Potato", 13.0), 45.5),
--   (("Tomato", 55.0), 55.0),
--   (("AGRH!!", 0.0), 0.0)],
--  Sum {getSum = 100.5})

-- censor модифицирует существующий лог
censor :: Monoid w => (w -> w) -> Writer w a -> Writer w a

discount proc (Sum x) = Sum $ if x < 100 then x
                              else x * (100 - proc) / 100
myCart0' = censor (discount 10) myCart0
execWriter myCart0
-- Sum {getSum = 100.5}
execWriter myCart0’
-- Sum {getSum = 90.45}
```

## 24. Монада State. (Лекция 11, стр. 20 | стр. 368)

```Haskell
newtype State s a = State { runState :: s -> (a, s) }

state :: (s -> (a, s)) -> State s a
runState :: State s a -> s -> (a, s)

instance Monad (State s) where
    return x = state $ \st -> (x, st)
    m >>= k = state $ \st -> let (x, st') = runState m st
                                  m' = k x
                             in runState m’ st’
-- State хранит в себе какое-то состояние в виде пары
-- (a -- итоговое значени, s -- состояние)

-- запуск, для всех запусков требуется указать начльное состояние
runState :: State s a -> s -> (a, s)
execState :: State s a -> s -> s
evalState :: State s a -> s -> a

-- основные функции

-- get вытаскивает состояние
get :: State s s
get = state $ \s -> (s, s)

-- put кладет новое состояние
put :: s -> State s ()
put s = state $ \_ -> ((), s)

-- modify меняет состояние
modify :: (s -> s) -> State s ()
modify f = do
    s <- get
    put (f s)

-- вычисляет функцию над состоянием, кладет резльтат в результат (лол)
gets :: (s -> a) -> State s a
gets = do
    s <- get
    pure $ f s

-- примеры
tick :: State Int Int
tick = do
    n <- get
    put (n + 1)
    pure n
runState tick 3
-- (3, 4)
succ' :: Int -> Int
succ' n = execState tick n

plus :: Int -> Int -> Int
plus n x = execState (sequence $ replicate n tick) x

-- для удобства есть
replicateM :: (Monad m) => Int -> m a -> m [a]
replicateM n = sequence . replicate n

plus' :: Int -> Int -> Int
plus' n x = execState (replicateM n tick) x
```

## 25. Монада Except. (Лекция 12, стр. 4 | стр. 395)

```Haskell
newtype Except e a = Except { runExcept :: Either e a}
except :: Either e a -> Except e a
except = Except

instance Monad (Except e) where
    return a = Except $ Right a
    m >>= k = case runExcept m of
                Left e -> Except $ Left e
                Right x -> k x
-- Except -- монада с состоянием типа a и исключением типа e
-- исключение пробрасывается через все вычисления

-- основные функции

-- throwE выбрасывает исключение
throwE :: e -> Except e a
throwE = except . Left

-- catchE ловит исключение с заданным обработчиком
catchE :: Except e a -> (e -> Except e' a) -> Except e' a
m 'catchE' h = case runExcept m of
    Left l -> h l
    Right r -> Except $ Right r

-- исполльзование
do { action1; action2; action3 } 'catchE' handler

-- расширение функциональности
instance Monoid e => MonadPlus (Except e) where
    mzero = Except $ Left mempty
    Except x 'mplus' Except y = Except $
        case x of
            Left e -> either (Left . mappend e) Right y
            r -> r
-- mzero -- ошибка по-умолчанию
-- mplus -- накопление ошибок слева направо
--   если где-то произошла удача, что она и возвращается

-- пример
data DivByError = ErrZero | Other String deriving (Eq,Show)

(/?) :: Double -> Double -> Except DivByError Double
x /? 0 = throwE ErrZero
x /? y = return $ x / y

instance Monoid DivByError where
    mempty = Other ""
    Other s1 ‘mappend‘ Other s2 = Other $ s1 ++ s2
    Other s1 ‘mappend‘ ErrZero = Other $ s1 ++ "zero;"
    ErrZero ‘mappend‘ Other s2 = Other $ "zero;" ++ s2
    ErrZero ‘mappend‘ ErrZero = Other $ "zero;zero"

example2 :: Double -> Double -> Except DivByError String
example2 x y = action ‘catchE‘ handler where
    action = do
        q <- x /? y
        guard $ y>=0
        pure $ show q
    handler = \err -> return $ show err

runExcept $ example2 5 0
-- Right "ErrZero"
runExcept $ example2 5 (-2)
-- Right "Other \"\""
runExcept $ msum [5/?0, 7/?0, 2/?0]
-- Left (Other "zero;zero;zero;")
runExcept $ msum [5/?0, 7/?0, 2/?4]
-- Right 0.5
```

## 26. Трансформеры монад. Библиотеки transformers и mtl. (Лекция 12, стр. 24 | стр. 409)

**Трансформер монад** -- конструктор типа, который принимает одну монаду и возвращает другую
* Кайнд трансформера `(* -> *) -> (* -> *)`
* Для любой монады `m` `t m` является монадой
* Нужен `lift :: m a -> t m a`, поднимающий значение из исходной монады в трансформированную

```Haskell
-- трансформер для какой-то MyMonad
newtype MyMonadT m a = MyMonadT {runMyMonadT :: m (MyMonad a)}

instance (Monad m) => Monad (MyMonadT m) where
    return x = ... -- упаковать x во внутреннюю монаду
    mx >>= k = ...

class MonadTrans t where
    lift :: (Monad m) => m a -> t m a

instance MonadTrans t MyMonadT where
    lift mx = ...

-- законы для lift
lift . return = return
lift (m >>= k) = lift m >>= (lift . k)

-- пример для MaybeT

newtype MaybeT m a = MaybeT { runMaybeT :: m (Maybe a)}

MaybeT :: m (Maybe a) -> MaybeT m a
runMaybeT :: MaybeT m a -> m (Maybe a)

instance MonadTrans MaybeT where
    lift :: m a -> MaybeT m a
    lift = MaybeT . liftM Just

instance (Monad m) => Monad (MaybeT m) where
    fail :: String -> MaybeT m a
    fail _ = MaybeT $ pure Nothing

    return :: a -> MaybeT m a
    return = lift . return

    (>>=) :: MaybeT m a -> (a -> MaybeT m b) -> MaybeT m b
    mx >>= k = MaybeT $ do
        v <- runMaybeT mx
        case v of
            Nothing -> pure Nothing
            Just y -> runMaybeT $ k y

-- пример использования
-- mbSt увеличивает состояние на единицу и возвращает Nothing, если оно < 3
mbSt :: MaybeT (StateT Integer Identity) Integer
mbSt = do
    lift $ modify (+ 1)
    a <- lift get
    True <- pure $ a >= 3
    -- можно юзать guard, если (MaybeT m) -- это MonadPlus
    pure a

runIdentity $ evalStateT (runMaybeT mbSt) 0
-- Nothing
runIdentity $ evalStateT (runMaybeT mbSt) 2
-- Just 3

instance (Monad m) => MonadPlus (MaybeT m) where
    mzero = MaybeT $ pure Nothing
    x 'mplus' y = MaybeT $ do
        v <- runMaybeT x
        case v of
            Nothing -> runMaybeT y
            Just _ -> pure v

mbSt' :: MaybeT (StateT Integer Identity) Integer
mbSt' = do
    lift $ modify (+ 1)
    a <- lift get
    guard $ a >= 3
    pure a

-- для любой пары монад можно реализовать интерфейсы,
-- которые избавляют от необходимости писать lift
class Monad m => MonadState s m | m -> s where
    get :: m s
    put :: s -> m ()
    state :: (s -> (a, s)) -> m a

instance (MonadState s m) => MonadState s (MaybeT m) where
    get = lift get
    put = lift . put

mbSt'' :: MaybeT (StateT Integer Identity) Integer
mbSt'' = do
    modify (+ 1)
    a <- get
    guard $ a >= 3
    pure a
```

## 27. Линзы ван Лаарховена. (Лекция 15, стр. 15 | стр. 513)

**Линза** -- инструмент для манипулирования подструкторой некоторой структуры данных. Линзы лежат в модуле `Control.Lens`
```Haskell
-- _1 и _2 -- линзы для обращения к элементу пары
view _1 (7, 8)
-- x = 7
view (7, 8) ^. _2
-- y = 8

-- композиция линз -- тоже линза
-- линзы применяются слева направо
x = (_1 . _2) ((7, 8), 9)
-- x = 8

-- s ^. l = view $ l s
((7, 8), 9) ^. _1
-- (7, 8)
((7, 8), 9) ^. _1 . _2
-- 8

-- линзы позволяют модифицировать элементы
set :: Lens t a -> t a -> t a -- оператор (.~)

set _1 "hello" (7, 8)
-- ("hello", 8)

over :: Lens t a -> (a -> b) -> t a -> t b -- оператор (%~)
over _1 (^2) (7, 8)
_1  %~ (^2) $ (7, 8)
-- (49, 8)

-- линза -- это АТД с парой геттер-сеттер
lens :: (s -> a) -> (s -> a -> s) -> Lens s a

-- законы линз
view l (set l v s) = v
set l (view l s) s = s
set l v' (set l v s) = set l v' s
```

**Линзы ван Лаарховена** -- функции, которые превращают вложение `a` в функтор `f` во вложение `s` в этот функтор.
```Haskell
type Lens s a = forall f . Functor f => (a -> f a) -> s -> f s
lens :: (s -> a) -> (s -> a -> s) -> Lens s a
lens get set = \ret s -> fmap (set s) (ret $ get s)

-- пример для пар
_1 :: Lens (a, b) a
_1 = lens (\(x, _) -> x) (\(_, y) v -> (v, y))

-- как вынуть из линзы геттер и сеттер
newtype Const a x = Const { getConst :: a }
instance Functor (Const a) where
    fmap _ (Const v) = Const v

view :: Lens s a -> s -> a
view lns s = getConst (lns Const a)

newtype Identity a = Identity { runIdentity :: a }

instance Functor Identity where
    fmap f (Identity x) = Identity (f x)

over :: Lens s a -> (a -> a) -> s -> s
over lns fn s = runIdentity $ lns (Identity . fn) s

set :: Lens s a -> a -> s -> s
set lns a s = over lns (const a) s
```
