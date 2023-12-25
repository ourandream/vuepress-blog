---
title: yaml
categories: language
date: 2022/05/24 23:20:44
updated: 2022/05/25 00:41:40
---
yaml是一种可读性高的数据组织语言,通常用于设置文件。本文基于[YAML Tutorial in Cloudbees Blog](https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started).
<!--more-->

# 基本概念

yaml以`---`作为数据(document)的开始,以`...`作为数据的结尾.

yaml多层嵌套可用多个相同的空格数表示(通常为2个或4个,不可以使用tab).

例子:

```yaml
---
doe: "a deer, a female deer"
ray: "a drop of golden sun"
pi: 3.14159
xmas: true
french-hens: 3
calling-birds:
  - huey
  - dewey
  - louie
  - fred
xmas-fifth-day:
calling-birds: four
french-hens: 3
golden-rings: 5
partridges:
count: 1
location: "a pear tree"
turtle-doves: two
```

注意key,value直接有一个空格.

yaml以`#`表示注释:

```yaml
# This is a full line comment
foo: bar # this is a comment, too
```

# 基础数据类型

整数(十进制,十六进制,八进制):

```yaml
---
foo: 12345
bar: 0x12d4
plop: 023332
```

浮点数:

```yaml
---
foo: 1230.15
bar:  12.3015e+05
```

特殊数字:

```yaml
---
foo: .inf
bar: -.Inf
plop: .NAN
```

字符串(可以加单引号或双引号,也可以不加,但因为可能和数字类型混淆,通常加上):

```yaml
---
foo: this is a normal string
foo: "this is not a normal string"
```

注意如果使用了转义字符,一定要加双引号,不然转义字符会被识别为两个字符:

```yaml
---
foo: "this is not a normal string\n"
```

多行字符.

不保留换行:

```yaml
bar: >
  this is not a normal string it
  spans more than
  one line
  see?
```

保留换行:

```yaml
bar: |
  this is not a normal string it
  spans more than
  one line
  see?
```

空值:

```yaml
---
foo: ~
bar: null
```

布尔值:

```yaml
---
foo: True
bar: False
light: On
TV: Off
WHY1: YES
WHY2: NO
```

# 数组和字典

单行:

```yaml
---
items: [ 1, 2, 3, 4, 5 ]
names: [ "one", "two", "three", "four" ]
```

多行:

```yaml
---
items:
  - 1
  - 2
  - 3
  - 4
  - 5
names:
  - "one"
  - "two"
  - "three"
  - "four"
```

数组内值的类型不需要相同.

yaml一个文件处理出来的本身就是一个字典:

```yaml
---
foo:
  bar:
    - bar
    - rab
    - plop
```



除此之外还能单行:

```yaml
---
foo: { thing1: huey, thing2: louie, thing3: dewey }
```

# 更多设置

保留结尾空格:

```yaml
bar: >+
  this is not a normal string it
  spans more than
  one line
  see?
```

不保留:

```yaml
bar: |-
  this is not a normal string it
  spans more than
  one line
  see?
```

正如上面所说,yaml中以`---`开头,以`...`结尾.`...`一般是可选的,不过当文件中有多个数据时,它是必须的:

```yaml
---
bar: foo
foo: bar
...
---
one: two
three: four
```













