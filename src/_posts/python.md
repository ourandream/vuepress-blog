---
title: python
tags: code
categories: languages
mathjax: true
abbrlink: a4d4b8b8
date: 2021/12/23 18:23:20
updated: 2022/04/05 15:04:21
---
python相关内容的笔记。
<!--more-->
# base
## 注释:
```python
#这是单行
'''
这是
多行
注释
'''
"""
这也是多行注释
"""
```
## 杂七杂八
python支持转义字符,如\n,若想让某个字符中转移字符等失效,在字符串前加r或R
```python
r'\\n'
```

python中不需要声明变量,直接使用即可,变量名的首个字符需要是_或字母,其余部分可以是_或字母或数字



在python中,一切皆对象,如字符串就是一种对象

在python中,执行程序时是一句一句执行的,一个物理行(自己看见的)对应一个逻辑行(python看见的),若想让一个语句有多行或一行有多个语句,可以按如下语法书写:
```python
i=\
5

i=3;i=5
```
在python中,缩进用于指定语句块,拥有同样缩进的语句属于一个语句块
一次缩进大概四格(推荐使用tab键)

range:
```python
print(list(range(1,5)))#结果为[1, 2, 3, 4]
print(list(range(1,5,2)))#2为步长,结果为[1, 3]
```

len:
```python
print(len('1234'))#输出字符串长度
```
int不可使用len,list、tuple、set则可以

eval函数把字符串当成一个python语句并执行,常用于将输入的字符串转化为数字或元组

python变量名加上前缀dummy_,如dummy_i,则该变量不会被检查,此操作可解决警告说变量未被使用

numpy.loadtxt()用于读取每行两个数字的txt文件
用分号间隔一行中的多个的python语句
str.lower()使得str的切片从左闭右开变成两边都闭,且大写字母变小写字母
round(number[, ndigits])取近似,如-0.5取0,0.5取0,规则是四舍五入,后面的ndigits表示精确到几个小数位,默认是0，负数代表在整数部分四舍五入，如123若位数为-2则会变成100

sum中若有tuple或list或set，会把里面的元素相加再与外面的元素相加，注意set的互异性会导致相同的元素消失

int转化浮点数向下取整，int转化还可指定要转化的数的base，如`int('101',2)`转化为5

id函数用于查看对象内存地址

python 中`2<3>1` 相当于`2<3 and 3>1` 



lambda 匿名函数

```python
<函数名> = lambda <参数列表>: <表达式>
```

这样函数名可以使用函数结果,也可视为一个函数名,即也可以f(参数)



map(f,list),将f依次作用于list,并返回list



若想去掉运行时的黑窗口，将后缀改为`pyw`而不是`py`



获取年月日

```python
from datetime import datetime
print(datetime.now().year)
print(datetime.now().month)
print(datetime.now().day)
```

获取月天数

```python
import calendar
import datetime
now = datetime.datetime.now()
print calendar.monthrange(now.year, now.month)[1]

```

日期格式化输出:

```python
time=datetime.datetime()
t.strftime("%Y/%m/%d %H:%M:%S")
```





求定积分

```python
from scipy import integrate

integrate.quad(f,-math.inf,i,args=(m,s))[0]
```

极大数：`float('inf')`

# 数据结构
python有四种基本的数据结构,即list 	tuple dictionary and set
python的数字类型有int float complex，complex即复数，写成1+4j的形式，注意j也可大写

## 序列

上述两种结构都是序列的一种,序列可进行索引操作，和c++中的数组索引类似，不同的操作如下
切片:

```python
print('Item -1 is', shoplist[-1])
#指向序列的最后一个,若是2则是倒数第二个
print('Item 1 to 3 is', shoplist[1:3])
# 第二和第三个,左闭右开
print('Item 2 to end is', shoplist[2:])
#从第三开始到最后
print('Item 1 to -1 is', shoplist[1:-1])
#第二个到倒数第二个
print('Item start to end is', shoplist[:])
#全部

#你也可以在切片时提供第三个参数 _步长_，默认的步长为 1。
shoplist[::2]
#步长2,等到0,2..等元素
shoplist[::-1]
#步长-1,得到倒数第一个,倒数第二个..等元素
```

其他操作：

| 操作                                                         | 功能                                 |
| ------------------------------------------------------------ | ------------------------------------ |
| x in s \| x not in s                                         | 判断是否在s中                        |
| a.index(x)<br />后可加参数,指定[a,b)<br />也可只加一个,指定a到末尾 | x在a中的第一次出现的下标，没有则报错 |
| a.count(x)                                                   | x在a中出现的次数                     |
| s+t                                                          | 连接s、t                             |
| s*n(或者倒过来)                                              | s复制n词                             |
| *s                                                           | 将序列分解为一个个元素               |

## list
即一类相同的对象组成的有序序列
```python
shoplist = ['apple', 'mango', 'carrot', 'banana']#创建list
shoplist.append('rice')#在list的末尾添加元素
shoplist.extend(anotherList)#添加另一个list的内容
shoplist.sort()#排序
del shoplist[0]#索引list中的元素和删除元素,注意删除后索引会重新排序

< <= == != >= >#对单个数据逐个比较,若一个list数目较少则只比较前面部分

s.clear()#删除所有元素
s.copy()#复制所有元素形成一个新列表
newMinRoadsPath=deepcopy(minRoadsPath)#复制元素形成新列表，列表里的列表也会复制
s.pop(i)#取出第i项并删除
s.remove(i)#取出第一个x并删除,注意不可删除None
s.reverse()#原list元素反转
for i in list#遍历list的元素
for i,j in enumerate(list)#遍历所有元素极其坐标
tList.count(val) #元素在list中的出现此时,可用于检查是否存在该元素

[2**i ,前面的变量也可是(a,b)for i in range(64)]#列表推导式,for可多层嵌套,前面的变量也可是(a,b)
```

删除重复元素并保持原顺序：

```python
t=i
i=list(set(i))
i.sort(key=t.index)
```

注意遍历list不能修改list的值，必须通过具体的索引修改：

```python
 for i in range(len(data)):
        for j in range(len(data[0])):
            ..
```



## tuple

多类不同的对象组成的序列,可索引,但不可进行排序 修改等操作
使用：

```python
zoo = ('python', 'elephant', 'penguin')
new_zoo = 'monkey', 'camel', zoo#不推荐这种写法
```
使用元组：
```python
print('All animals in new zoo are', new_zoo)#输出整个tuple
print('Animals brought from old zoo are', new_zoo[2])
#输出tuple的第三个元素
print('Last animal brought from old zoo is', new_zoo[2][2])
#输出tuple第三个元素中的第三个元素
```
注意:
```python
myempty = ()#声明一个空tuple很简单
singleton = (2 , )#声明一个元素的tuple必须按这种写法
```

## dictionary
dictionary即key与value相对应形成的数据结构,有点像地址簿的姓名对应地址
使用:
```python
ab = {
    'Swaroop': 'swaroop@swaroopch.com',
    'Larry': 'larry@wall.org',
    'Matsumoto': 'matz@ruby-lang.org',
    'Spammer': 'spammer@hotmail.com'
}
ab={}#创建空字典
ab=dict(zip(keys,values))#通过序列创建
ab = dict.fromkeys(list)#只有key没有value

ab['Guido'] = 'guido@python.org'#添加key value对
print("Swaroop's address is", ab['Swaroop'])#使用,注意[]里只能用key

for name, address in ab.items(): 
	print('Contact {} at {}'.format(name, address))
#使用ab中的每个元素

[key : value for...]#字典推导式
min(d,key=d.get)#求最小值的key 
```
注意key需要是不可变对象,value则可以是可变对象,当然也可以是不可变对象

操作

| 操作                          | 功能                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| a.keys(),a.values(),a.items() | 返回key,value,或key和value对                                 |
| a.get(key,a),a.pop(key,a)     | 若有相应的key则返回value,没有则返回a<br />其中pop返回后会删除 |
| d.popitem()                   | 随机取出键值对以元组形式返回                                 |
| d.clear(),del d[key]          | 删除整个或者某个                                             |
| key in d,not in               | 判断key在不在dict中                                          |

注意`a.pop(key)`也会进行删除同时返回对应的value,两种删除方式在key不存在时都会报错
## set
集合和数学中的集合类似,是无序简单对象的collection
集合有互异性，即元素互异，每个元素都不一样
set的元素不能是list,但可以是tuple
```python
ab = set(['apple','pen'])
a = {1,3,2} #creat set

if 'pen' in ab:
	print('true')
if 3 not in ab:
	print('true')
#定义与检查是否在集合中

abc = ab.copy()
#复制集合
abc.add('rabbit')
a.clear()#清除集合中的元素
#添加集合元素
ab.remove('pen')#x在移除,x不再报错
ab.discard(x)#x在移除,x不在不报错
ab.pop()#随机返回并清除s中的一个元素,为空则会异常
#去除集合元素
if abc.issuperset(ab):
#检查是否为另一集合的大集,相同时仍算大集
	print(ab & abc)
	#输出集合的交集
s.issubset(t)#是否为另一集合的子集
s.isdisjoint(a)#没有相同元素则返回True

c = a-ab#输出第一个集合减去第二个集合中的元素后形成的集合
c = a | ab#将集合结合起来
a&b#交集
a^b#补集,即除了交集外a,b的所有元素
```

## reference
当创建对象并利用其赋值给另一个对象时,实际两个标识符指向同一个对象:
```python
mylist = shoplist#指向同一个
mylist = shoplist[:]#通过全切片产生副本,指向对象不同
```

## 字符串
用单引号或双引号或三引号指定字符串
```python
'strings'
"strings"
```
注意在单引号中直接可以双引号，双引号中可用单引号，三引号前两个都可以用

想使用一些特殊符号记得转义，如 \\\\

注意在python中字符串不可改变

更多字符串操作:
```python
# 这是一个字符串对象
name = 'Swaroop'

if name.startswith('Swa'):
    print('Yes, the string starts with "Swa"')
#检查是否已某个字符串开始
if 'a' in name:
    print('Yes, it contains the string "a"')
#检查某个字符串是否在其中
if name.find('war') != -1:
    print('Yes, it contains the string "war"')
#同上,但会返回字符串的位置,为-1则表明找不到
delimiter = '_*_'
mylist = ['Brazil', 'Russia', 'India', 'China']
print(delimiter.join(mylist))
#用指定字符串填充源字符,结果:Brazil_*_Russia_*_India_*_China
ord('a') #字符转unicode数
c(45) #Unicode数转字符
a = 'abc def'
c = a.split(' ') #以空格为标识把字符串分割成多部分
''.join(list)#无间隔连接list为字符串
```
# input output

output一般用print,语法如下:
```python
print('strings')
```
若要使用变量输出,可用如下语法:
```python
age=10
stringT='hhh'
print('{1},your age is {0}'.format(age,stringT))
print('your age is {},{}'.format(age,stringT))
'''
注意{}中的数字是可选的,用来指定输出第几个变量
.format本质是调用str类的method
'''
print(message * times)
#该语句可实现变量的多次输出,注意message也可以是字符串常量
print(item, end=' ')#end指定输出的末尾,若不指定则默认为\n
```

format可进行一定调节设定进行输出:
```python
age=10
print('{0:.3f}'.format(age))#指定小数位为3位，注意0代表在format中的位置

# 填充下划线 (_) ，文本居中
# 将 '___hello___' 的宽度扩充为 11 
print('{0:_^11}'.format('hello'))
# 用基于关键字的方法打印显示 'Swaroop wrote A Byte of Pytho
print('{name} wrote {book}'.format(name='Swaroop', book='Python'))
```

# 运算符
+-*,== >=,>> <<,&等运算符与c++中的基本相同
需要注意的运算符如下:

|运算符|功能|
|---|---|
|**|乘方|
|/|除,但不是整除|
|//|整除|
|or and not|布尔与或非，用于判断逻辑关系，它们的顺序即运算符顺序|

# 控制流
if-else 语句：
```python
t = 3

if t == 3:
	print('It\'s 3')
elif t == 2:
	print('It\'s 2')
else:
	print('It\'s nothing')
```

while语句:
```python
i = 3
while True:
	i*=2
	print(i)
		if(i>100):
			break
else:
	print(i*3)#注意若遇到break语句则else中的内容不会执行
```

for 语句:
```python
for i in range(1,5):#输出的i从1到4,循环执行四次
	if i == 3:
		continue#与c++中的相同
	print(i)
else:
	print('5')#不满足for的条件时执行,若遇break则不执行
```
注意range可换为字符串，则执行的次数为字符串的长度，i为字符
range前面的1不写则是从0开始到4
# 函数
函数定义例子:
```python
def print_max(a, b):#也可无参数
    if a > b:
        print(a, 'is maximum')
    elif a == b:
        print(a, 'is equal to', b)
    else:
        print(b, 'is maximum')
```

python中函数可以使用全局变量,但不能直接修改

在函数内定义的变量是局部变量,不会影响其他地方的同标识符的变量的值,若想让该变量成为全局变量,或想修改全局变量,使用global:

```python
def func(): 
	global x
```

函数括号中的形参可有默认值:
```python
def say(message, times=1): 
	print(message * times)
#注意只有参数列表末尾的变量可有默认值,不可前面变量有默认值后面却没有
```

调用函数输入参数时可指定参数输入:
```python
def func(a, b=5, c=10):
    print('a is', a, 'and b is', b, 'and c is', c)

func(3, 7)
func(25, c=24)
func(c=50, a=100)
```

参数可为元组或字典,这样一个形参可介绍多个参数:
```python
def total(a=5, *numbers, **phonebook): 
	print('a', a)
#numbers接受元组,phonebook接受字典
```

return可和c++中一样使用,不过不用声明返回值类型

DocStrings
```python
def print_max(x, y):
    '''Prints the maximum of two numbers.

    The two values must be integers.'''
...
```
DocStrings 的书写惯例是：首行首字母大写，结尾有句号；第二行为空行；第三行以后为详细的描述。
可以通过\__doc__属性访问描述:
```python
print(print_max.__doc__)	
```

## 闭包

闭包是介于全局变量和局部变量的一种变量

```python
def outer( a ):
    b = 10
    # inner是内函数
    def inner():
        #在内函数中 用到了外函数的临时变量
        print(a+b)
    # 外函数的返回值是内函数的引用
    return inner
#其中a就是闭包
#若想修改 需声明nonlocal b
```



## decorator

装饰器可视为不添加代码而为函数增加功能

如：

```python
def log(func):
    def wrapper(a,b):
        print("call test(%d，%d)" %(a,b))
        return func(a,b)
    return wrapper

@log
def test(a,b):
    print("sum = %d" % (a+b))
#相当于test=log(test)
```

decorator可带参数:

```python
def log(level):
    def decorator(func):
        def wrapper(*args, **kwargs):
            if level == "warn":
                print("%s waring" % func.__name__)
            elif level == "info":
                print("%s infomation get" % func.__name__)
            return func(*args, **kwargs)
        return wrapper
    return decorator


@log(level="warn")
def test():
    print("this is what I want")
```

decorator可以为类

```python
class DecorateDemo(object):
    #init接受函数参数
    def  __init__(self, func):
        self.__func = func
    #call返回函数
    def  __call__(self):
        print("before class decorator")
        self.__func()
        print("after class decorator")
        return self.__func

@DecorateDemo
def test():
    print("this is what I want")
```

# 类与对象

定义

```python
class Car:
    price = 100000 #定义类属性
    #特殊的类初始化函数
    def __init__(self, c):
        self.color = c #定义对象属性
        self.__private=3#私有成员,仅可类内访问  
        self._protect=4#保护成员,不可被from .. import*引入
        self.__value=c
    #析构函数
    def __del__(self,*args):
        ...
```

方法

```python
class Root:
    __total = 0
    def __init__(self, v): #构造方法
        self.__value = v
        Root.__total += 1
    def show(self): #普通实例方法
        print('self.__value:', self.__value)
        print('Root.__total:', Root.__total)
    @classmethod #修饰器，声明类方法
    def classShowTotal(cls): #类方法,仅可访问类属性，可通过类名调用
        print(cls.__total)
    @staticmethod #修饰器，声明静态方法
    def staticShowTotal(): #静态方法，类似类方法
        print(Root.__total)
```



属性

```python
class Test:
	def __init__(self, value):
		self.__value = value
    @property
    def value(self): #只读，无法修改和删除,即只能obj.value
        return self.__value
    
    
class Test:
    def __init__(self, value):
        self.__value = value
    def __get(self):
        return self.__value
    def __set(self, v):
        self.__value = v
    value = property(__get, __set)#可读可写
    
class Test:
    def __init__(self, value):
        self.__value = value
    def __get(self):
        return self.__value
    def __set(self, v):
        self.__value = v
    def __del(self):
        del self.__value
    value = property(__get, __set,__del)#可读可写可删除
```



使用

```python
car1 = Car("Red") #实例化对象
car2 = Car("Blue")
print(car1.color, Car.price) #查看对象属性和类属性的值
Car.price = 110000 #修改类属性
Car.name = 'QQ' #动态增加类属性
car1.color = "Yellow" #修改对象属性

import types
def setSpeed(self, s):
self.speed = s
car1.setSpeed = types.MethodType(setSpeed, car1) #动态增加成员方法
car1.setSpeed(50) #调用成员方法
print(car1.speed
```

继承

```python
#可多重继承
class newCa(Car):
    def __init__(self,c):
        Car.__init__(c)
```



# 文件

简单读写文件

```python
#读
textFile = open("test.txt","rt") #t表示文本文件方式
print(textFile.readline())
textFile.close()
binFile = open("test.txt","rb") #b表示二进制文件方式
print(binFile.readline())#读一行,可指定读一行中的前几个字符
binFile.readlines()#读所有行,可指定读多少行
binFile.read()#读整个文件作为字节流,可指定读几个字符
binFile.close()

#写
fo = open(fname, "w")
ls = ["唐诗", "宋词", "元曲"]
fo.writelines(ls)
fo.write(s)#写入字节流
fo.seek(n)#改变指针位置,0开头,1当前,2结尾
fo.close()

#还有"a"读入文件作为追加模式,在文件尾部写入数据
```

可通过上下文管理器简化代码

```python
with open('test.txt','r') as src, open('test_new.txt','w') as ds:
    ds.writelines(src.readlines())
```

csv文件读写

```python
import csv

#读
with open('test.csv','r') as f:
    global data
    data=csv.reader(f)
    t=list(data)
print(t)

#写
data=[[1,2],['a','b']]

with open('test.csv','w',newline='') as f:
    #newline可避免生成的csv文件中有空行
    writer = csv.writer(f)
    writer.writerows(data)
```

json文件

```python
import json

data=[{1:'a'},{2:'b'}]

#对python对象
t=json.dumps(data)#转化为json数据流
json.loads(t)#转化为py对象

#文件
with open('test.json','w') as f:
    json.dump(data,f,indent=4,ensure_ascii=False)
    #确保内容正常换行还有中文正确输出
with open('test.json','r') as f:
    t=json.load(f)#l
```

遍历文件夹内文件及其子文件夹内文件：

```python
file_list=[]
for root, dir, filename in os.walk('.'):
    for file in filename:
        file_list.append(os.path.join(root, file))
```

如果只想遍历一层目录下的文件,简单的使用`os.listdir`.

获取文件上次修改时间用`os.path.getmtime`,返回是timestamp.用`os.path.getctime`获取创建时间(在有些系统,如unix下仍是返回修改时间).

# 模块

在python中，若想实现多文件协作，可使用module（模块），模块可用python写，也可以用c写
导入模块：
```python
import sys#不用.py
from math import sqrt#导入模块的一部分,一般不推荐使用避免命名冲突
from math import*#导入模块所有部分，不过使用时不需要指定模块名
sys.argv#使用模块中的函数或变量
```
导入模块是一个开销比较大的事情,可通过创建字节码文件(.pyc),然后导入字节码文件得到一样的效果,并提高效率

模块拥有\_\_name\_\_属性,若该属性值为  \_\_main\_\_,则说明模块是直接在执行而不是被调用

若写自己的模块,有一个属性为\_\_version\_\_,用于指定版本号

dir()函数返回对象里定义的一系列标识符,若对象是模块则返回变量,函数和类的标识符

程序包就是一个装满模块的文件夹，它有一个特殊的 `__init__.py` 文件，这个文件告诉 Python 这个文件夹是特别的，因为它装着 Python 的模块。

# pip
命令行换源
```python
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

解决突然显示没有pip这个module

```python
 python -m ensurepip
```

安装时显示拒绝访问

```python
...--user#加上后缀
```

```bash
WARNING: Ignoring invalid distribution -ip (d:\noval\program\python\lib\site-packages)
```

原因是安装异常,删掉对应文件夹~开头的文件夹即可

# 库 

## random

产生随机数的库

| 函数             | 功能                                                         |
| ---------------- | ------------------------------------------------------------ |
| seed(a=None)     | 初始化随机数种子,默认为系统时间,种子相同<br />产生随机数序列相同 |
| random()         | 产生[0,1)间的随机小数                                        |
| randint(a,b)     | 产生[a,b]之间的整数                                          |
| getrandbits(k)   | 产生k比特长度的随机整数                                      |
| randrange(a,b,c) | 产生[a,b)之间以c为步数产生的序列中的随机整数                 |
| uniform(a,b)     | 产生[a,b]之间的随机小数                                      |
| choice(seq)      | 从序列类型随机返回一个元素                                   |
| shuffle(seq)     | 随机打乱序列并返回                                           |
| sample(a,k)      | 从a中随机选k个元素并返回成列表                               |

# 系统操作

检查文件存在

```python
os.path.exists('filename_or_path_and_f')
```

复制文件

```python
shutil.copy('收支表 .xlsx','2021/'+f_name)
```

# 打包成exe

安装pyinstaller
安装pipenv
在某个文件夹创建虚拟环境

```cmd
pipenv shell
```
使用pip安装必须的依赖
然后在py文件根目录下执行：

```cmd
pyinstaller -F accountbook.pyw -i t.ico
```
去掉-F则会生成exe文件和多个依赖

# json
json.dumps将对象转化为json字符串