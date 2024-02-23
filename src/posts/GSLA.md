---
title: GSLA
tags: math
categories: reading
mathjax: true
abbrlink: 146a5e7e
date: 2021-12-23
updated: 2022-04-05
---

线性代数相关内容的学习总结.

<!-- more -->

## 第一章

基本是已经学过的内容，过了一遍后面的 key idea

### 1.1 Vecotrs and Linear Combinations

介绍了向量（vector）与向量的基本计算：
$$v+w=(v_1+w_1,v_2+w_2) \\cv=(cv_1,cv_2)$$
介绍了线性组合（linear combination），形如：
$$cu+dv+ew$$
介绍了几个向量的全部线性组合可以组成直线、平面、空间

### 1.2 Lengths and Dot Products

介绍了点乘（dot product\inner product），形如：
$$vw=v_1w_1+v_2w_2...+v_iw_i$$
介绍了向量长度的概念，以及 unit vector（当向量长度为一时），其中向量长度的公式为：

$$
\begin{equation}
||v||=\sqrt{vv}
\end{equation}
$$

给了两个公式：
$$cosθ=\frac{vw}{||v||*||w||}$$
schwarz inequality
$$|vw|<=||v||*||w||$$
triangle inequality
$$||v+w||<=||v||+||w||$$

### 1.3 Matrices

引入了矩阵
说明 Ax=b 中的 b 是 A 各列的线性组合
涉及了一些后面的概念，如逆矩阵
independent dependent

## 第二章

### 2.1 Vectors and Linear Equations

引入了行图像（row picture）列图像（column picture）以更好地描述线性组合

### 2.2|2.3 Elimination

介绍了消元法（elimination）与回代（back substitution）
引入了 upper triangular matrix 单位矩阵（identity matrix）I
elimination matrix E(在左）增广矩阵（argumented matrix）
主元（pivot）不可为 0

### 2.4 Rules for Matrix Operations

介绍了四种矩阵乘法的计算方法
1 看成点乘 AB=C C 的 i 行 j 列的元素由 A 的 i 行与 B 的 i 列的点乘得到
2 $$AB=[Ab_i...Ab_p]$$
3 A 的 i 行乘以 B 矩阵得到 C 的 i 行
拓展：AB 的行是 B 的行的线性组合:

$$
[a\;b\;c]\begin{bmatrix}1&2\\3&4\\5&6\end{bmatrix}=
[a\;3b\;5c]+[2a\;4b\;6c]=a[1\;2]+b[3\;4]+c[5\;6]
$$

4$$AB=\begin{bmatrix}a & b\\c & d\end{bmatrix}
\begin{bmatrix} E & F\\G & H\end{bmatrix}+
\begin{bmatrix} a \\ c\end{bmatrix}
\begin{bmatrix} E & F\end{bmatrix}+
\begin{bmatrix}b \\ d\end{bmatrix}
\begin{bmatrix} G & H\end{bmatrix}=
\begin{bmatrix} aE+bG & aF+bH\\ cE+dG & cF+dH\end{bmatrix}$$
给出了一些矩阵乘法的运算规则
1 $$ AB\ne BA(一般情况）$$
2$$ A(B+C)=AB+AC$$
3$$ (A+B)C=AC+BC$$
4$$ A(BC)=(AB)C$$
5$$ A^pA^q=A^{p+q}\;(A^p)^q=A^{pq}$$
$$AI=IA $$
block multiplication

$$
\begin{bmatrix}A_{11} & A_{12}\\A_{21} & A_{22}\end{bmatrix}
\begin{bmatrix}B_{11}\\B_{21}\end{bmatrix}=
\begin{bmatrix}A_{11}B_{11}+A_{12}B_{21}\\A_{21}B_{11}+A_{22}B_{21}\end{bmatrix}
$$

block elimination（不理解）

### 2.5 Inverse Matrices

介绍了逆矩阵（inverse matrix）满足：
$$A^{-1}A=I\\AA^{-1}=I$$
介绍了几个判断有无逆矩阵的依据

1 A（n 行）是可逆的（invertible）当且仅当 A 有 n 个主元（pivots）
2 如果 Ax=0 有非零解，那 A 没有逆矩阵
3 2X2 矩阵$\begin{bmatrix}a & b\\c & d\end{bmatrix}$可逆当且仅当$ad-bc\ne0$

AB 的逆矩阵$(B^{-1}A^{-1})$以此类推

Guass-Jordan method
$$[A\ \ I] to [I\ \ A^{-1}]$$

diaganally dominant matrics 为对角线上的元素大于该行剩下元素之和的矩阵
它一定可逆

方阵若没有逆矩阵则称为奇异的（singular）

### 2.6 Elimination = Factorization:A=LU

可将 A 因式分解为$$A=LU$$
其中 L 为 elimination matrix E 的逆矩阵，U 是 upper triangular matrix，A 也可分解为：$$A=LDU$$
此时 U 对角线上的元素都为 1

实际应用中会把 L 和 U 存储起来，故求解 Ax=b，先求 Lc=b 后求 Ux=c，这样可简化运算

the cost of elimination

### 2.7 Transposes and Permutations

转置（transpose）矩阵就是将矩阵的行变为列，即：

$$
\begin{bmatrix} 1&2&3\\0&0&4\end{bmatrix} \rightarrow
\begin{bmatrix} 1&0\\2&0\\3&4\end{bmatrix}
$$

记作$A^T$
几个性质：
$$(A+B)^T=A^T+B^T$$
$$(AB)^T=B^TA^T\\多个时以此类推$$
$$(A^{-1})^T=(A^T)^{-1}$$
$A^T$可逆仅当 A 可逆
symmetric matrices 满足：
$$S^T=S$$
可按如下方法创造 symmetric matrices：

$$
A^TA=S\;AA^T=S\\
proof:(A^TA)^T=A^T(A^T)^T=A^TA
$$

两个方式创造的 S 一般不一样
S 的逆矩阵也是 symmetric matrices
S 可进行因式分解：
$$S=LDU(没有行变换）\\此时U=L^T$$
permutation matrices P 为每行每列都有 1 的矩阵
P 可由 I 的行以任意顺序组合而成
$P^{-1}$也是 permutation matrices
nxn I 可形成 n！个 P
利用$PA=LU$可在消元前进行需要的行变换（A 需要可逆）
利用$A=LPU$可在消元后行变换
两者并不等价（？）
inner product:
$$x^Ty$$
A 矩阵满足：
$$(Ax)^Ty=x^TA^Ty$$
即 Ax 与 y 的 inner product 等价于 x 于$A^Ty$的 inner product

## 第三章

### 3.1 Space of vector

$R^n$有所有拥有 n 个元素的列向量组成
real vector space 满足所有向量加法乘法产生的向量都在该空间上
每个向量空间都有自己的 0 向量

M 所有 2X2 矩阵组成的向量空间
M 的三个子空间：
U（upper triangular matrices） D（diagonal matrices）$\begin{bmatrix}a&0\\0&b\end{bmatrix}$ $\\cI$

F 所有函数组成的空间，F 的维数是无限（infinite—dimensional）
F 有个较小的子空间 P，$P_n$包括所有满足$a_0+a_1x……a_nx^n$的向量
Z 只有 0 向量组成的空间 0 维 它是最小的向量空间

子空间（subspace）满足：
$$v+w\;cw均在子空间中$$
故一个包含 v、w 的子空间必须包括 v、w 的所有线性组合
子空间必定包括 0 向量

列空间 C（A）为 A 所有列的线性组合组成的空间
故 Ax=b 有解当且仅当 b 在 C（A）中
当 A 是$m\times n$矩阵时，C（A）是$R^m$的子空间

S：一些向量的集合
SS：S 中的向量的所有线性组合，故 SS 必是某个向量空间的子空间
SS the span of S

### 3.2 The Nullspace of A:Solving Ax=0 and Rx=0

nullspace N(A)包含 Ax=0 的所有解，它是$R^n$的子空间
它包含 Ax=0 所有特解的线性组合
free component 对应没有主元的列

reduced row echelon form R 满足：
主元都为 1
主元列仅有一个元素

A 的各列 independent 当且仅当 Ax=0 仅有一解
$m\times n$矩阵 A 当 n>m 时必有非 0 解
rank of A 指 A 中主元的数量，用 r 表示
n-r 为 nullspace 的维数

### 3.3 The Complete Solution to Ax = b

augmented matrix$[A\;b]$
particular solution$Ax_p=b$(当 free variables 都为 0 时）
$Ax_n=0,Ax_p=b$则 complete solution:
$$x=x_p+x_n$$
full colunm rank(r=n)的矩阵 A 具有以下性质：

> 1 每列都为主元列
> 2 没有自由变量和特解
> 3 N（A）仅有$\vec 0$
> 4 Ax=b 有解时仅有一解

当 Ax=b 有多解时称它 uderdetermined

full row rank(r=m)的矩阵 A 具有以下性质：

> 1 所有行都有主元，rres（A）没有 0 行
> 2 Ax=b 对所有 b 有解
> 3 column space 为$R^m$
> 4 有 n-r=n-m 个 special solutions

linear equation 的 4 种可能性：

| r m n   |                       | Ax=b solution |
| ------- | --------------------- | ------------- |
| r=m r=n | square and invertible | 1             |
| = <     | short and wide        | $\infty$      |
| < =     | tall and thin         | 0 or 1        |
| < <     | not full rank         | 0 or $\infty$ |

### 3.4 Independent basis dimension

当 Ax=0 仅有 0 解，A 的各列 linearly independent，与之相对的是 dependent

不能说矩阵 independent，可以说向量 independent

若一个向量集的向量的所有线性组合充满了一个空间，就说这个向量集 span 了这个空间

row space ：矩阵的各行形成的空间，实际是$C(A^T)$

向量空间的一个 basis 满足：
1.basis 中的向量 independent 2.他们 span 了这个向量空间

将空间中的向量用该空间的 basis 的线性组合表示有且只有一种表示法

A 的主元列是它的列空间的 basis
一个向量空间的 basis 中向量的个数就是它的 dimension

matrices space function space

### 3.5 Dimension of the Four Subspace

|                | symbol   | dimension |
| -------------- | -------- | --------- |
| row sapce      | $C(A^T)$ | r         |
| column sapce   | $C(A)$   | r         |
| nullspace      | $N(A)$   | n-r       |
| left nullspace | $N(A^T)$ | m-r       |

## 第四章

### 4.1 Orthogonality of Four subspaces

Orthogonal vectors 满足：

$$
v^Tw=0\\
||v||^2+||w||^2=||v+w||^2
$$

orthogonal subspaces 满足：
$$两个平面中的任意两个向量v、w满足v^Tw=0$$

$N(A)$ and $C(A^T)$ 是 orthogonal subspaces because Ax=0(A 看作行的组合)
类似的，$N(A^T)$and$C(A)$也是 orthogonal subspaces $C(A)$可看作$A^T$的行

orthogonal complement 满足：
$$对平面V、W，所有垂直于W的向量均在V中,及V为W_{\perp}$$
上述的 orthogonal subspaces 均为 orthogonal complement

注意： 1.同时在 orthogonal subspaces 的平面个向量必为 0 向量 2.在$R^3$两个二维子空间不可能是 orthogonal subspaces，因它们必有相同的非零向量

### 4.2 Projection

projection p vector b onto vector a
p 为 a 上离 b 最近的点
error $e=b-p$, e 垂直与 a，且经过 b

直线的 projection matrix P 满足:

> $p=Pb$ > $P=\frac{aa^T}{a^Ta}(proof:a(b-a\hat{x})=0,p=a\hat{x}\Rightarrow \hat{x}=\frac{a^Tb}{a^Ta})$ > $P^2=P$ > $(I-P)b=b-p=e$

subspace 的 projection p 满足：
$$p=\hat{x_1}a_1+...+\hat{x_n}a_n=A\hat{x}$$

求$\hat{x}(n\times1)$:
$$A^T(b-A\hat{x})=0\;or\;A^TA\hat{x}=A^Tb$$
解释：$e$垂直于 A 的列空间，故$A^T$的每一行与 e 的 dot product 都为 0

求$p(m\times1)$:
$$p=A\hat{x}=A(A^TA)^{-1}A^Tb$$

求 P:
$$P=A(A^TA)^{-1}A^T$$

A 的各列 linearly independent 时，A 是 sysmetric、invertible、squre
其中 A invertible 当且仅当 A 的各列 linearly independent

###4.3 Least Squares Approximations

当 Ax=b 无解时
least squares solution $\hat{x}$让$E=||Ax-b||^2$ 尽可能小
通过$A^TA\hat{x}=A^Tb$解出$\hat{x}$

### 4.4 Orthonormal bases and Gram-Schmidt

vector $q_1...q_n$是 orthonormal 时满足：

$$
q_i^Tq_j=\left\{\begin{array}{ll}
                  0(i\ne j)\\
                  1(i=j)
                \end{array}\right.
$$

$Q(orthogonal\;matrix)$ 满足：

> $Q^TQ=I(inverse=transpose)$ > $||Qx||=\sqrt{(Qx)^TQx}=x$ > $(Qx)^T(Qy)=x^TQ^TQy=x^Ty$

least squres solution for Qx=b:
$\hat{x}=Q^Tb\\
P=QQ^T$

Gram-Schimdt Process:
purpose:找到正交基
example:
for span{a,b,c}
$First,A=a\\
second,B=A-p(A)\\
third,C=B-p(A,B)\\
forth,v_1=\frac{A}{||A||}....$
然后$v_1,v_2,v_3$便是该子空间的正交基（标准正交基）

QR 分解：
$A=QR\\
R=Q^TA\\
proof:A=\begin{bmatrix}& &\\q_1& q_2 &q_3\\& &\end{bmatrix}
\begin{bmatrix} q_1^Ta&q_1^Tb&q_1^Tc\\ & q_2^Tb &q_2^Tc\\
& &q_3^Tc\end{bmatrix}$
这对求最小二乘解非常有用，因为：
$\hat{x}=R^{-1}Q^Tb$

## 第五章

### 5.1 The Properities of Determinant

10 properities:

> 1. $detI=1$
> 2. 矩阵发生一次行变换时 determinat 的符号改变一次
> 3. determinant 是每行的一个 linear function，故对一行进行加减或者乘以某个实数，determinant 也发生了同样的变换
> 4. A 有两行相同时$detA=0$
> 5. A 的一行减去其他行的线性组合时，$detA$不变
> 6. 有一行为 0 时，$detA=0$
> 7. triangular matrix 的 determinant 为对角线元素的乘积
> 8. singular matrix 的 determinamt 为 0，可逆时不为 0
> 9. $detAB=detA\times detB$
> 10. $detA^{T}=detA$

### 5.2 Permutations and Cofactors

求 determnant 的三种方法：
一、主元乘积
二、big formula：
$$\sum (detP)a_{1a}a_{2b}...a_{nw}$$
$proof(2\times2):使用性质3\;det\begin{bmatrix}a&b\\c&d\end{bmatrix}=
det\begin{bmatrix}a&0\\c&d\end{bmatrix}+
det\begin{bmatrix}0&b\\c&d\end{bmatrix}$

三、cofator formula:

$$
detA=a_{i1}C_{i1}+a_{i2}C_{i2}+...+a_{in}C_{in}\\
C_{ij}=(-1)^{i+j}detM_{ij}
$$

### 5.3 Gramer's Rule,Inverses and Volumes

Gramer's Rule:
$求解Ax=b时，当detA\ne 0时\\
x_1=\frac{detB_1}{detA},x_2=\frac{detB_2}{detA}...
x_n=\frac{detB_n}{detA}\\
其中x_n是解x的第n个元素，B_j是将A的第j行替换后形成的矩阵$
$proof:Ax=b\Rightarrow AI_j=B_j\Rightarrow detAx_j(cofactor)=detB_j$

求$A^{-1}$的公式：
$(A^{-1})_{ij}=\frac{C_{ji}}{detA}\;and\; A^{-1}=\frac{C^T}{detA}$
$proof:solve\;A\vec{x_j} =e_j$

三角形面积
假设三点已知
$area=\frac{1}{2}detA\\
A=\begin{bmatrix} x_1&y_1&1\\
x_2&y_2&1\\
x_3&y_3&1\end{bmatrix}$
$proof:通过平行四边形，先从有det2\times 2即一个点在原点开始一步步求证$

Cross Product
$u\times w=det\begin{bmatrix} i&j&k\\
u_1&u_2&u_3\\
v_2&v_2&v_3\end{bmatrix}\\
注意i，j，k是3\times 3\;I相应的列向量$
properties:

> 1. $v\times u=-(u\times v)$
> 2. $u\times w$垂直于$u\;w(proof:u\times (u\times w)=0)$
> 3. $u\times u=0$

triple product:
$(u\times v)*w=det\begin{bmatrix} w_1&w_3 &w_3\\
u_1&u_2&u_3\\
v_2&v_2&v_3\end{bmatrix} =volume(v、u、w)$

## 第六章

### 6.1 Introduction to Eigenvalues

当 Ax=x 方向相同，即 x 满足：
$$Ax=\lambda x$$
此时称 x 为 eigenvector(特征向量),$\lambda$为 eigenvalue（特征值），注意 eigenvalue 可为 0

求 eigenvalue:

$$
det(A-\lambda I)=0\\
proof:(A-\lambda I)x=Ax-\lambda x=0，若x有非零解，(A-\lambda I)是singular\;matrix
$$

求 eigenvector：
$$(A-\lambda I)x=0\; or \; Ax=\lambda I$$

定义对角线元素之和为 trace，则 eigenvalue 满足：
$$\lambda _1+\lambda _2...\lambda_n=trace=a_{11}+a_{22}...a_{nn}$$
determinant 满足：
$$\lambda_1 \lambda_2..\lambda_n=detA$$

注意：
$A^nx=\lambda^nx$
行变换会改变 eigenvalue
eigenvalue 可为虚数
A+B，AB 的$\lambda$一般不为$\lambda_A+\lambda_B\;\lambda_A \lambda_B$
A、B 的所有 eigenvector 完全相同当且仅当$AB=BA$

### 6.2 Diagonalizing a Matrix

Diagonalize Matrix：

$$
X^{-1}AX=\Lambda =\begin{bmatrix} \lambda_1\\
& .\\
& & .\\
& & &\lambda_n\end{bmatrix}\\
X的列所有线性无关的A的eigenvector组成,\Lambda 是eigenvalue\; matrix
$$

若，矩阵$A\;B$满足：
$$A=BCB^{-1}$$
则称$A\;B$ similar，它们有着同样的 eigenvalue

$$
proof:when\;Cx=\lambda x,A=BCB^{-1}\\
Ax=(BCB^{-1})Bx=BCx=B\lambda x=\lambda (Bx)
$$

powers of A
为了解决$A^ku$，将 u 分解为特征向量的线性组合，然后就可得：
$$u_k=A^ku_0=c_1\lambda_1^kx_1+...c_n\lambda _nx_n$$

定义 eigenbalue $\lambda$ 的两个性质 GM（Geometric Multiplicity）AM（Algebraic MUltiplicity）
其中 GM 代表每个$\lambda$拥有的线性无关的 eigenvector 的个数，AM 表示有多少个重复的 eigenvalue
若 AM>GM A 不是 diagonalizable 的
$proof:GM<=AM,当GM<AM,无法找出足够的eigenvector组成X矩阵$

### 6.3

### 6.4 Symmetric Matrices

实数 S 矩阵的 eigenvalue 一定是实数，它的 eigenvector 一定是 orthogonal 的
$real \;number\;proof:Sx=\lambda x\Rightarrow S\bar{x}=\lambda \bar{x}\Rightarrow \bar{x}^TS=\bar{x}^T\bar{\lambda}\\
then\;\bar{x}^TSx=\bar{x}^T\lambda x,\bar{x}^TSx=\bar{x}^T\bar{\lambda}x,\\
then\;x^Tx>0\Rightarrow \lambda=\bar{\lambda}\Rightarrow \lambda\;is\;real$

$orthogonal\;proof:assume\;\lambda_1 \ne \lambda_2,corresponding\;eigenvector \;is\;x,y\\
(\lambda_1x)^Ty=x^T\lambda_1 y=x^TS^Ty=x^TSy=x^T\lambda_2 y\\
so\;x^Ty=0$
不相同时如何证明有点不理解

Diagonalize Symmetric Matrix：
$$S=Q\Lambda Q^T$$
其中 Q 是 othogonal matrix
pivots 和 eigenvalues 的联系：
$$product\;of\;pivots=determinant=product\;of\;eigenvalues$$
Symmetric Matrix 的 pivots 和 eigenvalue 的符号是匹配的
（不太理解)

所有 Symmetric Matrix 都是 diagonalizable(证明不太懂）

### 6.5 Positive Definite Matrices

一个 positive definite matrix S 满足所有 eigenvalue $\lambda >0$

energy-based definition：
S 满足对任意非零 vector x 均有：$x^TSx>0$,那 S positive definite
第二个定义延申：
若 S、T positive definite 则 S+T positive definite
$proof:x^T(S+T)x=x^TSx+x^TTx>0$

判断矩阵 S 是否 positive definite：

> 1 definitions
> 2 all upper left determinant（左上开始构造矩阵：$1\times 1\;2\times 2...$）>0
> 3 piviots>0
> 3 $S=A^TA,A\; column\;independent\\(proof:x^T(A^TA)x=(AX)^T(AX)=||AX||^2)$

构造$S=A^TA$的几种方式：

> 1 $S=LD^TL\Rightarrow A=L\sqrt{D}(chotesky\;factor)$
> 2 $S=Q\Lambda Q\Rightarrow A=Q\sqrt{\Lambda}Q^T$

positive semidefinite:
在上面定义的基础上，允许$\lambda=0$

当$S=Q\Lambda Q^T$ positive definite，那么：
$$x^TSx=1\;代表椭圆$$
可按如下分解得出椭圆方程：

$$
x^TQ\Lambda Q^Tx=1\Rightarrow \begin{bmatrix}
X & Y\end{bmatrix}\Lambda \begin{bmatrix}
X\\Y\end{bmatrix}\Rightarrow \lambda_1X^2+\lambda_2Y^2=1
$$

（不太理解）

## 第七章

### 7.1 Image Processing by Linear Algebra

### 7.2 Bases and Matrices in the SVD

> SVD:$A=U\Sigma V^T=u_1\sigma_1v_1^T+...+u_r\sigma_rv_r$
> 该式是通过$Av_1=\sigma_1u_1$推出
> 写成矩阵形式:
> $A=\begin{bmatrix} v_1...v_r...v_n \end{bmatrix}=\begin{bmatrix}u_1...u_r...u_m\end{bmatrix}\begin{bmatrix} \sigma_1 \\ & .\\ & &.\\& & &. \\& & & &\sigma_r \\ & & & & &0\\ & & & & & & .\end{bmatrix}$

其中$\sigma_i^2$是$A^TA,AA^T$的 eigenvalue,
$v's$是$A^TA$的 eigenvector,$u's$则是$AA^T$的 eigenvector
proof:$A^TA=(U\Sigma V^T)^TU\Sigma V^T=V\Sigma ^T \Sigma V^T$
注意$u_i$可通过$u_i=\frac{Av_i}{\sigma_i}$求取

相比于 eigenvalue，singular value 较稳定，改变一个 0 行或者在 0 行加一个很小的数字不会使它发生大的改变
