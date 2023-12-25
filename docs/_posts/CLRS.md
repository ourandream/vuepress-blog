---
title: CLRS
tags: algorithm
categories: reading
mathjax: true
abbrlink: ab8a63f3
date: 2021/12/23 18:23:27
updated: 2022/04/05 15:07:08
---
CLRS算是非常难读的一本书了，书中的数学证明真的是多的要死，而且看起来真的没啥规律可循。
据网上说这本书算是给你开了一扇算法的大门，然后门里的大风差点吹飞你。
只能看懂多少写多少了。
<!--more-->
# Ⅰ Foundation Introduction
## 2 Getting Started
### 2.1 Insertion sort

#### 简述
insertion sort在一个数组的第j个数中，将j按顺序插入它前面的1..j-1的数组,j从2到n重复此操作
即不断将一个数有序插入一个有序数组,这样结果也会是有序的
它的order of growth 是$\Theta(n^2)$

#### Loop invariant
用于证明algorithm的正确性,有以下三个性质:
Initialization:在第一次迭代前是正确的
Maintenance:如果在某次迭代前是正确的，则在迭代后仍是正确的	
Termination:通过前面的分析,得到有用的性质证明在结束时是正确的

Insertion sort的正确性可用此证明

### 2.2 Analyzing algorithms
#### RAM Model
算法运算的模拟环境,只有简单的语句和功能,单线程
#### Runing-time analyze
可假设第i个语句执行一次的时间为$c_i$
若执行次数不确定,可假设每次循环中执行时间为$t_i$
然后确定执行次数并相加,得到一个式子
找到执行实现最长的情况,只处理幂最大的项,忽略常数,得到==order of growth==,如$\Theta(n)$

要找执行时间最长的情况有以下几个原因:
>1. 这样可确定一个执行时间的上界,不用担心超时
>2. 有些算法的最差情况发生的非常频繁
>3. 平均情况经常和最差情况差不多


### 2.3 Designing algorithms
#### Divide and conquer
分为三个步骤：
>divide:把问题分为子问题
>conquer:递归地解决子问题,当子问题分得足够小时,可以直接简单解决
>combine:利用子问题的答案解决问题

#### Merge sort
将数组分为两部分,那两部分再继续分,知道分到只剩下一个数为止
一个数可以视为一个有序数组
再利用merge操作解决子问题
merge操作即不断比较两个有序数组的最小数,将小的那一个填充进新数组,这样就可以合并两个有序数组
它的order of growth是$\Theta(nlgn)$注意lg指$log_2$


## 3 Growth of Functions
### 3.1 Asymptotic notation

#### definition
|记号||定义|
|---|---|--|
|$\Theta(g(n)$|Asymptotic tight bound|$当n\ge n_0存在0\le c_1g(n)\leq f(n) \le c_2g(n)(c_1\;c_2\ge0)$|
|$O(g(n))$|Asymptotic upper bound|$当n\ge n_0存在0\le f(n) \le c_2g(n)(c_2\ge0)$|
|$\Omega(g(n))$|Asympotic lower bound|$当n\ge n_0存在0\le c_1g(n)\leq f(n)(c_1\ge0)$|
|$o(g(n))$|$\lim_{n\rightarrow \infty }\frac{f(n)}{g(n)}=0$|$当n\ge n_0对所有c_2,0\le f(n) < c_2g(n)(c_2\ge0)$|
|$\omega(g(n))$|$\lim_{n\rightarrow \infty }\frac{f(n)}{g(n)}=\infty$|$当n\ge n_0对所有c_1,0\le c_1g(n)< f(n)(c_1\ge0)$|

注意其中的g(n),f(n)都是**asymptotic positive**,即存在$n_0$,当$n\ge n_0$时,函数值为正
对于一个$f(n)=an^2+bn+c$,除$n^2$外都可被忽略,因当n足够大时,它们的影响很小,它们只会在定值范围内$改变c_1,c_2$的值.
#### properties
>Transitivity
>$f(n)=\Theta(g(n)),g(n)=\Theta(t(n)) \Rightarrow f(n)=\Theta(t(n)$
>对其他的记号也有类似结论
>Reflexivity
>$f(n)=\Theta(g(n)) \Leftrightarrow f(n)=O(n),f(n)=\Omega(g(n)$
>Symmetry
>$f(n)=\Theta(g(n)) \Leftrightarrow g(n)=\Theta(f(n))$
>Transpose symmetry
>$f(n)=O(g(n)) \Leftrightarrow g(n)=\Omega(f(n)$
>$f(n)=o(g(n)) \Leftrightarrow g(n)=\omega(f(n)$

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
>$\lfloor \frac{\lfloor \frac{x}{a}\rfloor}{b}\rfloor=\lfloor \frac{x}{ab} \rfloor$
>$\lceil \frac{\lceil \frac{x}{a}\rceil}{b}\rceil=\lceil \frac{x}{ab} \rceil$
>$\lceil \frac{a}{b} \rceil \le \frac{a+(b-1)}{b}$
>$\lfloor\frac{a}{b} \rfloor \ge \frac{a-(b-1)}{b}$

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

它与golden ratio(黄金分割比)
即$x=x^2+1$的两根$\phi\;\hat\phi(前正后负)$有如下关系:
$F_i=\frac{\phi^i-\hat\phi^i}{\sqrt{5}}$
又由$\frac{|\hat\phi^i|}{\sqrt{5}}<\frac{1}{2}$
得$F_i=\lfloor \frac{\phi^i}{\sqrt{5}}+\frac{1}{2}\rfloor$

## 4 Divide and conquer
分为三个步骤：
>divide:把问题分为子问题
>conquer:递归地解决子问题,当子问题分得足够小时,可以直接简单解决
>combine:利用子问题的答案解决问题

recursive case:子问题大到足够递归解决
base case:子问题小到不能递归解决
recurrence:equation或者inequality表达一个函数,该函数由更小的input构成,用于表达running time
解决方法:
>substitution method:我们猜测一个界限然后用数学归纳法证明
>recursive method:利用递归树确定界限
>master method:解决类似$T(n)=aT(\frac{n}{b})+f(n)$的bound

注意解决recurrence时,我们经常会忽略取整,小的input的值等细节,因为这些一般对结果无影响,但我们需要证明这些细节确实没有影响

### 4.3 Substitution method for solving recurrence
核心就是猜范围,然后利用mathematical induction(数学归纳法)证明
例子:
>$T(n)=2T(\lfloor \frac{n}{2} \rfloor)+n$
>猜测$T(n)=\Theta(nlgn)$
>则$T(n)=2T(\lfloor \frac{n}{2} \rfloor)+n\le 2(c\frac{n}{2}.lg(\frac{n}{2}))+n=cnlgn-cnlg2+n$
>故$T(n)\le cnlgn(c\ge1)$
>注意当n=1时不成立,故可让$n\ge n_0=2$,,然后以此解决n较小的情况

想要更好的猜测,可以用相似式子的结果来进行猜测,也可以先猜上下界然后一步步缩小猜测

类似$T(n)=T(n/2)+T(n/2)+1$的式子证明时可将$\Theta(n)写成cn-d$

注意$T(n)\le cn+n\Rightarrow T(n)=O(n)$是错误的,要注意避免陷阱

类似$T(n)=T(\lfloor \sqrt{n/2} \rfloor)$的式子可让$n=2^m$

### 4.4 Recursion tree
画出recurrence的recusive tree，然后计算每一层的cost，然后相加得到一个猜测，然后再用substitution method求解

### 4.5 Master method
对于形如$T(n)=aT(n/b)+f(n)$的式子(忽略取整),有如下方法可以solve recurrence:
>若$f(n)=O(n^{log_ba-\varepsilon})$,其中$\varepsilon>0$,且可任意取,则$T(n)=\Theta(n^{log_ba})$
>若$f(n)=\Theta(n^{log_ba}),则T(n)=\Theta(n^{log_ba}lgn)$
>若$f(n)=\Omega(n^{log_ba+\varepsilon}),其中\varepsilon>0$,且可任意取,且对于足够大的n,有$c<1$满足$af(n/b)<cf(n)$,则$T(n)=\Theta(f(n))$

注意上面的对于f(n)和$n^{log_ba}$的比较需要是polynomial的,若不是则不适用.
如$nlgn和n$,计算$nlgn/n=lgn$,对于任何的$n^{\varepsilon}(\varepsilon>0)$,$lgn$都是asymptomatic smaller

### 4.6 Proof of master method
证明思路大概是先画出递归树写出表达式，任何列出调节一步步证明
先在$n=b^j$的情况下证明
然后证明取整操作对证明无影响

## 5 Probabilistic analysis and randomized algorithms
### 5.1 The hiring problem
average running-time：当输入在概率上是随机的时
expected running-time：当算法的选择是随机的时使用

### 5.2 Indicator random variables
indictor random variables是一个数学工具，定义如下：
>设S为一个space,A为一个event,则indicotr random variable $I\{A\}=X_A=\begin{cases}1,when\;A\;happen\\0,when A \;don't\;happen\end{cases}$
>而它的expected value有:
>$E[X_A]=pr\{A\}$
>根据linearity of expection,可做如下操作:
>$E[\sum_{i=1}^nX_i]=\sum_{i=1}^nE[X_i]$

### 5.3 Randomized algorithm
形成随机数组有两种办法
一是产生一个随机的权重序列,然后借助权重序列重新排序数组
证明该算法产生数组可先证明对于一个特定的数组序列(如和原来一致)的probability为$1/n!$,然后证明对每一个序列,上面的证明均适用
二是遍历数组,对于数组中的第i个元素,随机地与[i,n]范围的元素进行交换
证明利用loop invariant,证明在过程中产生特定序列的可能性为$(n-i+1)!/n!$,这样termination时,产生特定序列的可能性为$1/n!$

### 5.4 Probabilistic analysis and further uses of indicator random variable
**birthday paradox**

即房间内有多少人时其中中有两个人生日相同的概率超过1/2
使用probabilistic analysis,设$B_k$为k个人在总数为n的年份中生日不同的事件,$A_i$为第i个人生日与前面的人生日都不相同的事件,则有:
>$pr\{B_k\}=pr\{B_{k-1}\}pr\{A_k|B_{k-1}\}$

易得$pr\{B_k\}=1*(1-1/n)(1-2/n)(1-3/n)..(1-(k-1)/n$
再由$1+x\le e^x$,得
>$pr\{B_k\}\le 1*e^{1-1/n}..e^{1-(k-1)/n}=e^{k(k-1)/2n}$

故要使$pr\{B_k\}\ge 1/2$,则有$k(k-1)/2n\ge ln1/2$,解得当n=365时$k\ge 23$

使用indicator random variable,设$X_{ij}$为第i个人和第j个人生日相同的indicator random variable,则$E[X_{ij}]=\sum_{i=1}^{n}1/n^2=1/n$,故
>$E[X]=E[\sum_{i=1}^{k}\sum_{j=i+1}^{k}X_{ij}]=\sum_{i=1}^{k}\sum_{j=i+1}^{k}E[X_{ij}]=k(k-1)/2n$

由$k(k-1)/2n\ge 1$解得当n=365时$k\ge 28$

**ball and bins**
该问题即扔ball进入bin，进入每个bin的几率相同，问让每一个bin都有至少一个小球需要扔多少次
用到两个公式：
>E[X_1]=1/p
>E[X_2]=np
>$\sum_{i=1}^n1/i=lnn+O(1)$
其中,p是每次成功的概率,$X_1$是成功一次需要的尝试次数,$X_2$是n次尝试成功的次数

设有b个bin
设第i-1个bin有ball到第i个bin都ball中间的尝试为stage,易得第一个stage只包含第一次尝试
接下来的每个stage,有b-i+1个bin没有求,故成功概率为(b-i+1)/b
设$n_i$为第i个staged 尝试次数,则由上面的公式由:
>$$E[n_i]=b/(b-i+1)$$

所有尝试的次数的expected num为:
>$$E[\sum_{i=1}^bn_i]=\sum_{i=1}^bE[n_i]\\=\sum_{i=1}^bb/(b-i+1)\\=b\sum_{i=1}^b1/i\\=b(lnb+O(1))$$

故需要blnb次尝试

**Streaks**
该问题即找出扔n次conins其中出现的最大的正面朝上的streak,即连续正面朝上的最大长度
最后结果是$\Theta(lgn)$

先证upper bound
设$pr\{A_ik\}$为第i个位置开始streak长度的k的概率,易得为$1/2^k$
则对于$k=2\lceil lgn \rceil$,有:
>$$pr\{A_i2\lceil lgn \rceil\}\le 1/n^2$$

则可得k的长度至少为$2\lceil lgn \rceil$的probability为至多1/n

设L为streak最大长度,则有:
>$$E[L]=\sum_{j=1}^njPr\{L_j\}\\=\sum_{j=1}^{2\lceil lgn \rceil-1}jPr\{L_j\}+\sum_{i=2\lceil lgn \rceil}^njPr\{L_j\}\\\le 2\lceil lgn \rceil\sum_{j=1}^{2\lceil lgn \rceil-1}Pr\{L_j\}+n\sum_{i=2\lceil lgn \rceil}^nPr\{L_j\}\\
\le 2\lceil lgn \rceil*1+n*1/n=O(lgn)$$

其中第三行的式子用了所有概率加起来小于等于1的性质

后证lower bound

我们将n分为$\lfloor lgn/2 \rfloor$长度的多部分
根据上面的分析易得第i个位置开始的有$\lfloor lgn/2 \rfloor$长度streak的概率为$  1/\sqrt{n}$
故上面分的每部分都不是streak的概率为:
>$$(1-1/\sqrt{n})^{\lfloor n/ \lfloor lgn/2 \rfloor \rfloor}\\\le (1-\sqrt{n})^{2n/lgn-1}$$

再由$1+x\le e^x$,得
>$$above\le e^{-(2n/lgn-1)/\sqrt{n}}
\\=O(1/n)$$

故streak最长为$\lfloor lgn/2 \rfloor$的概率为
>$$\sum_{i=\lfloor lgn/2 \rfloor+1}^njPr\{L_j\}\ge 1-O(1/n)$$

则类似上面的分析得到lower bound
>$$E[L]=\sum_{j=1}^njPr\{L_j\}
\\=\sum_{j=1}^{\lfloor lgn/2 \rfloor}jPr\{L_j\}+\sum_{i=\lfloor lgn/2 \rfloor+1}^njPr\{L_j\}
\\\ge 0+\lfloor lgn/2 \rfloor\sum_{i=\lfloor lgn/2 \rfloor+1}^njPr\{L_j\}
\\ =\Omega(lgn)$$

**on-line hiring problem**
是之前hiring problem的演化，这次不每次interview都雇佣，全部只雇佣一次，每次不雇佣的话都会明确拒绝，要求找出方法有尽可能大的probability雇佣的最好的人
我们假设我们能给每个人一个独一的score代表它的好坏
给出的策略是先interview前k个人，并全部拒绝并记录它们中最大的score，然后在后面的人中，一旦遇到比前面的score大的马上雇佣，若没有，则雇佣第n个人
问题是如何选择这个k

设在第i个位置雇佣到最好的人的event为$S_i$,容易想到我们不可能在前k个位置雇佣到,故S发生的概率为:
>$$Pr\{S\}=\sum_{i=k+1}^nPr\{S_i\}$$

设$B_i$为第i个人为最好的event,容易看出概率为1/n,设$O_i$为前i-1个人中最好的人在前k个(保证i之前不进行雇佣),则它的概率为$k/(i-1)$

故有:
>$$pr\{S_i\}=k/n(i-1)\\
Pr\{S\}=\sum_{i=k+1}^nk/n(i-1)\\
=k/n\sum_{i=k}^{n-1}1/i$$

利用不等式
>$$\int_k^n1/xdx\le \sum_{i=k}^{n-1}1/i$$

得
>$$k/n(lnn-lnk)\le Pr\{S\}$$

求导可得出当$k=n/e$时得到最大,此时概率为至少1/e
# Ⅱ Sorting and order statistic introduction
一个数组sort in place当且仅当它sort时只有确定数量的元素存储在数组之外
## 6 Heap sort
### 6.1 Heaps
heap是一种基于complete binary tree的数据结构
complete binary tree的定义如下：
>一颗binary tree,若它除了最下面一层的nodes,其余nodes均有左右chiild,且最后一层的nodes均尽量偏左(即能在较左边就在较左边),则只有的bianry tree为complete binary tree

heap就是利用complete binary tree来存储数组
heap可以很轻松地计算节点在数组中的index:
>若parent节点的index为$i$,则它的left child为$2i$,right child为$2i+1$
>若child节点的index为i,则parent节点的index为$\lfloor i/2 \rfloor$

max-heap满足如下定义:
>$A[parent[i]]\ge A[i]$,即parent节点不小于child节点

min-heap定义与max-heap正好相反
两种heap的性质有所不同,若需要用到这些不同的性质,需要说明heap的种类

### 6.2 Maintaining the heap property
max-heapity操作,先假设某个节点的两个child为root形成的binary tree都是max-heap,比较该节点与两个child.
若该节点为最大,则该节点为root形成的binary tree为max-heap.
若不是,则交换最大的节点对应元素与该节点对应的元素,然后对交换的那个节点继续进行max-heapity操作
最坏情况下,child节点的size为2n/3,故running time function满足:
>$T(n)=T(2n/3)+\Theta(1)$

根据master method,算得running time为$O(lgn)$,可用高度h代替写成$O(h)$(h约等于lgn)

### 6.3 Building a heap
通过调用max-heapity来构造max-heap:
>从i=$\lfloor n/2\rfloor$(即除leaf节点外index最大的节点)开始到i=0,依次调用max-heapity(A,i)

initialization:通过loop invariant证明正确性,首先leaf节点显然是max-heap
maintenance:然后调用一次会让i节点形成的binary tree成为max-heap
termination:最后,当i=0时,整个binary tree会是max-heap

min-heap可通过类似操作制造
制造heap需要$O(n)$的running time
首先深度h至多为$\lfloor lgn \rfloor$,每个深度的node至多为$\lfloor n/2^{h+1}\rfloor$,故running time可写为:
$\sum_{h=1}^{\lfloor lgn \rfloor}\lfloor n/2^{h+1}\rfloor O(h)=n\sum_{h=1}^{\lfloor lgn \rfloor}\lfloor 1/2^{h}\rfloor$,然后对后面的$\sum$加式根据公式求极限,得lim=2,故running time为O(n)

### 6.4 Heap sort
利用build max heap和max-heapity,先利用数组A(length=n)建立一个max-heap,然后将A[n]与A[1]交换,然后让heap size减一,n也减一,重复操作
可以简单地根据build max heap和max-heapity的running time得出heap sort的running time为O(nlgn)

### 6.5 priority queue
priority queue即一个维持一个set的元素性质的数据结构,每个元素对应量为	key
它可认为是一个事件序列，事件的key代表事件的优先级
max-priority queue满足如下性质：
>可进行INSERCT(S,x)操作,插入一个值到其中	
>MAXIMUM(S)操作,返回最大值
>EXTRACT-MAX(S)返回并去除最大值
>INCREASE-KEY(S,x,k),将x的key换为k,k需要大于等于原来的key

四个操作可用max-heap实现
第二个直接返回A[1]即可
第三个返回A[1],并将A[1]与A[heap-size]交换,然后将heap-size减一然后调用max-heaprity(A,1)操作
第四个将A[x]的key换为k后,将A[x]与它的parent比较,若大则交换并继续比较,直到小或者到A[1]
第一个将heap-size加一,并将最后一个值设为无穷小,然后调用INCREASE-KEY(S,heap-size,x)即可
除第二个操作是$\Theta(1)$外,其他操作均拥有$O(lgn)$的running-time

## 7 Quicsort
### 7.1 Description of quicksort
quicksort利用divide and conquer,先将数组分为大于标志变量和小于标志变量的两部分,然后对那两部分继续使用quicksort,直到分到最小为止
它最差的情况下running time为$\Theta(n^2)$,expected running time为$\Theta(nlgn)$
partition的操作可按如下步骤:
>设数字的index最左为p,最右为r,设A[r]为标志变量,i=p-1,j=p
>然后比较A[j]和A[r],若大则与A[++i]交换,若小则不操作,然后将j的值+1
>当j=r时停止操作,然后将A[r]与A[i+1]交换

该操作需要$\Theta(n)$的running time
可用loop invariant证明它的正确性,即证明它维持$A[k]\le A[r](k=p..i)$,$A[k]\ge A[r](k=i+1..j-1)$

### 7.2 Performance of quicksort
quicksort的running time取决于partition的结果
当情况最差,即partition只分出一个部分即:
>$T(n)=T(n-1)+\Theta(n)$

此时running time为$\Theta(n^2)$

当情况最好,即partition分成均匀的两部分,即:
>$T(n)=2T(n/2)+\Theta(n)$

利用master method算得running time为$\Theta(nlgn)$

一般情况下的running time和最好时的较接近
如若假设partition分成了1/10和9/10,利用recursion tree可算得running time为$O(nlgn)$

### 7.3 A randomized version of quicksort
添加一个操作,即在每次partition之前,先将A[r]与数组中随机一个一个数进行交换,然后再进行partition,这样可让partition分出的两部分比较balance

### 7.4 Analysis of quicksort

## 8 Sorting in linear time
### 8.1 Lower bounds of sorting
**comparison sort**:用比较来决定元素顺序的sort algorithm
**decision tree**:表示算法比较过程的full binary tree(每个节点有0或2个child)，每个节点代表一个比较，形如1:2,其中的数字代表比较的两个元素$1\le i,j\le n$,若$\le$向左走,若$>$向右走,leaf节点代表比较形成的序列,形如<1,3,2>
对于一个正确的sort algorithm,必须至少有$n!$个可以到达的不同的leaf节点

对于一个comparison sort,在worst cases有$\Omega(nlgn)$的running time
>利用decision tree证明,到达一个decision tree的leaf的路径的最大长度等同与tree的高度h,设decision tree有l个leaf,根据上面的说明,有:
$$n!\le l\le 2^h$$
故$h\ge lg(n!)=\Omega(nlgn)$
### 8.2 counting sort
counting sort假设要sort的元素满足$0\le t\le k$,如何利用一个C[k]数组存储数字i有多少个大于等于它的元素,这样的话要sort直接放在C[k]存储的位置即可
这个sort algorithm没有比较发生,故没有$\Omega(nlgn)$的限制,它的running time为$\Theta(n)$
这个sort是stable的,即要sort的数组中相同的元素sort后仍按原来的顺序排列

### 8.3 Radix sort
这个algorithm被用于早期的card-sort machine
核心是从数字的最后一位开始,根据该位数字进行sort,然后提高一位继续sort,直到最高位
注意用于sort的algorithm必须是stable,不然会出错

它的running time为$\Theta(d(n+k)$,其中d是位数,k是每位数的大小,更精确一点,$\Theta((b/r)(n+2^r))$,其中b是数字的bits,r是每位数字的bits
当$b\le \lfloor lgn \rfloor$,取r=b得$\Theta(n)$
当$b>\lfloor lgn \rfloor$,取$r=\lfloor lgn \rfloor$得$\Theta(bn/lgn)$

注意radix sort一般是**not in place**的

### 8.4 Bucket sort

对一组在一定范围的数字,将一定范围分成n个相同的部分,作为bucket,然后将数字放入各个bucket,对各个bucket的数字分别排序,然后借助bucket的大小关系完成排序
bucket sort假设输入的数字uniform distribution,即每个数字属于某个bucket的可能性是相同的
它的running time为$\Theta(n)+\sum_{i=0}^{n-1}E(O(n_i^2))$


利用indicator random variable，可算得$\sum_{i=0}^{n-1}E(O(n_i^2))=\sum_{i=0}^{n-1}O(E(n_i^2))=\sum_{i=0}^{n-1}O(2-1/n)$,故bucket sort的running time为$\Theta(n)$

## 9 Median and order statistics
median代表一组数中中间大小的那一数
对于有偶数个的一组数，取较小的那个中间数作为median

**selection problem：** 即给定一组数，找出第i小的数

### 9.1 Minimum and maximum
找出minimum num,即最小的数或maximum num,即最大的数,至少需要n-1比较
不过若两个同时都找时,则可以只进行$3\lfloor n/2 \rfloor$次比较,方法是先确定max 和min,然后对每对数,先比较它们本身,然后较大的和max比,较小的和min比
若有奇数个数,则最开始将第一个数同时设为min 和max

### 9.2 Selection in expected linear time
给出了一个解决selection problem的算法
>利用quick sort的randomized partition,将数组分为两部分:
若中间的那个数就是第i个数,则返回结果
若中间的那个数是的order k>i,则在前面部分的数组继续找第i个数
若中间那个数的order k< i,则在后面部分的数组举行找第i-k个数

该算法的worst case running time为$\Theta(n^2)$,此时每次都需要在n-1大小的子数组继续操作
它的expected running time为$O(n)$,下面的计算是在每个数都不一样的前提下进行的:
设$X_k=\{partition得出的中间数是第k小的数\}$,易得$E(X_k)=1/n$
则running time有:
>$$T(n)\le \sum_{k=1}^{n}X_k(T(max(k-1,n-k))+O(n))$$

求expected,并化简,得:
>$$E[T(n)]\le 2/n\sum_{k=\lfloor n/2 \rfloor}^{n}E(T(k))+O(n)$$
化简的逻辑是上面的max(k-1,n-k)后面较大的那些数都出现了两次

最后通过substitution method得$T(n)=O(n)$

### 9.3 Selection in worst case linear time
该算法可在$O(n)$的running time下解决selection problem,核心是优化partition

该算法有五步:
>1. 先将将数组五个五个分成一组,其中一组放n/5产生的余数
>2. 利用insertion sort找出每组的median
>3. 利用该算法本身找出每组的median组成的数组的median
>4. 利用找出的median进行partition操作
>5. 若x的位置k就是要找的数,则算法结束,若不是,则在i>k时在大数字的数组找第i-k个,在i< k时在小数字数组找第i个

为分析该算法的running time,我们先需要确定大于或小于第三步产生的median的数字的下界
任意分析得,除去median所在的5个元素的数组和存余数的数字,至少有一半的数组有3个数字大于或等于median
故我们需要的下界为:
>$$3(1/2*\lceil n/5 \rceil-2)\ge 3n/10-6$$

对于小于或等于情况可按同样的方法得到下界
故上界为**7n/10+6**

对于上面的五步算法,1、2、4需要$O(n)$的running time,3则需要$T(\lceil n/5 \rceil)$,5则需要$T(7n/10+6)$
故得recurrence:
>$$T(n) = T(\lceil n/5 \rceil)+T(7n/10+6)+O(n)$$

然后利用substitution method求解
注意可以设n小于某个数时$T(n)=O(1)$,这样求解会方便些

#  

# Ⅲ data structures

概念：

**dynamic sets**：可被算法操作而增大减小或进行其他变化的set

 **dictionary** ：支持insert、delete、test membership的dynamic set

**key**：dynamic set的性质用于区别set的对象

operations 分类：

**query**：返回set的信息

**modifying operation** ：修改set

一些operations：

**SUCCESSOR（S，x）**：找出set S中比x指向的对象key大的下一个对象，若x是最大的，返回NIL

**PREDECCESSOR（S，x）**：找出set S中比x指向的对象key小的下一个对象，若x是最小的，返回NIL

## 10 ELementary data structures

### 10.1 Stacks and queues

**stack**：First in，last out的数据结构，即在尾部对数据进行操作，在尾部增加元素叫push，删除元素叫pop。

**queue**：FIrst in，first out的数据结构，即在头部和尾部进行操作，在尾部增加元素就enqueue，在头部减少元素叫dequeue

### 10.2 Linked list

**linked list**：即利用指针实现的线性表，通过一个对象指向另一个对象来表示顺序

**head**：linked list的开头 **tail**：linked的结尾

**singly linked list**：即单向链表，每个元素只指向下一个元素

**doubly linked list**：即双向链表，每个元素即指向下一个元素也指向上一个元素

**circular linked list**：即循环链表，head元素的pre指向tail，tail的next指向head

**sentinel**：即一个空的用于链表元素所有性质的元素，有时可用于简化链表的operation

### 10.3 Implementing pointers and objects

有时有些编程环境不支持pointer和object，我们可以用一些方法来实现它们

我们可以用**多个数组**来实现，每个数组代表object的各个性质，其中一个数组代表pointer，存储数组的下标代表指向

我们也可以用**一个数组**来实现，用一定的偏移量来代表object的各个性质，如i代表key，i+1代表pointer，一个数组可用于实现object长度不相同的情况

我们利用**allocate and free**来实现object的增添，free list即按上面方法实现的object list，但只有pointer性质有存储东西，allocate将free list的头元素放入了object list，增加了object个数，free object则将对应的object放入free list

### 10.4 Representing rooted tree

rooted tree类似binary tree，不同的是它可以由任意多个child节点

在child节点较多时，用多个指针代表它们会浪费大量的内存空间，这时我们可以利用一个指针，指向最左边的child，child节点也由指针指向它右边的child节点（right-sibling），这样便可节省内存空间

有时也用其他方法表示，具体问题要具体分析



## 12 Binary search tree

### 12.1 What is a binary search tree

即binary-tree满足如下性质:

> 若x是某个节点,y,z为它的左右子树的节点,则$z.key\ge x.key\ge y.key$,

三种遍历:

**inorder tree walk**:先遍历左节点,然后是根节点,然后是右节点

**preorder tree walk**:先根节点,然后左节点,然后右节点

 **postorder tree walk**:先左右节点,然后再根节点

binary search tree可通过inorder tree walk来得到一个排完序的数组,且它的running time为$\Theta(n)$

因为一定需要经过n个节点,$\Omega(n)$很容易得到

$O(n)$则通过substitution method证明,可设$T(n)\le (c+d)n+c$,通过设一边的子树有k个节点,得:

> $$T(n)=T(k)+T(n-k-1)+O(1)$$


### 12.2 Querying in a binary search tree

binary search tree支持一些query,且每个的running time都为O(h),h为tree的height

**search**:从root开始,若找的值为root的key,则返回root,若大,则对root的rchild递归调用search,若小则对lchild递归调用

也可用循环,每次让x=lchild或rchild即可,注意判断x是否为NIL

**Minimum**:一直让x=lchild直到lchild为空

**Maximum**:类似Minimum,不过l变成r

**Successor**:x的右子树不为空,则找出右子树的Min,若为空,则让y=x.p,即x的父节点,然后x=y,y=y.p即x的父节点,然后让x=y,直到x为y的左子树若y为空

右子树为空的情况的方法利用的性质是x的successor一定会是left child是x的ancestor的lowest ancestor

证明:

先证y(x的successor)一定是x的ancestor,若y不是,设z为x和y的一个公有的ancestor,则有x<z<y,与successor的定义矛盾

然后证y的left child一定是x的ancestor,若left child不是,则x在y的right child,则x>y,与successor的定义矛盾

再证明是lowest ancestor,若不是,让z是x的满足性质的ancestor,则z在y的左子树,则z<y,同时x<z(x在left),与successor的定义矛盾

**Predecessor**:类似Successor

### 12.3 Insertion and deletion

**Insertion**:insertion操作较为简单,根据要插入的z的key,不断从root往下直到叶节点,然后根据key插在叶节点的左或右边

若root为空,则让z为root

它的运行时间为O(h)

**Deletion**:

deletion的情况比较复杂,我们先定义如何用节点代替节点,即transplant操作:

> 对于用v代替u的transplant操作,若u.p为空,则直接让root=v
>
> 若u是u.p的左节点,则u.p.left=v
>
> 若u是u.p的右节点,则u.p.right=v
>
> 最后,若v不为空,则v.p=u.p

注意上述操作并未解决u的左右节点的问题

然后我们对delete的情况分类讨论

> 若要删除的z左节点为空,则直接transplant(T,z,z.right)
>
> 若左节点不为空,右节点为空,则transplant(T,z,z.left)
>
> 若上面的情况都不满足,则让y为z在右子树的successor,即右子树的最小值,此时y没有左子树,然后再分两种情况:
>
> 若successor为z的右节点,则transplant(T,z,y),然后让y=z.left,z.left.p=y
>
> 若successor不是z的右节点,则先transplant(T,y,y.right),让y空出来,然后y.right=z.right,y.right.p=y,使得y可视为z的右节点,然后再进行上面的操作

delete的running time也为$O(h)$,其中找出y需要$O(h)$，其他的操作为常数级

### 12.4 Randomly built binary search tree

我们从数组每次随机选择一个数，并插入到树中，执行操作n次后得到randomly built binary search tree

它的expected height为$O(lgn)$

要证明，我们先定义$X_n$为n个节点的randomly built binary search tree 的height,然后定义$Y_n=2^{X_n}$,

当我们选择一个数准备插入时,设该数在数组中的rank(即第几大)为$R_n$,当$R_n=i$时,易得:

> $Y_n = 2*max(Y_{i-1},Y_{n-1})$

然后我们设一个indicator random variable$Z_{n,i}=I\{R_n = i\}$,易得$E[Z_{n,i}]=1/n$,然后我们可以得到:

> $Y_n=\sum_{i=1}^nZ_{n,i}2*max(Y_{i-1},Y_{n-1})$

求期望得:

> $E[Y_n]=\sum_{i=1}^n1/nE[2*max(Y_{i-1},Y_{n-i})]  \\\le2/n\sum_{i=1}^n(E[Y_{i-1}]+E[Y_{n-i}])\\ \le4/n\sum_{i=1}^{n-1}E[Y_i]$

其中第三个式子用的是$Y_i$的多次出现化简得到的

易得

$Y_0=0\le1/4\begin{pmatrix} 3\\3\end{pmatrix}=1/4,Y_1=1\le 1/4\begin{pmatrix} 4\\3\end{pmatrix}=1$

然后我们设对于$n-1\le i,E[Y_n]\le 1/4\begin{pmatrix} n+3\\3\end{pmatrix}$成立,然后证明n的情况:

> $E[Y_n]\le 4/n\sum_{i=1}^{n-1}1/4\begin{pmatrix}i+3 \\3\end{pmatrix}\\ \le1/n\sum_{i=1}^{n-1}\begin{pmatrix}i+3 \\3\end{pmatrix} \\ =1/n\begin{pmatrix} n+3\\ 4\end{pmatrix} \\=1/4\begin{pmatrix} n+3\\3\end{pmatrix}\\ $

然后化简:

> $E[Y_n]\le\frac{n^3+6n^2+11n+6}{24}$

两边求对数即可得$E[X_n]=O(lgn)

## 13 Hash tables

### 13.1 Direct-address table

即可以一下子将集合中的key和slot（数组中的位置）对于起来的结构，可以让key和数组下标一致来实现可以一下子找到

它支持search insert delete操作

一般会将key、satellite data和slot分开储存，并由slot指向key，但有些情况它们一起储存，但此时我们需要一些特殊的方法来表明slot是空的

### 13.2 Hash tables

direct-address table的纯粹需要$|U|$,即集合的大小的存储空间,这样的存储方式浪费了很多空间，我们可以利用**hash table**来实现$\Theta(K)$级别,即实际存储了的key的大小的级别,的空间复杂度

在hash table中,我们利用$h(key)$来算出key对于的slot,故可得到hash table可以有一个比U小的size **m**,

因为我们需要让$m<U$,故一定会出现多个key的$h(key)$相同的情况,这种情况叫**collision**,我们可以利用**chaining**,即每个slot对于一个链表来解决这个问题

接下来分析hash table的search的复杂度

**worst-case**是$\Theta(n)$,这是很明显的,对于的情况是所有的key都被堆在一个slot里面

 接下来考虑**average case**

首先我们先定义load factor $\alpha=n/m$,即平均每个slot对应多少个key

我们假设我们的hash function可以实现**simply uniform hashing**,即每个key进入哪个slot的概率的相同的

找不到key的情况的running time为$\Theta(1+\alpha)$,此时我们遍历key对于的整个链表

找得到的情况也是$\Theta(1+\alpha)$,分析如下

我们先定义一个indicator random variable$X_{ij}$,表示第i个插入的元素和第j个插入的元素key对于的hash值相同的event,故有$E[X_{ij}]=1/m$

我们插入元素时是将新的插在已有元素的前面,故找到我们需要的key经过的key的多少等于在我们的需要的key之后插入到该slot的key的多少

故有:

$$E[1/n\sum_{i=1}^n(1+\sum_{j=i+1}^nX_{ij})]\\=1+1/(mn)\sum_{i=1}^n(n-i)\\=1+(n-1)/2m\\=1+\alpha/2-\alpha/2n$$

故running time为上述结构加1(算hash的时间),即$\Theta(1+\alpha)$

上述分析中的$\alpha=O(1)$,故serch的average running time为$\Theta(1)$

### 13.3 Hash functions

一个好的hash function需要满足或近似`simple uniform hashing`,即每个key分配到每个slot的机会相同,有时也需要满足一些其他性质

一般hash function都假设key都自然数,故有时需要转化key成自然数

`division method`:$h(k)=k \;mod\;m$,其中m一般选择一个离2的倍数较远的素数

`multiplation method`:$h(k)=\lfloor m(kA\;mod\;1) \rfloor$,其中mod 1即取小数部分.一般将m选择为2的倍数,将A选择为$(\sqrt{5}-1)/2$,这样可以方便计算机写算法

### 13.4 Open addressing

open addressing也是一种处理哈希冲突的方法,它要求hash table没有链表，每个slot存储key本身，它将链表节省的空间用于增加slot

`probe`:即根据每一个key参数一个[1..m-1]的排列,然后根据该排列检索hash table

产生probe序列的方法:

`linear probe`:$h(k,i)=(h'(k)+i)\;mod\;m$,其中h'(k)是副哈希函数,	这会产生primary clustering的问题

`quadratic probe`:$h(k,i)=(h'(k)+c_1i+c_2i^2)\; mod\;m$,这会参数secondary clustering的问题

`doubly hashing`:$h(k,i)=(h_1(k)+ih_2(k))\;mod\;m$,这是较好的产生probe序列的方法,它能产生$\Theta(m^2)$个序列,而不是上面两种方法的$\Theta(m)$个

在满足uniform hashing，即每个probe序列是[1..m-1]的某个排列的可能性都相同时,有如下期望值的结论:

同13.2定义$m,n,\alpha$,

1.一次不成功的搜索需要$1/(1-\alpha)$次

证明:

定义$A_i$为第i次probe遇到已有内容的slot的事件,$X$为probe过程中遭遇已有内容的slot的次数,易得$A_i=(n-(i-1))/(m-(i-1))$

再由n<m得出$(n-i)/(m-j)\le n/m$

故有:

$Pr\{X\ge i\}=n/m*(n-1)/(m-1)..(n-i+2)/(m-i+2)\\\le(n/m)^{i-1}=\alpha^{i-1}$

故$E[X]=\sum_{i=1}^{\infty}Pr\{X\ge i\}\\=\sum_{i=1}^{\infty}\alpha^{i-1}=1/(1-\alpha)$

2.一次插入需要$1/(1-\alpha)$次probe

一次插入前先进行了不成功的搜索,故得证

3.成功搜索需要$1/\alpha \ln(1/(1-\alpha))$次

设查找的key是第i次插入的key,则该数需要的搜索次数为$1/(1-i/m)=m/(m-i)$

故平均搜索次数为:

$\frac{1}{n}\sum_{i=0}^{n-1}\frac{m}{m-i}\\=\frac{1}{\alpha}\sum_{k=m-n+1}^{m}\frac{1}{k}\\\le\frac{1}{\alpha}\int_{m-n}^{m}(1/x)dx=1/\alpha \ln(1/(1-\alpha))$

其中用到了:

$\int_{m}^{n+1}f(x)dx\le\sum_{k=m}^{n}f(k)\le\int_{m-1}^{n}f(x)$

## 14 Binary search tree

### 14.1 What is binary search tree

二叉搜索树只满足左节点的key小于父节点的key，右节点的key大于父节点的key的二叉树

可以用中序遍历（inorder tree walk）理由二叉搜索树生成一个有序序列，使用的时间为$\Theta(n)$

证明:$\Omega(n)$显然成立,再利用substitution method证明$O(n)$

### 14.2 Querying a binary search tree

二叉搜索树的`search`操作可用递归使用，若某节点的值不是要找的key，则将该值与key比较，大则在左子树找，小则在右子树。当然也可写成迭代。

`Minimum`和`Maximum`操作则只需找到最低的最左节点和最右节点即可

`successor`和`predecessor`操作则需要分情况讨论,这里以`successor`操作为例

若右子树不为空,找出该节点右子树的最小节点

若右子树为空,找出左子树是该节点父节点的最低节点

第二个情况的证明如下:

>首先证明successor y是父节点,若successor不是子节点,则此时它不可能是所求节点x的子节点(右子树为空),故它们有公共节点z满足x<z<y,这与successor的定义矛盾
>
>接下来证明successor的左子树是x的父节点,若不是,则y的右子树是x的父节点,则x>y,与y的定义矛盾
>
>接下来证明是最低(最深)的满足上述调节的子节点,若不是,设z是最低节点,则z必须在y的左子树,这说明x<z<y,与y的定义矛盾

以上操作的复杂度均为$O(h)$,h为树的高度

### 14.2 Insertion and deletion

`insert`操作比较简单,直接找到最左或最右的空位插入集合,注意最开始要判断是否为空树,而且需要另一个变量储存遍历的上一个结果(遍历的结果为NIL,没有意义)

`delete`操作则比较困难

首先我们分析除delete有四种情况

> 一 当被删除的节点z没有子节点时,直接将z的p中的z值变为空
>
> 二 当z只有一个子节点时,将用子节点替换z
>
> 当z有两个子节点时,先找出z的successor y,然后有两种情况
>
> 1.当y是z的右子节点时,直接用y替换z
>
> 2.当y不是z的子节点时,我们先将y用y的右子节点替换y,然后用y替换z

实际处理时,可先检验左子节点存在,若不存在则用右节点替换z(一 二),若存在检验右节点存在,若不存在则用左子节点替换z(二),若存在则处理最后两种情况

为了处理,我们一般定义一个transplant函数用来替换节点,里面的操作就是将要替换的节点u的父节点的相关值设为v,然后将v的p设为该父节点

上述操作的运行时间也是$O(h)$

## 15 Red-black tree

### 15.1 properties of red-black trees

红黑树是满足一些特殊性质的二叉搜索树，它每个节点多出一个叫`color`的属性

它的叶节点(leaf,最底的节点)都是NIL,一般我们可以用一个`T.nil`来代表所有的NIL,以简便说明,注意`T.nil`的子节点为根节点,画的时候可以把空节点省略

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

我们定义`black height`,为从某节点到叶节点的路径上的黑节点数(不包含该节点),由红黑树的性质我们知道每个节点都有一个确定的black height,故我们用一个函数`bh(x)`为x节点的black height

红黑树的高度有如下定理:

> 红黑树的高度最高为2lg(n+1)

证明:

我们先证明某个节点和它的子树最少有$2^{bh(x)}-1$个节点

> 利用归纳法证明
>
> 当高度h为0时,x比为空节点,故bh(x)=0,此时$2^0-1=0$
>
> 设某个h不为0的节点x,它的左右子树的black height至少有着bh(x)-1(取决于该子树是否为黑节点),假设字节带你满足上述性质,则该节点的子树的节点数为$(2^{bh(x)}-1)+(2^{bh(x)}-1)+1=2^{bh(x)}-1$,故假设成立

然后再借助此性质完成证明

> 由红黑树的第四个性质我们知道black height至少为$h/2$,
>
> 故对于n个节点的红黑树有$n\ge 2^{h/2}-1$,然后便可得$h\le 2lg(n+1)$

### 15.2 Rotation

`rotation`是一种操作树节点的操作,它会把某个子树的根节点换成该子树的左子节点(或右),然后将该根节点变成右子节点(或左),这个过程二叉搜索树的性质维持着.根据功能的不同分别命名为`Left-Rotation`和`Right-Rotation`.注意它们都有假设某一子节点不为空

这里以Left-Rotation为例,若想进行操作,除了上述处理外,还需将根节点的左子树变为左子节点的右子树

### 15.3 Insertion

对于红黑树的插入，我们在二叉搜索树插入操作的基础上，将插入的z的左右子树设为T.NIL,然后将z设为红色

然后再执行`fixup`函数来维持红黑树的性质

fixup函数的正确性可用循环不变式来证明

首先我们明确,对于红黑树的性质,插入操作只可能违反性质1或者性质4,性质1我们可以在程序的最后让T.root.color=black来解决,然后只剩下性质4

当插入的z的父节点是黑节点时,显然不违反性质4

当插入的z的父节点是红节点时,此时分三种情况

> 1.若z的uncle(z.p.p的另一子节点)是红节点,则将z.p和uncle都弄成黑节点,然后将z.p.p弄成红节点,然后设z.p.p为新的z
>
> 若z的uncle是黑节点
>
> 2.若z是右子节点,对z和z.p执行Left-Rotation,然后设在原本的z.p为z,此时就变成了第三种情况
>
> 3.若z是左子节点,则z.p和z.p.执行Right-Rotation,此时可以维持性质4了

这样最后的插入执行时间还是$O(lgn)$

### 15.4 Deletion

红黑树的删除操作效率仍未$O(lgn)$,但非常复杂

首先,在二叉搜索树的删除操作的基础上,我们添加两个量`x,y-original-color`,一个记录代替y节点原来位置的节点,另一个记录y节点原本的颜色,y也不止记录删除的z节点的successor,在前两种情况种,y就是删除的节点z

若最好y原来的颜色为红色,则删除操作不违背红黑树的性质,原因如下

> 一 没有black-height发生改变
>
> 二 没有产生两个相邻的红节点.y取代了z的位置和颜色,自然不会凭空产生红节点.而y原来是红色,它的子节点自然没有红色,故y位置旁边不会有相邻的红节点.
>
> 三 y不可能是根节点,故根节点仍为黑色

当y原来的颜色为黑色时,它可能在如下情况违反红黑树的性质

> 一 若y是根节点,y的一个红子节点成为新的根节点,违反性质2
>
> 二 若操作完成后x和x.p均是红节点,违反性质4
>
> 三 显然违反性质5

对于性质5,我们让x节点成为特殊的节点,拥有`extra black`,即无论x节点是什么颜色,它都拥有一个额外的黑色,这样维持了性质5,然后通过一系列操作消除这个额外的黑色

我们设置一个变量`w`存储x的兄弟节点(父节点的另一个子节点)来辅助,这又分为4种情况

注意以下操作均在x的颜色为黑且x不为根节点的情况下执行

> 一 w为红节点
>
> 则我们把x.p(必为黑色)设为红,w设为黑,然后对x.p执行left-rotation,然后就变成二 三或四了
>
> 二 w为黑节点,而且它的两个子节点均为黑节点
>
> 我们将w变为红节点,然后就可以直接消除extra black,然后让x.p变为新的x
>
> 三 w为黑节点,且它的子节点左红右黑
>
> 我们把w的左子节点设为红,w设为黑,然后对w执行right-rotation,然后变成四
>
> 四 w为黑节点,且它的右子节点为红节点
>
> 我们将w设为x.p的颜色,x.p的颜色设为黑色,将w的右子节点设为黑色,然后对x.p执行left-rotation,这样就消除了extra black,且不违法任何性质,直接让x为根节点结束循环

在最后,我们将x的颜色设为黑色

注意以上操作同样会维持性质2和性质4，理由如下

> 对于性质2,四种情况中只有2和4可能结束循环,4显然会复合性质2,至于2,结束循环时要么x为黑要么x是根节点,且在程序的最后统一会将x设为黑色,故必符合
>
> 对于性质4,违反只有可能在x和x.p均为红时违反,而x在最后总会设为黑色,故不违反性质4

# Ⅵ Graph algorithms Introduction

## 22 Elementary graph algorithms
### 22.2 Breadth first search
BFS从源点开始，先找出它的所有子节点，然后再从子节点开始一个个重复上述操作，直到子节点为空
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
其中的test数组存储着vetex的各种信息，图的edge信息则在testGraph数组里面
这样求出的每个vetex的d是从开始点到该点的最短路径
该程序事实上生成了BFTree

### 22.3 Depth first search
DFS是从源点出发，从一个子节点开始一直走到最深处，然后回溯上一级的父节点接着找
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
其中的test数组存储着vetex的各种信息，图的edge信息则在testGraph数组里面,time为初始化为0的全局变量

DFS proprities:
>parenthesis theorem
>>[v.d,v.f],[u.d,u.f] 完全分离，则它们不在同一棵DFTree
>>[v.d,v.j]在[u.d,u.f]中，则v是u的后代
>>[u.d,u.f]在[v.d,v.j]中，则u是v的后代

>white-path theorem:v是u的后代当且仅当u.d时有一条u到v的path完全由white vertex 组成

四种edge
>tree edge：Edge（u，v）是tree edge当且仅当v是由Edge（u，v）第一次发现的
back edge：一种在DFTree里面将v与祖先连接在一起的edge
forward edge：一种在DFTree里面将v与后代连接在一起的edge
cross edge：除上面之外的所有edge

当DFS找到Edge（u，v）时：
>$v.color=white\Rightarrow tree\;edge$
>$v.color=gray\Rightarrow back\;edge$$(遍历总是从最深的gray\;vertex开始，故v必是u的祖先)$
>$v.color=black\Rightarrow other \;two\;edges$

undirected graph的edge一定是tree edge或back edge（借助每个edge都是双向的证明）