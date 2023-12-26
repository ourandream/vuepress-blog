---
title: CLRS
tag: algorithm
category: reading
mathjax: true
abbrlink: ab8a63f3
date: 2021-12-23
updated: 2022-04-05
---

CLRS 算是非常难读的一本书了，书中的数学证明真的是多的要死，而且看起来真的没啥规律可循。
据网上说这本书算是给你开了一扇算法的大门，然后门里的大风差点吹飞你。
只能看懂多少写多少了。

<!--more-->

# Ⅰ Foundation Introduction

## 2 Getting Started

### 2.1 Insertion sort

#### 简述

insertion sort 在一个数组的第 j 个数中，将 j 按顺序插入它前面的 1..j-1 的数组,j 从 2 到 n 重复此操作
即不断将一个数有序插入一个有序数组,这样结果也会是有序的
它的 order of growth 是$\Theta(n^2)$

#### Loop invariant

用于证明 algorithm 的正确性,有以下三个性质:
Initialization:在第一次迭代前是正确的
Maintenance:如果在某次迭代前是正确的，则在迭代后仍是正确的
Termination:通过前面的分析,得到有用的性质证明在结束时是正确的

Insertion sort 的正确性可用此证明

### 2.2 Analyzing algorithms

#### RAM Model

算法运算的模拟环境,只有简单的语句和功能,单线程

#### Runing-time analyze

可假设第 i 个语句执行一次的时间为$c_i$
若执行次数不确定,可假设每次循环中执行时间为$t_i$
然后确定执行次数并相加,得到一个式子
找到执行实现最长的情况,只处理幂最大的项,忽略常数,得到==order of growth==,如$\Theta(n)$

要找执行时间最长的情况有以下几个原因:

> 1.  这样可确定一个执行时间的上界,不用担心超时
> 2.  有些算法的最差情况发生的非常频繁
> 3.  平均情况经常和最差情况差不多

### 2.3 Designing algorithms

#### Divide and conquer

分为三个步骤：

> divide:把问题分为子问题
> conquer:递归地解决子问题,当子问题分得足够小时,可以直接简单解决
> combine:利用子问题的答案解决问题

#### Merge sort

将数组分为两部分,那两部分再继续分,知道分到只剩下一个数为止
一个数可以视为一个有序数组
再利用 merge 操作解决子问题
merge 操作即不断比较两个有序数组的最小数,将小的那一个填充进新数组,这样就可以合并两个有序数组
它的 order of growth 是$\Theta(nlgn)$注意 lg 指$log_2$

## 3 Growth of Functions

### 3.1 Asymptotic notation

#### definition

| 记号           |                                                       | 定义                                                            |
| -------------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| $\Theta(g(n)$  | Asymptotic tight bound                                | $当n\ge n_0存在0\le c_1g(n)\leq f(n) \le c_2g(n)(c_1\;c_2\ge0)$ |
| $O(g(n))$      | Asymptotic upper bound                                | $当n\ge n_0存在0\le f(n) \le c_2g(n)(c_2\ge0)$                  |
| $\Omega(g(n))$ | Asympotic lower bound                                 | $当n\ge n_0存在0\le c_1g(n)\leq f(n)(c_1\ge0)$                  |
| $o(g(n))$      | $\lim_{n\rightarrow \infty }\frac{f(n)}{g(n)}=0$      | $当n\ge n_0对所有c_2,0\le f(n) < c_2g(n)(c_2\ge0)$              |
| $\omega(g(n))$ | $\lim_{n\rightarrow \infty }\frac{f(n)}{g(n)}=\infty$ | $当n\ge n_0对所有c_1,0\le c_1g(n)< f(n)(c_1\ge0)$               |

注意其中的 g(n),f(n)都是**asymptotic positive**,即存在$n_0$,当$n\ge n_0$时,函数值为正
对于一个$f(n)=an^2+bn+c$,除$n^2$外都可被忽略,因当 n 足够大时,它们的影响很小,它们只会在定值范围内$改变c_1,c_2$的值.

#### properties

> Transitivity
> $f(n)=\Theta(g(n)),g(n)=\Theta(t(n)) \Rightarrow f(n)=\Theta(t(n)$
> 对其他的记号也有类似结论
> Reflexivity
> $f(n)=\Theta(g(n)) \Leftrightarrow f(n)=O(n),f(n)=\Omega(g(n)$
> Symmetry
> $f(n)=\Theta(g(n)) \Leftrightarrow g(n)=\Theta(f(n))$
> Transpose symmetry
> $f(n)=O(g(n)) \Leftrightarrow g(n)=\Omega(f(n)$ >$f(n)=o(g(n)) \Leftrightarrow g(n)=\omega(f(n)$

### 3.2 Standard notation and common functions

#### 较为熟悉的数学内容

Monotonicity(单调性)
Polynomials(多项式)
Exponentials(指数)
Logarithm(对数)
注意在增长速率上$指数\ge 多项式 \ge 对数$

#### 不太熟悉的数学内容

##### flooring and ceiling

floor(向左取整),ceiling(向右取整),一个取较小整数,一个取较大的
符号分别为:$\lfloor\;\rfloor$ $\lceil \;\rceil$

properties:

> $\lfloor \frac{\lfloor \frac{x}{a}\rfloor}{b}\rfloor=\lfloor \frac{x}{ab} \rfloor$ >$\lceil \frac{\lceil \frac{x}{a}\rceil}{b}\rceil=\lceil \frac{x}{ab} \rceil$ >$\lceil \frac{a}{b} \rceil \le \frac{a+(b-1)}{b}$ >$\lfloor\frac{a}{b} \rfloor \ge \frac{a-(b-1)}{b}$

##### modular arithmetic

即求余数
$a\mod b=a-n\lfloor \frac{a}{n} \rfloor$

注意余数相同可记为:
$a \equiv b(mod\;n)$
不相同记为:
$a \not\equiv b(mod\;n)$

##### factorial

即阶乘
Stirling's approximation:
$n!=\sqrt{2\pi n}(\frac{n}{e})^n(1+\Theta(\frac{1}{n}))$

##### literated logarithm function

Functional iteration:
$f^{(i)}(x)=\begin{cases} n\;when\;i=0\\f(f^{i-1}(n) )\;when\;i> 0) \end{cases}$

literated logarithm function
$lg^*n=min(i\ge0 :lg^{(i)}(n)\le 1)$
它增长得非常缓慢

##### Fibonacci number

即一系列数满足:
$F_0=0,F_1=1,F_n=F_{n-1}+F_{n-2} for\;i\ge2$

它与 golden ratio(黄金分割比)
即$x=x^2+1$的两根$\phi\;\hat\phi(前正后负)$有如下关系:
$F_i=\frac{\phi^i-\hat\phi^i}{\sqrt{5}}$
又由$\frac{|\hat\phi^i|}{\sqrt{5}}<\frac{1}{2}$
得$F_i=\lfloor \frac{\phi^i}{\sqrt{5}}+\frac{1}{2}\rfloor$

## 4 Divide and conquer

分为三个步骤：

> divide:把问题分为子问题
> conquer:递归地解决子问题,当子问题分得足够小时,可以直接简单解决
> combine:利用子问题的答案解决问题

recursive case:子问题大到足够递归解决
base case:子问题小到不能递归解决
recurrence:equation 或者 inequality 表达一个函数,该函数由更小的 input 构成,用于表达 running time
解决方法:

> substitution method:我们猜测一个界限然后用数学归纳法证明
> recursive method:利用递归树确定界限
> master method:解决类似$T(n)=aT(\frac{n}{b})+f(n)$的 bound

注意解决 recurrence 时,我们经常会忽略取整,小的 input 的值等细节,因为这些一般对结果无影响,但我们需要证明这些细节确实没有影响

### 4.3 Substitution method for solving recurrence

核心就是猜范围,然后利用 mathematical induction(数学归纳法)证明
例子:

> $T(n)=2T(\lfloor \frac{n}{2} \rfloor)+n$
> 猜测$T(n)=\Theta(nlgn)$
> 则$T(n)=2T(\lfloor \frac{n}{2} \rfloor)+n\le 2(c\frac{n}{2}.lg(\frac{n}{2}))+n=cnlgn-cnlg2+n$
> 故$T(n)\le cnlgn(c\ge1)$
> 注意当 n=1 时不成立,故可让$n\ge n_0=2$,,然后以此解决 n 较小的情况

想要更好的猜测,可以用相似式子的结果来进行猜测,也可以先猜上下界然后一步步缩小猜测

类似$T(n)=T(n/2)+T(n/2)+1$的式子证明时可将$\Theta(n)写成cn-d$

注意$T(n)\le cn+n\Rightarrow T(n)=O(n)$是错误的,要注意避免陷阱

类似$T(n)=T(\lfloor \sqrt{n/2} \rfloor)$的式子可让$n=2^m$

### 4.4 Recursion tree

画出 recurrence 的 recusive tree，然后计算每一层的 cost，然后相加得到一个猜测，然后再用 substitution method 求解

### 4.5 Master method

对于形如$T(n)=aT(n/b)+f(n)$的式子(忽略取整),有如下方法可以 solve recurrence:

> 若$f(n)=O(n^{log_ba-\varepsilon})$,其中$\varepsilon>0$,且可任意取,则$T(n)=\Theta(n^{log_ba})$
> 若$f(n)=\Theta(n^{log_ba}),则T(n)=\Theta(n^{log_ba}lgn)$
> 若$f(n)=\Omega(n^{log_ba+\varepsilon}),其中\varepsilon>0$,且可任意取,且对于足够大的 n,有$c<1$满足$af(n/b)<cf(n)$,则$T(n)=\Theta(f(n))$

注意上面的对于 f(n)和$n^{log_ba}$的比较需要是 polynomial 的,若不是则不适用.
如$nlgn和n$,计算$nlgn/n=lgn$,对于任何的$n^{\varepsilon}(\varepsilon>0)$,$lgn$都是 asymptomatic smaller

### 4.6 Proof of master method

证明思路大概是先画出递归树写出表达式，任何列出调节一步步证明
先在$n=b^j$的情况下证明
然后证明取整操作对证明无影响

## 5 Probabilistic analysis and randomized algorithms

### 5.1 The hiring problem

average running-time：当输入在概率上是随机的时
expected running-time：当算法的选择是随机的时使用

### 5.2 Indicator random variables

indictor random variables 是一个数学工具，定义如下：

> 设 S 为一个 space,A 为一个 event,则 indicotr random variable $I\{A\}=X_A=\begin{cases}1,when\;A\;happen\\0,when A \;don't\;happen\end{cases}$
> 而它的 expected value 有:
> $E[X_A]=pr\{A\}$
> 根据 linearity of expection,可做如下操作:
> $E[\sum_{i=1}^nX_i]=\sum_{i=1}^nE[X_i]$

### 5.3 Randomized algorithm

形成随机数组有两种办法
一是产生一个随机的权重序列,然后借助权重序列重新排序数组
证明该算法产生数组可先证明对于一个特定的数组序列(如和原来一致)的 probability 为$1/n!$,然后证明对每一个序列,上面的证明均适用
二是遍历数组,对于数组中的第 i 个元素,随机地与[i,n]范围的元素进行交换
证明利用 loop invariant,证明在过程中产生特定序列的可能性为$(n-i+1)!/n!$,这样 termination 时,产生特定序列的可能性为$1/n!$

### 5.4 Probabilistic analysis and further uses of indicator random variable

**birthday paradox**

即房间内有多少人时其中中有两个人生日相同的概率超过 1/2
使用 probabilistic analysis,设$B_k$为 k 个人在总数为 n 的年份中生日不同的事件,$A_i$为第 i 个人生日与前面的人生日都不相同的事件,则有:

> $pr\{B_k\}=pr\{B_{k-1}\}pr\{A_k|B_{k-1}\}$

易得$pr\{B_k\}=1*(1-1/n)(1-2/n)(1-3/n)..(1-(k-1)/n$
再由$1+x\le e^x$,得

> $pr\{B_k\}\le 1*e^{1-1/n}..e^{1-(k-1)/n}=e^{k(k-1)/2n}$

故要使$pr\{B_k\}\ge 1/2$,则有$k(k-1)/2n\ge ln1/2$,解得当 n=365 时$k\ge 23$

使用 indicator random variable,设$X_{ij}$为第 i 个人和第 j 个人生日相同的 indicator random variable,则$E[X_{ij}]=\sum_{i=1}^{n}1/n^2=1/n$,故

> $E[X]=E[\sum_{i=1}^{k}\sum_{j=i+1}^{k}X_{ij}]=\sum_{i=1}^{k}\sum_{j=i+1}^{k}E[X_{ij}]=k(k-1)/2n$

由$k(k-1)/2n\ge 1$解得当 n=365 时$k\ge 28$

**ball and bins**
该问题即扔 ball 进入 bin，进入每个 bin 的几率相同，问让每一个 bin 都有至少一个小球需要扔多少次
用到两个公式：

> E[X_1]=1/p
> E[X_2]=np
> $\sum_{i=1}^n1/i=lnn+O(1)$
> 其中,p 是每次成功的概率,$X_1$是成功一次需要的尝试次数,$X_2$是 n 次尝试成功的次数

设有 b 个 bin
设第 i-1 个 bin 有 ball 到第 i 个 bin 都 ball 中间的尝试为 stage,易得第一个 stage 只包含第一次尝试
接下来的每个 stage,有 b-i+1 个 bin 没有求,故成功概率为(b-i+1)/b
设$n_i$为第 i 个 staged 尝试次数,则由上面的公式由:

> $$E[n_i]=b/(b-i+1)$$

所有尝试的次数的 expected num 为:

> $$E[\sum_{i=1}^bn_i]=\sum_{i=1}^bE[n_i]\\=\sum_{i=1}^bb/(b-i+1)\\=b\sum_{i=1}^b1/i\\=b(lnb+O(1))$$

故需要 blnb 次尝试

**Streaks**
该问题即找出扔 n 次 conins 其中出现的最大的正面朝上的 streak,即连续正面朝上的最大长度
最后结果是$\Theta(lgn)$

先证 upper bound
设$pr\{A_ik\}$为第 i 个位置开始 streak 长度的 k 的概率,易得为$1/2^k$
则对于$k=2\lceil lgn \rceil$,有:

> $$pr\{A_i2\lceil lgn \rceil\}\le 1/n^2$$

则可得 k 的长度至少为$2\lceil lgn \rceil$的 probability 为至多 1/n

设 L 为 streak 最大长度,则有:

> $$
> E[L]=\sum_{j=1}^njPr\{L_j\}\\=\sum_{j=1}^{2\lceil lgn \rceil-1}jPr\{L_j\}+\sum_{i=2\lceil lgn \rceil}^njPr\{L_j\}\\\le 2\lceil lgn \rceil\sum_{j=1}^{2\lceil lgn \rceil-1}Pr\{L_j\}+n\sum_{i=2\lceil lgn \rceil}^nPr\{L_j\}\\
> \le 2\lceil lgn \rceil*1+n*1/n=O(lgn)
> $$

其中第三行的式子用了所有概率加起来小于等于 1 的性质

后证 lower bound

我们将 n 分为$\lfloor lgn/2 \rfloor$长度的多部分
根据上面的分析易得第 i 个位置开始的有$\lfloor lgn/2 \rfloor$长度 streak 的概率为$ 1/\sqrt{n}$
故上面分的每部分都不是 streak 的概率为:

> $$(1-1/\sqrt{n})^{\lfloor n/ \lfloor lgn/2 \rfloor \rfloor}\\\le (1-\sqrt{n})^{2n/lgn-1}$$

再由$1+x\le e^x$,得

> $$
> above\le e^{-(2n/lgn-1)/\sqrt{n}}
> \\=O(1/n)
> $$

故 streak 最长为$\lfloor lgn/2 \rfloor$的概率为

> $$\sum_{i=\lfloor lgn/2 \rfloor+1}^njPr\{L_j\}\ge 1-O(1/n)$$

则类似上面的分析得到 lower bound

> $$
> E[L]=\sum_{j=1}^njPr\{L_j\}
> \\=\sum_{j=1}^{\lfloor lgn/2 \rfloor}jPr\{L_j\}+\sum_{i=\lfloor lgn/2 \rfloor+1}^njPr\{L_j\}
> \\\ge 0+\lfloor lgn/2 \rfloor\sum_{i=\lfloor lgn/2 \rfloor+1}^njPr\{L_j\}
> \\ =\Omega(lgn)
> $$

**on-line hiring problem**
是之前 hiring problem 的演化，这次不每次 interview 都雇佣，全部只雇佣一次，每次不雇佣的话都会明确拒绝，要求找出方法有尽可能大的 probability 雇佣的最好的人
我们假设我们能给每个人一个独一的 score 代表它的好坏
给出的策略是先 interview 前 k 个人，并全部拒绝并记录它们中最大的 score，然后在后面的人中，一旦遇到比前面的 score 大的马上雇佣，若没有，则雇佣第 n 个人
问题是如何选择这个 k

设在第 i 个位置雇佣到最好的人的 event 为$S_i$,容易想到我们不可能在前 k 个位置雇佣到,故 S 发生的概率为:

> $$Pr\{S\}=\sum_{i=k+1}^nPr\{S_i\}$$

设$B_i$为第 i 个人为最好的 event,容易看出概率为 1/n,设$O_i$为前 i-1 个人中最好的人在前 k 个(保证 i 之前不进行雇佣),则它的概率为$k/(i-1)$

故有:

> $$
> pr\{S_i\}=k/n(i-1)\\
> Pr\{S\}=\sum_{i=k+1}^nk/n(i-1)\\
> =k/n\sum_{i=k}^{n-1}1/i
> $$

利用不等式

> $$\int_k^n1/xdx\le \sum_{i=k}^{n-1}1/i$$

得

> $$k/n(lnn-lnk)\le Pr\{S\}$$

求导可得出当$k=n/e$时得到最大,此时概率为至少 1/e

# Ⅱ Sorting and order statistic introduction

一个数组 sort in place 当且仅当它 sort 时只有确定数量的元素存储在数组之外

## 6 Heap sort

### 6.1 Heaps

heap 是一种基于 complete binary tree 的数据结构
complete binary tree 的定义如下：

> 一颗 binary tree,若它除了最下面一层的 nodes,其余 nodes 均有左右 chiild,且最后一层的 nodes 均尽量偏左(即能在较左边就在较左边),则只有的 bianry tree 为 complete binary tree

heap 就是利用 complete binary tree 来存储数组
heap 可以很轻松地计算节点在数组中的 index:

> 若 parent 节点的 index 为$i$,则它的 left child 为$2i$,right child 为$2i+1$
> 若 child 节点的 index 为 i,则 parent 节点的 index 为$\lfloor i/2 \rfloor$

max-heap 满足如下定义:

> $A[parent[i]]\ge A[i]$,即 parent 节点不小于 child 节点

min-heap 定义与 max-heap 正好相反
两种 heap 的性质有所不同,若需要用到这些不同的性质,需要说明 heap 的种类

### 6.2 Maintaining the heap property

max-heapity 操作,先假设某个节点的两个 child 为 root 形成的 binary tree 都是 max-heap,比较该节点与两个 child.
若该节点为最大,则该节点为 root 形成的 binary tree 为 max-heap.
若不是,则交换最大的节点对应元素与该节点对应的元素,然后对交换的那个节点继续进行 max-heapity 操作
最坏情况下,child 节点的 size 为 2n/3,故 running time function 满足:

> $T(n)=T(2n/3)+\Theta(1)$

根据 master method,算得 running time 为$O(lgn)$,可用高度 h 代替写成$O(h)$(h 约等于 lgn)

### 6.3 Building a heap

通过调用 max-heapity 来构造 max-heap:

> 从 i=$\lfloor n/2\rfloor$(即除 leaf 节点外 index 最大的节点)开始到 i=0,依次调用 max-heapity(A,i)

initialization:通过 loop invariant 证明正确性,首先 leaf 节点显然是 max-heap
maintenance:然后调用一次会让 i 节点形成的 binary tree 成为 max-heap
termination:最后,当 i=0 时,整个 binary tree 会是 max-heap

min-heap 可通过类似操作制造
制造 heap 需要$O(n)$的 running time
首先深度 h 至多为$\lfloor lgn \rfloor$,每个深度的 node 至多为$\lfloor n/2^{h+1}\rfloor$,故 running time 可写为:
$\sum_{h=1}^{\lfloor lgn \rfloor}\lfloor n/2^{h+1}\rfloor O(h)=n\sum_{h=1}^{\lfloor lgn \rfloor}\lfloor 1/2^{h}\rfloor$,然后对后面的$\sum$加式根据公式求极限,得 lim=2,故 running time 为 O(n)

### 6.4 Heap sort

利用 build max heap 和 max-heapity,先利用数组 A(length=n)建立一个 max-heap,然后将 A[n]与 A[1]交换,然后让 heap size 减一,n 也减一,重复操作
可以简单地根据 build max heap 和 max-heapity 的 running time 得出 heap sort 的 running time 为 O(nlgn)

### 6.5 priority queue

priority queue 即一个维持一个 set 的元素性质的数据结构,每个元素对应量为 key
它可认为是一个事件序列，事件的 key 代表事件的优先级
max-priority queue 满足如下性质：

> 可进行 INSERCT(S,x)操作,插入一个值到其中
> MAXIMUM(S)操作,返回最大值
> EXTRACT-MAX(S)返回并去除最大值
> INCREASE-KEY(S,x,k),将 x 的 key 换为 k,k 需要大于等于原来的 key

四个操作可用 max-heap 实现
第二个直接返回 A[1]即可
第三个返回 A[1],并将 A[1]与 A[heap-size]交换,然后将 heap-size 减一然后调用 max-heaprity(A,1)操作
第四个将 A[x]的 key 换为 k 后,将 A[x]与它的 parent 比较,若大则交换并继续比较,直到小或者到 A[1]
第一个将 heap-size 加一,并将最后一个值设为无穷小,然后调用 INCREASE-KEY(S,heap-size,x)即可
除第二个操作是$\Theta(1)$外,其他操作均拥有$O(lgn)$的 running-time

## 7 Quicsort

### 7.1 Description of quicksort

quicksort 利用 divide and conquer,先将数组分为大于标志变量和小于标志变量的两部分,然后对那两部分继续使用 quicksort,直到分到最小为止
它最差的情况下 running time 为$\Theta(n^2)$,expected running time 为$\Theta(nlgn)$
partition 的操作可按如下步骤:

> 设数字的 index 最左为 p,最右为 r,设 A[r]为标志变量,i=p-1,j=p
> 然后比较 A[j]和 A[r],若大则与 A[++i]交换,若小则不操作,然后将 j 的值+1
> 当 j=r 时停止操作,然后将 A[r]与 A[i+1]交换

该操作需要$\Theta(n)$的 running time
可用 loop invariant 证明它的正确性,即证明它维持$A[k]\le A[r](k=p..i)$,$A[k]\ge A[r](k=i+1..j-1)$

### 7.2 Performance of quicksort

quicksort 的 running time 取决于 partition 的结果
当情况最差,即 partition 只分出一个部分即:

> $T(n)=T(n-1)+\Theta(n)$

此时 running time 为$\Theta(n^2)$

当情况最好,即 partition 分成均匀的两部分,即:

> $T(n)=2T(n/2)+\Theta(n)$

利用 master method 算得 running time 为$\Theta(nlgn)$

一般情况下的 running time 和最好时的较接近
如若假设 partition 分成了 1/10 和 9/10,利用 recursion tree 可算得 running time 为$O(nlgn)$

### 7.3 A randomized version of quicksort

添加一个操作,即在每次 partition 之前,先将 A[r]与数组中随机一个一个数进行交换,然后再进行 partition,这样可让 partition 分出的两部分比较 balance

### 7.4 Analysis of quicksort

## 8 Sorting in linear time

### 8.1 Lower bounds of sorting

**comparison sort**:用比较来决定元素顺序的 sort algorithm
**decision tree**:表示算法比较过程的 full binary tree(每个节点有 0 或 2 个 child)，每个节点代表一个比较，形如 1:2,其中的数字代表比较的两个元素$1\le i,j\le n$,若$\le$向左走,若$>$向右走,leaf 节点代表比较形成的序列,形如<1,3,2>
对于一个正确的 sort algorithm,必须至少有$n!$个可以到达的不同的 leaf 节点

对于一个 comparison sort,在 worst cases 有$\Omega(nlgn)$的 running time

> 利用 decision tree 证明,到达一个 decision tree 的 leaf 的路径的最大长度等同与 tree 的高度 h,设 decision tree 有 l 个 leaf,根据上面的说明,有:
> $$n!\le l\le 2^h$$
> 故$h\ge lg(n!)=\Omega(nlgn)$

### 8.2 counting sort

counting sort 假设要 sort 的元素满足$0\le t\le k$,如何利用一个 C[k]数组存储数字 i 有多少个大于等于它的元素,这样的话要 sort 直接放在 C[k]存储的位置即可
这个 sort algorithm 没有比较发生,故没有$\Omega(nlgn)$的限制,它的 running time 为$\Theta(n)$
这个 sort 是 stable 的,即要 sort 的数组中相同的元素 sort 后仍按原来的顺序排列

### 8.3 Radix sort

这个 algorithm 被用于早期的 card-sort machine
核心是从数字的最后一位开始,根据该位数字进行 sort,然后提高一位继续 sort,直到最高位
注意用于 sort 的 algorithm 必须是 stable,不然会出错

它的 running time 为$\Theta(d(n+k)$,其中 d 是位数,k 是每位数的大小,更精确一点,$\Theta((b/r)(n+2^r))$,其中 b 是数字的 bits,r 是每位数字的 bits
当$b\le \lfloor lgn \rfloor$,取 r=b 得$\Theta(n)$
当$b>\lfloor lgn \rfloor$,取$r=\lfloor lgn \rfloor$得$\Theta(bn/lgn)$

注意 radix sort 一般是**not in place**的

### 8.4 Bucket sort

对一组在一定范围的数字,将一定范围分成 n 个相同的部分,作为 bucket,然后将数字放入各个 bucket,对各个 bucket 的数字分别排序,然后借助 bucket 的大小关系完成排序
bucket sort 假设输入的数字 uniform distribution,即每个数字属于某个 bucket 的可能性是相同的
它的 running time 为$\Theta(n)+\sum_{i=0}^{n-1}E(O(n_i^2))$

利用 indicator random variable，可算得$\sum_{i=0}^{n-1}E(O(n_i^2))=\sum_{i=0}^{n-1}O(E(n_i^2))=\sum_{i=0}^{n-1}O(2-1/n)$,故 bucket sort 的 running time 为$\Theta(n)$

## 9 Median and order statistics

median 代表一组数中中间大小的那一数
对于有偶数个的一组数，取较小的那个中间数作为 median

**selection problem：** 即给定一组数，找出第 i 小的数

### 9.1 Minimum and maximum

找出 minimum num,即最小的数或 maximum num,即最大的数,至少需要 n-1 比较
不过若两个同时都找时,则可以只进行$3\lfloor n/2 \rfloor$次比较,方法是先确定 max 和 min,然后对每对数,先比较它们本身,然后较大的和 max 比,较小的和 min 比
若有奇数个数,则最开始将第一个数同时设为 min 和 max

### 9.2 Selection in expected linear time

给出了一个解决 selection problem 的算法

> 利用 quick sort 的 randomized partition,将数组分为两部分:
> 若中间的那个数就是第 i 个数,则返回结果
> 若中间的那个数是的 order k>i,则在前面部分的数组继续找第 i 个数
> 若中间那个数的 order k< i,则在后面部分的数组举行找第 i-k 个数

该算法的 worst case running time 为$\Theta(n^2)$,此时每次都需要在 n-1 大小的子数组继续操作
它的 expected running time 为$O(n)$,下面的计算是在每个数都不一样的前提下进行的:
设$X_k=\{partition得出的中间数是第k小的数\}$,易得$E(X_k)=1/n$
则 running time 有:

> $$T(n)\le \sum_{k=1}^{n}X_k(T(max(k-1,n-k))+O(n))$$

求 expected,并化简,得:

> $$E[T(n)]\le 2/n\sum_{k=\lfloor n/2 \rfloor}^{n}E(T(k))+O(n)$$
> 化简的逻辑是上面的 max(k-1,n-k)后面较大的那些数都出现了两次

最后通过 substitution method 得$T(n)=O(n)$

### 9.3 Selection in worst case linear time

该算法可在$O(n)$的 running time 下解决 selection problem,核心是优化 partition

该算法有五步:

> 1.  先将将数组五个五个分成一组,其中一组放 n/5 产生的余数
> 2.  利用 insertion sort 找出每组的 median
> 3.  利用该算法本身找出每组的 median 组成的数组的 median
> 4.  利用找出的 median 进行 partition 操作
> 5.  若 x 的位置 k 就是要找的数,则算法结束,若不是,则在 i>k 时在大数字的数组找第 i-k 个,在 i< k 时在小数字数组找第 i 个

为分析该算法的 running time,我们先需要确定大于或小于第三步产生的 median 的数字的下界
任意分析得,除去 median 所在的 5 个元素的数组和存余数的数字,至少有一半的数组有 3 个数字大于或等于 median
故我们需要的下界为:

> $$3(1/2*\lceil n/5 \rceil-2)\ge 3n/10-6$$

对于小于或等于情况可按同样的方法得到下界
故上界为**7n/10+6**

对于上面的五步算法,1、2、4 需要$O(n)$的 running time,3 则需要$T(\lceil n/5 \rceil)$,5 则需要$T(7n/10+6)$
故得 recurrence:

> $$T(n) = T(\lceil n/5 \rceil)+T(7n/10+6)+O(n)$$

然后利用 substitution method 求解
注意可以设 n 小于某个数时$T(n)=O(1)$,这样求解会方便些

#

# Ⅲ data structures

概念：

**dynamic sets**：可被算法操作而增大减小或进行其他变化的 set

**dictionary** ：支持 insert、delete、test membership 的 dynamic set

**key**：dynamic set 的性质用于区别 set 的对象

operations 分类：

**query**：返回 set 的信息

**modifying operation** ：修改 set

一些 operations：

**SUCCESSOR（S，x）**：找出 set S 中比 x 指向的对象 key 大的下一个对象，若 x 是最大的，返回 NIL

**PREDECCESSOR（S，x）**：找出 set S 中比 x 指向的对象 key 小的下一个对象，若 x 是最小的，返回 NIL

## 10 ELementary data structures

### 10.1 Stacks and queues

**stack**：First in，last out 的数据结构，即在尾部对数据进行操作，在尾部增加元素叫 push，删除元素叫 pop。

**queue**：FIrst in，first out 的数据结构，即在头部和尾部进行操作，在尾部增加元素就 enqueue，在头部减少元素叫 dequeue

### 10.2 Linked list

**linked list**：即利用指针实现的线性表，通过一个对象指向另一个对象来表示顺序

**head**：linked list 的开头 **tail**：linked 的结尾

**singly linked list**：即单向链表，每个元素只指向下一个元素

**doubly linked list**：即双向链表，每个元素即指向下一个元素也指向上一个元素

**circular linked list**：即循环链表，head 元素的 pre 指向 tail，tail 的 next 指向 head

**sentinel**：即一个空的用于链表元素所有性质的元素，有时可用于简化链表的 operation

### 10.3 Implementing pointers and objects

有时有些编程环境不支持 pointer 和 object，我们可以用一些方法来实现它们

我们可以用**多个数组**来实现，每个数组代表 object 的各个性质，其中一个数组代表 pointer，存储数组的下标代表指向

我们也可以用**一个数组**来实现，用一定的偏移量来代表 object 的各个性质，如 i 代表 key，i+1 代表 pointer，一个数组可用于实现 object 长度不相同的情况

我们利用**allocate and free**来实现 object 的增添，free list 即按上面方法实现的 object list，但只有 pointer 性质有存储东西，allocate 将 free list 的头元素放入了 object list，增加了 object 个数，free object 则将对应的 object 放入 free list

### 10.4 Representing rooted tree

rooted tree 类似 binary tree，不同的是它可以由任意多个 child 节点

在 child 节点较多时，用多个指针代表它们会浪费大量的内存空间，这时我们可以利用一个指针，指向最左边的 child，child 节点也由指针指向它右边的 child 节点（right-sibling），这样便可节省内存空间

有时也用其他方法表示，具体问题要具体分析

## 12 Binary search tree

### 12.1 What is a binary search tree

即 binary-tree 满足如下性质:

> 若 x 是某个节点,y,z 为它的左右子树的节点,则$z.key\ge x.key\ge y.key$,

三种遍历:

**inorder tree walk**:先遍历左节点,然后是根节点,然后是右节点

**preorder tree walk**:先根节点,然后左节点,然后右节点

**postorder tree walk**:先左右节点,然后再根节点

binary search tree 可通过 inorder tree walk 来得到一个排完序的数组,且它的 running time 为$\Theta(n)$

因为一定需要经过 n 个节点,$\Omega(n)$很容易得到

$O(n)$则通过 substitution method 证明,可设$T(n)\le (c+d)n+c$,通过设一边的子树有 k 个节点,得:

> $$T(n)=T(k)+T(n-k-1)+O(1)$$

### 12.2 Querying in a binary search tree

binary search tree 支持一些 query,且每个的 running time 都为 O(h),h 为 tree 的 height

**search**:从 root 开始,若找的值为 root 的 key,则返回 root,若大,则对 root 的 rchild 递归调用 search,若小则对 lchild 递归调用

也可用循环,每次让 x=lchild 或 rchild 即可,注意判断 x 是否为 NIL

**Minimum**:一直让 x=lchild 直到 lchild 为空

**Maximum**:类似 Minimum,不过 l 变成 r

**Successor**:x 的右子树不为空,则找出右子树的 Min,若为空,则让 y=x.p,即 x 的父节点,然后 x=y,y=y.p 即 x 的父节点,然后让 x=y,直到 x 为 y 的左子树若 y 为空

右子树为空的情况的方法利用的性质是 x 的 successor 一定会是 left child 是 x 的 ancestor 的 lowest ancestor

证明:

先证 y(x 的 successor)一定是 x 的 ancestor,若 y 不是,设 z 为 x 和 y 的一个公有的 ancestor,则有 x<z<y,与 successor 的定义矛盾

然后证 y 的 left child 一定是 x 的 ancestor,若 left child 不是,则 x 在 y 的 right child,则 x>y,与 successor 的定义矛盾

再证明是 lowest ancestor,若不是,让 z 是 x 的满足性质的 ancestor,则 z 在 y 的左子树,则 z<y,同时 x<z(x 在 left),与 successor 的定义矛盾

**Predecessor**:类似 Successor

### 12.3 Insertion and deletion

**Insertion**:insertion 操作较为简单,根据要插入的 z 的 key,不断从 root 往下直到叶节点,然后根据 key 插在叶节点的左或右边

若 root 为空,则让 z 为 root

它的运行时间为 O(h)

**Deletion**:

deletion 的情况比较复杂,我们先定义如何用节点代替节点,即 transplant 操作:

> 对于用 v 代替 u 的 transplant 操作,若 u.p 为空,则直接让 root=v
>
> 若 u 是 u.p 的左节点,则 u.p.left=v
>
> 若 u 是 u.p 的右节点,则 u.p.right=v
>
> 最后,若 v 不为空,则 v.p=u.p

注意上述操作并未解决 u 的左右节点的问题

然后我们对 delete 的情况分类讨论

> 若要删除的 z 左节点为空,则直接 transplant(T,z,z.right)
>
> 若左节点不为空,右节点为空,则 transplant(T,z,z.left)
>
> 若上面的情况都不满足,则让 y 为 z 在右子树的 successor,即右子树的最小值,此时 y 没有左子树,然后再分两种情况:
>
> 若 successor 为 z 的右节点,则 transplant(T,z,y),然后让 y=z.left,z.left.p=y
>
> 若 successor 不是 z 的右节点,则先 transplant(T,y,y.right),让 y 空出来,然后 y.right=z.right,y.right.p=y,使得 y 可视为 z 的右节点,然后再进行上面的操作

delete 的 running time 也为$O(h)$,其中找出 y 需要$O(h)$，其他的操作为常数级

### 12.4 Randomly built binary search tree

我们从数组每次随机选择一个数，并插入到树中，执行操作 n 次后得到 randomly built binary search tree

它的 expected height 为$O(lgn)$

要证明，我们先定义$X_n$为 n 个节点的 randomly built binary search tree 的 height,然后定义$Y_n=2^{X_n}$,

当我们选择一个数准备插入时,设该数在数组中的 rank(即第几大)为$R_n$,当$R_n=i$时,易得:

> $Y_n = 2*max(Y_{i-1},Y_{n-1})$

然后我们设一个 indicator random variable$Z_{n,i}=I\{R_n = i\}$,易得$E[Z_{n,i}]=1/n$,然后我们可以得到:

> $Y_n=\sum_{i=1}^nZ_{n,i}2*max(Y_{i-1},Y_{n-1})$

求期望得:

> $E[Y_n]=\sum_{i=1}^n1/nE[2*max(Y_{i-1},Y_{n-i})]  \\\le2/n\sum_{i=1}^n(E[Y_{i-1}]+E[Y_{n-i}])\\ \le4/n\sum_{i=1}^{n-1}E[Y_i]$

其中第三个式子用的是$Y_i$的多次出现化简得到的

易得

$Y_0=0\le1/4\begin{pmatrix} 3\\3\end{pmatrix}=1/4,Y_1=1\le 1/4\begin{pmatrix} 4\\3\end{pmatrix}=1$

然后我们设对于$n-1\le i,E[Y_n]\le 1/4\begin{pmatrix} n+3\\3\end{pmatrix}$成立,然后证明 n 的情况:

> $E[Y_n]\le 4/n\sum*{i=1}^{n-1}1/4\begin{pmatrix}i+3 \\3\end{pmatrix}\\ \le1/n\sum*{i=1}^{n-1}\begin{pmatrix}i+3 \\3\end{pmatrix} \\ =1/n\begin{pmatrix} n+3\\ 4\end{pmatrix} \\=1/4\begin{pmatrix} n+3\\3\end{pmatrix}\\ $

然后化简:

> $E[Y_n]\le\frac{n^3+6n^2+11n+6}{24}$

两边求对数即可得$E[X_n]=O(lgn)

## 13 Hash tables

### 13.1 Direct-address table

即可以一下子将集合中的 key 和 slot（数组中的位置）对于起来的结构，可以让 key 和数组下标一致来实现可以一下子找到

它支持 search insert delete 操作

一般会将 key、satellite data 和 slot 分开储存，并由 slot 指向 key，但有些情况它们一起储存，但此时我们需要一些特殊的方法来表明 slot 是空的

### 13.2 Hash tables

direct-address table 的纯粹需要$|U|$,即集合的大小的存储空间,这样的存储方式浪费了很多空间，我们可以利用**hash table**来实现$\Theta(K)$级别,即实际存储了的 key 的大小的级别,的空间复杂度

在 hash table 中,我们利用$h(key)$来算出 key 对于的 slot,故可得到 hash table 可以有一个比 U 小的 size **m**,

因为我们需要让$m<U$,故一定会出现多个 key 的$h(key)$相同的情况,这种情况叫**collision**,我们可以利用**chaining**,即每个 slot 对于一个链表来解决这个问题

接下来分析 hash table 的 search 的复杂度

**worst-case**是$\Theta(n)$,这是很明显的,对于的情况是所有的 key 都被堆在一个 slot 里面

接下来考虑**average case**

首先我们先定义 load factor $\alpha=n/m$,即平均每个 slot 对应多少个 key

我们假设我们的 hash function 可以实现**simply uniform hashing**,即每个 key 进入哪个 slot 的概率的相同的

找不到 key 的情况的 running time 为$\Theta(1+\alpha)$,此时我们遍历 key 对于的整个链表

找得到的情况也是$\Theta(1+\alpha)$,分析如下

我们先定义一个 indicator random variable$X_{ij}$,表示第 i 个插入的元素和第 j 个插入的元素 key 对于的 hash 值相同的 event,故有$E[X_{ij}]=1/m$

我们插入元素时是将新的插在已有元素的前面,故找到我们需要的 key 经过的 key 的多少等于在我们的需要的 key 之后插入到该 slot 的 key 的多少

故有:

$$E[1/n\sum_{i=1}^n(1+\sum_{j=i+1}^nX_{ij})]\\=1+1/(mn)\sum_{i=1}^n(n-i)\\=1+(n-1)/2m\\=1+\alpha/2-\alpha/2n$$

故 running time 为上述结构加 1(算 hash 的时间),即$\Theta(1+\alpha)$

上述分析中的$\alpha=O(1)$,故 serch 的 average running time 为$\Theta(1)$

### 13.3 Hash functions

一个好的 hash function 需要满足或近似`simple uniform hashing`,即每个 key 分配到每个 slot 的机会相同,有时也需要满足一些其他性质

一般 hash function 都假设 key 都自然数,故有时需要转化 key 成自然数

`division method`:$h(k)=k \;mod\;m$,其中 m 一般选择一个离 2 的倍数较远的素数

`multiplation method`:$h(k)=\lfloor m(kA\;mod\;1) \rfloor$,其中 mod 1 即取小数部分.一般将 m 选择为 2 的倍数,将 A 选择为$(\sqrt{5}-1)/2$,这样可以方便计算机写算法

### 13.4 Open addressing

open addressing 也是一种处理哈希冲突的方法,它要求 hash table 没有链表，每个 slot 存储 key 本身，它将链表节省的空间用于增加 slot

`probe`:即根据每一个 key 参数一个[1..m-1]的排列,然后根据该排列检索 hash table

产生 probe 序列的方法:

`linear probe`:$h(k,i)=(h'(k)+i)\;mod\;m$,其中 h'(k)是副哈希函数, 这会产生 primary clustering 的问题

`quadratic probe`:$h(k,i)=(h'(k)+c_1i+c_2i^2)\; mod\;m$,这会参数 secondary clustering 的问题

`doubly hashing`:$h(k,i)=(h_1(k)+ih_2(k))\;mod\;m$,这是较好的产生 probe 序列的方法,它能产生$\Theta(m^2)$个序列,而不是上面两种方法的$\Theta(m)$个

在满足 uniform hashing，即每个 probe 序列是[1..m-1]的某个排列的可能性都相同时,有如下期望值的结论:

同 13.2 定义$m,n,\alpha$,

1.一次不成功的搜索需要$1/(1-\alpha)$次

证明:

定义$A_i$为第 i 次 probe 遇到已有内容的 slot 的事件,$X$为 probe 过程中遭遇已有内容的 slot 的次数,易得$A_i=(n-(i-1))/(m-(i-1))$

再由 n<m 得出$(n-i)/(m-j)\le n/m$

故有:

$Pr\{X\ge i\}=n/m*(n-1)/(m-1)..(n-i+2)/(m-i+2)\\\le(n/m)^{i-1}=\alpha^{i-1}$

故$E[X]=\sum_{i=1}^{\infty}Pr\{X\ge i\}\\=\sum_{i=1}^{\infty}\alpha^{i-1}=1/(1-\alpha)$

2.一次插入需要$1/(1-\alpha)$次 probe

一次插入前先进行了不成功的搜索,故得证

3.成功搜索需要$1/\alpha \ln(1/(1-\alpha))$次

设查找的 key 是第 i 次插入的 key,则该数需要的搜索次数为$1/(1-i/m)=m/(m-i)$

故平均搜索次数为:

$\frac{1}{n}\sum_{i=0}^{n-1}\frac{m}{m-i}\\=\frac{1}{\alpha}\sum_{k=m-n+1}^{m}\frac{1}{k}\\\le\frac{1}{\alpha}\int_{m-n}^{m}(1/x)dx=1/\alpha \ln(1/(1-\alpha))$

其中用到了:

$\int_{m}^{n+1}f(x)dx\le\sum_{k=m}^{n}f(k)\le\int_{m-1}^{n}f(x)$

## 14 Binary search tree

### 14.1 What is binary search tree

二叉搜索树只满足左节点的 key 小于父节点的 key，右节点的 key 大于父节点的 key 的二叉树

可以用中序遍历（inorder tree walk）理由二叉搜索树生成一个有序序列，使用的时间为$\Theta(n)$

证明:$\Omega(n)$显然成立,再利用 substitution method 证明$O(n)$

### 14.2 Querying a binary search tree

二叉搜索树的`search`操作可用递归使用，若某节点的值不是要找的 key，则将该值与 key 比较，大则在左子树找，小则在右子树。当然也可写成迭代。

`Minimum`和`Maximum`操作则只需找到最低的最左节点和最右节点即可

`successor`和`predecessor`操作则需要分情况讨论,这里以`successor`操作为例

若右子树不为空,找出该节点右子树的最小节点

若右子树为空,找出左子树是该节点父节点的最低节点

第二个情况的证明如下:

> 首先证明 successor y 是父节点,若 successor 不是子节点,则此时它不可能是所求节点 x 的子节点(右子树为空),故它们有公共节点 z 满足 x<z<y,这与 successor 的定义矛盾
>
> 接下来证明 successor 的左子树是 x 的父节点,若不是,则 y 的右子树是 x 的父节点,则 x>y,与 y 的定义矛盾
>
> 接下来证明是最低(最深)的满足上述调节的子节点,若不是,设 z 是最低节点,则 z 必须在 y 的左子树,这说明 x<z<y,与 y 的定义矛盾

以上操作的复杂度均为$O(h)$,h 为树的高度

### 14.2 Insertion and deletion

`insert`操作比较简单,直接找到最左或最右的空位插入集合,注意最开始要判断是否为空树,而且需要另一个变量储存遍历的上一个结果(遍历的结果为 NIL,没有意义)

`delete`操作则比较困难

首先我们分析除 delete 有四种情况

> 一 当被删除的节点 z 没有子节点时,直接将 z 的 p 中的 z 值变为空
>
> 二 当 z 只有一个子节点时,将用子节点替换 z
>
> 当 z 有两个子节点时,先找出 z 的 successor y,然后有两种情况
>
> 1.当 y 是 z 的右子节点时,直接用 y 替换 z
>
> 2.当 y 不是 z 的子节点时,我们先将 y 用 y 的右子节点替换 y,然后用 y 替换 z

实际处理时,可先检验左子节点存在,若不存在则用右节点替换 z(一 二),若存在检验右节点存在,若不存在则用左子节点替换 z(二),若存在则处理最后两种情况

为了处理,我们一般定义一个 transplant 函数用来替换节点,里面的操作就是将要替换的节点 u 的父节点的相关值设为 v,然后将 v 的 p 设为该父节点

上述操作的运行时间也是$O(h)$

## 15 Red-black tree

### 15.1 properties of red-black trees

红黑树是满足一些特殊性质的二叉搜索树，它每个节点多出一个叫`color`的属性

它的叶节点(leaf,最底的节点)都是 NIL,一般我们可以用一个`T.nil`来代表所有的 NIL,以简便说明,注意`T.nil`的子节点为根节点,画的时候可以把空节点省略

它需要满足的特殊性质如下:

> 1.每个节点的颜色是红或者是黑
>
> 2.根节点是黑色的
>
> 3.叶节点也是黑色的
>
> 4.如果一个节点是红色的,那它两个子节点都是黑色的
>
> 5.所有从一个节点到它的子节点的路径包含相同的黑色节点

我们定义`black height`,为从某节点到叶节点的路径上的黑节点数(不包含该节点),由红黑树的性质我们知道每个节点都有一个确定的 black height,故我们用一个函数`bh(x)`为 x 节点的 black height

红黑树的高度有如下定理:

> 红黑树的高度最高为 2lg(n+1)

证明:

我们先证明某个节点和它的子树最少有$2^{bh(x)}-1$个节点

> 利用归纳法证明
>
> 当高度 h 为 0 时,x 比为空节点,故 bh(x)=0,此时$2^0-1=0$
>
> 设某个 h 不为 0 的节点 x,它的左右子树的 black height 至少有着 bh(x)-1(取决于该子树是否为黑节点),假设字节带你满足上述性质,则该节点的子树的节点数为$(2^{bh(x)}-1)+(2^{bh(x)}-1)+1=2^{bh(x)}-1$,故假设成立

然后再借助此性质完成证明

> 由红黑树的第四个性质我们知道 black height 至少为$h/2$,
>
> 故对于 n 个节点的红黑树有$n\ge 2^{h/2}-1$,然后便可得$h\le 2lg(n+1)$

### 15.2 Rotation

`rotation`是一种操作树节点的操作,它会把某个子树的根节点换成该子树的左子节点(或右),然后将该根节点变成右子节点(或左),这个过程二叉搜索树的性质维持着.根据功能的不同分别命名为`Left-Rotation`和`Right-Rotation`.注意它们都有假设某一子节点不为空

这里以 Left-Rotation 为例,若想进行操作,除了上述处理外,还需将根节点的左子树变为左子节点的右子树

### 15.3 Insertion

对于红黑树的插入，我们在二叉搜索树插入操作的基础上，将插入的 z 的左右子树设为 T.NIL,然后将 z 设为红色

然后再执行`fixup`函数来维持红黑树的性质

fixup 函数的正确性可用循环不变式来证明

首先我们明确,对于红黑树的性质,插入操作只可能违反性质 1 或者性质 4,性质 1 我们可以在程序的最后让 T.root.color=black 来解决,然后只剩下性质 4

当插入的 z 的父节点是黑节点时,显然不违反性质 4

当插入的 z 的父节点是红节点时,此时分三种情况

> 1.若 z 的 uncle(z.p.p 的另一子节点)是红节点,则将 z.p 和 uncle 都弄成黑节点,然后将 z.p.p 弄成红节点,然后设 z.p.p 为新的 z
>
> 若 z 的 uncle 是黑节点
>
> 2.若 z 是右子节点,对 z 和 z.p 执行 Left-Rotation,然后设在原本的 z.p 为 z,此时就变成了第三种情况
>
> 3.若 z 是左子节点,则 z.p 和 z.p.执行 Right-Rotation,此时可以维持性质 4 了

这样最后的插入执行时间还是$O(lgn)$

### 15.4 Deletion

红黑树的删除操作效率仍未$O(lgn)$,但非常复杂

首先,在二叉搜索树的删除操作的基础上,我们添加两个量`x,y-original-color`,一个记录代替 y 节点原来位置的节点,另一个记录 y 节点原本的颜色,y 也不止记录删除的 z 节点的 successor,在前两种情况种,y 就是删除的节点 z

若最好 y 原来的颜色为红色,则删除操作不违背红黑树的性质,原因如下

> 一 没有 black-height 发生改变
>
> 二 没有产生两个相邻的红节点.y 取代了 z 的位置和颜色,自然不会凭空产生红节点.而 y 原来是红色,它的子节点自然没有红色,故 y 位置旁边不会有相邻的红节点.
>
> 三 y 不可能是根节点,故根节点仍为黑色

当 y 原来的颜色为黑色时,它可能在如下情况违反红黑树的性质

> 一 若 y 是根节点,y 的一个红子节点成为新的根节点,违反性质 2
>
> 二 若操作完成后 x 和 x.p 均是红节点,违反性质 4
>
> 三 显然违反性质 5

对于性质 5,我们让 x 节点成为特殊的节点,拥有`extra black`,即无论 x 节点是什么颜色,它都拥有一个额外的黑色,这样维持了性质 5,然后通过一系列操作消除这个额外的黑色

我们设置一个变量`w`存储 x 的兄弟节点(父节点的另一个子节点)来辅助,这又分为 4 种情况

注意以下操作均在 x 的颜色为黑且 x 不为根节点的情况下执行

> 一 w 为红节点
>
> 则我们把 x.p(必为黑色)设为红,w 设为黑,然后对 x.p 执行 left-rotation,然后就变成二 三或四了
>
> 二 w 为黑节点,而且它的两个子节点均为黑节点
>
> 我们将 w 变为红节点,然后就可以直接消除 extra black,然后让 x.p 变为新的 x
>
> 三 w 为黑节点,且它的子节点左红右黑
>
> 我们把 w 的左子节点设为红,w 设为黑,然后对 w 执行 right-rotation,然后变成四
>
> 四 w 为黑节点,且它的右子节点为红节点
>
> 我们将 w 设为 x.p 的颜色,x.p 的颜色设为黑色,将 w 的右子节点设为黑色,然后对 x.p 执行 left-rotation,这样就消除了 extra black,且不违法任何性质,直接让 x 为根节点结束循环

在最后,我们将 x 的颜色设为黑色

注意以上操作同样会维持性质 2 和性质 4，理由如下

> 对于性质 2,四种情况中只有 2 和 4 可能结束循环,4 显然会复合性质 2,至于 2,结束循环时要么 x 为黑要么 x 是根节点,且在程序的最后统一会将 x 设为黑色,故必符合
>
> 对于性质 4,违反只有可能在 x 和 x.p 均为红时违反,而 x 在最后总会设为黑色,故不违反性质 4

# Ⅵ Graph algorithms Introduction

## 22 Elementary graph algorithms

### 22.2 Breadth first search

BFS 从源点开始，先找出它的所有子节点，然后再从子节点开始一个个重复上述操作，直到子节点为空
程序：

```c
typedef struct vertex
{
    int color;
    int d;
    int pi;
}vertex;
typedef struct Graph
{
    int gra[100][100];
}Graph;


void BFS(Graph testGraph,vertex *test,int n,int s){
    for(int i=0;i<n;++i){
        test[i].color=0;
        test[i].d=-1;
        test[i].pi=-1;
    }
    test[s].color=1;
    test[s].d=0;
    test[s].pi=-1;

    int queue[n];
    int front=-1,rear=-1;
    queue[++rear]=s;
    while(front!=rear){
        int temp=queue[++front];
        test[temp].color=1;
        for(int i=0;i<n;++i){
            if(testGraph.gra[temp][i]){
                if(!test[i].color){
                    test[i].color=1;
                    test[i].d=test[temp].d+1;
                    test[i].pi=temp;
                    queue[++rear]=i;
                }
            }
        }
        test[temp].color=2;
    }
}

void printPath(vertex *test,int s,int v){
    if(v==s){
        printf("%d ",s);
    }
    else if(test[v].pi==-1){
        printf("No path\n");
    }
    else{
        printPath(test,s,test[v].pi);
        printf("%d ",v);
    }
}
```

其中的 test 数组存储着 vetex 的各种信息，图的 edge 信息则在 testGraph 数组里面
这样求出的每个 vetex 的 d 是从开始点到该点的最短路径
该程序事实上生成了 BFTree

### 22.3 Depth first search

DFS 是从源点出发，从一个子节点开始一直走到最深处，然后回溯上一级的父节点接着找
程序：

```c
typedef struct vertex
{
    int start;
    int end;
    int color;
    int pi;
}vertex;
typedef struct Graph
{
    int gra[100][100];
}Graph;

int time=0;

int DFS_Visit(Graph testGraph,vertex *test,int n,int v){
    time++;
    test[v].start=time;
    test[v].color=1;

    for(int i=0;i<6;++i){
        if(testGraph.gra[v][i]){
            if(!test[i].color){
                test[i].pi=v;
                DFS_Visit(testGraph,test,n,i);
            }
        }
    }

    time++;
    test[v].end=time;
    test[v].color=2;

    return 0;
}

int DFS(Graph testGraph,vertex *test,int n){
    for(int i=0;i<6;++i){
        test[i].color=0;
    }
    for(int i=0;i<6;++i){
        if(!test[i].color){
            test[i].pi=-1;
            DFS_Visit(testGraph,test,n,i);
        }
    }

    return 0;
}

```

其中的 test 数组存储着 vetex 的各种信息，图的 edge 信息则在 testGraph 数组里面,time 为初始化为 0 的全局变量

DFS proprities:

> parenthesis theorem
>
> > [v.d,v.f],[u.d,u.f] 完全分离，则它们不在同一棵 DFTree
> > [v.d,v.j]在[u.d,u.f]中，则 v 是 u 的后代
> > [u.d,u.f]在[v.d,v.j]中，则 u 是 v 的后代

> white-path theorem:v 是 u 的后代当且仅当 u.d 时有一条 u 到 v 的 path 完全由 white vertex 组成

四种 edge

> tree edge：Edge（u，v）是 tree edge 当且仅当 v 是由 Edge（u，v）第一次发现的
> back edge：一种在 DFTree 里面将 v 与祖先连接在一起的 edge
> forward edge：一种在 DFTree 里面将 v 与后代连接在一起的 edge
> cross edge：除上面之外的所有 edge

当 DFS 找到 Edge（u，v）时：

> $v.color=white\Rightarrow tree\;edge$ >$v.color=gray\Rightarrow back\;edge$$(遍历总是从最深的gray\;vertex开始，故v必是u的祖先)$ >$v.color=black\Rightarrow other \;two\;edges$

undirected graph 的 edge 一定是 tree edge 或 back edge（借助每个 edge 都是双向的证明）
