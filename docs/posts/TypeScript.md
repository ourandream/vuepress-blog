---
title: TypeScript
category: front-end
abbrlink: d044eab7
date: 2022/02/22 18:11:50
updated: 2022/04/05 15:08:53
---
在大型js应用中,Debug因为js灵活的type变得非常困难.`TypeScript`相对于在js的基础上添加了类型检查系统,为大型应用的构建提供了便利,同时也为可以增强编辑器的代码补全功能.
本文是对ts官网handbook的内容的总结.
<!--more-->
# Everyday Types
js中的常用的primitives(`String`,`Number`,`Boolean`)在ts对应的是`string`, `number`, and `boolean`.大写开头的类型名也合法,但为了于一些内置的type兼容,最好使用小写开头.
对应较少使用的primitives(`BigInt`,`Symbol`)对应的是`bigint`和`symbol`.
某种类型的数字的写法有`string[]`或`Array<number>`
js中的any对应的是`any`,默认可以出现any,不过如果我们设置了更严格的检查,我们需要注释`any`类型.
变量类型注释(type annotation):
```ts
let myName: string = "Alice";
```
通常不需要注释,ts会自动推断出变量的类型.
函数参数注释:
```ts
function greet(name: string) {
	console.log("Hello, " + name.toUpperCase() + "!!");
}
```
返回值注释:
```ts
function getFavoriteNumber(): number {

	return 26;

}
```
通常返回值不需要注释,ts会自动推断出来.
在有些场合(如Anonymous Functions),ts也可以把参数类型推断出来.
对象的类型(可以用;分隔也可以用,):
```ts
function printCoord(pt: { x: number; y: number }) {
	...
}
```
如果某个property没有注释,则它会是any,若设置了严格检查,可能会报错.
设置property可选(`?`):
```ts
function printName(obj: { first: string; last?: string }) {

	// Error - might crash if 'obj.last' wasn't provided!
	
	console.log(obj.last.toUpperCase());
	
	Object is possibly 'undefined'.Object is possibly 'undefined'.
	
	if (obj.last !== undefined) {
	
	// OK
	
	console.log(obj.last.toUpperCase());

}

// A safe alternative using modern JavaScript syntax:

console.log(obj.last?.toUpperCase());

}
```
我们可以使用`Union Types`组合一系列type:
```ts
function printId(id: number | string) {

	console.log("Your ID is: " + id);

}
// OK

printId(101);

// OK

printId("202");

// Error

printId({ myID: 22342 });
```
此时它仅可使用这些type共有的操作:
```ts
function printId(id: number | string) {
//error
	console.log(id.toUpperCase());

}
```
可以用在if分支中检查类型解决:
```ts
function printId(id: number | string) {

	if (typeof id === "string") {
	
	// In this branch, id is of type 'string'
	//sometimes use Array.isArray to check
	
		console.log(id.toUpperCase());
	
	} else {
	
	// Here, id is of type 'number'
	
	console.log(id);

}

}
```
注意在else中不需要检查,ts已经自动推断出type.
我们可以为`type`取别名:
```ts
type Point = {

	x: number;
	
	y: number;

};
```
注意仅仅是取别名,而不是弄了一个不同的版本.它在ts的表现和原来的type一样.
`type`可以为union,object type或者primitives区别名,对应object type,也可以使用`interface`:
```ts
interface Point {

	x: number;
	
	y: number;

	method1():string;

}
```
它与`type`的不同点:
-   在TypeScript version 4.2之前, type alias names可能出现在error messages. Interfaces总是会error messages.
-   interface可以添加内容,而type alias不可以.
-   只能重命名object type.
-   Interface仅在使用它的命名时会出现的error message,即如果使用形式为`{ name: string }`的形式,即使已经使用interface命名它了,ts的error message也并不会出现该名字.
我们可以进行`type assertion`来指定一个更具体的type:
```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```
注意ts只允许指定一个更具体的type,故由string指定为number是错误的.
我们可以使用string或number来生成定义type,称为`literal type`:
```ts
let x: "hello" = "hello";

// OK

x = "hello";

// error

x = "howdy";
```
和union联合起来使用:
```ts
function printText(s: string, alignment: "left" | "right" | "center") {

// ...

}
```
可以结合其他的type:
```ts
function configure(x: Options | "auto") {

// ...

}
```
注意`boolean`是`true | false`的别名.
在ts中使用`literal type`有时会遇到如下情况:
```ts
const req = { url: "https://example.com", method: "GET" };
//error
handleRequest(req.url, req.method);//第二个参数为 "GET"|"POST"
```
可以通过`type assertion`解决:
```ts
// Change 1:

const req = { url: "https://example.com", method: "GET" as "GET" };

// Change 2

handleRequest(req.url, req.method as "GET");
```
也可以通过`as const`解决:
```ts
const req = { url: "https://example.com", method: "GET" } as const;

handleRequest(req.url, req.method);
```
`as const`使得所有properties都使用`literal type`.
对应null和undefined,我们可以使用`!`说明不会是它们之一:
```ts
function liveDangerously(x?: number | null) {

// No error

console.log(x!.toFixed());

}
```
注意这不好改变编译出来的js代码,故还是需要做相关的对应null和undefined的处理.
`enum`是在js中不存在,但ts添加的功能.只在必要时使用.
# narrowing
ts分析代码并更精确地确定type的功能较`narrowing`.它借助一些特殊结构的称为type guard的代码确定type.
首先是js自带的`typeof`,这自然能用来确定type.ts同时还会注意js中的一些坑,如typeof null是object.
然后是truthiness,即if等条件状态语句自动将非boolean变量转化为条件的功能.
然后是等式和不等式.ts还会注意`!=`等运算符的坑(如null\==undefined).
然后是检查property是否在内的in运算符.
然后是检查是否为某个构造函数的instance的instanceof.
然后是assignment.注意ts总是会利用初始化时的type来进行检查.
然后在control flow中ts会自动检查上面的代码对下方的type的影响.
我们还可以自己设置函数来检查type以便于`narrowing`:
```ts
function isFish(pet: Fish | Bird): pet is Fish {

	return (pet as Fish).swim !== undefined;

}
```
其中的`pet is Fish`被称为`type predicate`.
当每一个type均包含一个相同的是literal type的property时,union被称为`discriminated union`,ts会自动利用该property进行`narrowing`:
```ts
interface Circle {
	
	kind: "circle";
	
	radius: number;

}
interface Square {

	kind: "square";
	
	sideLength: number;

}
type Shape = Circle | Square;

function getArea(shape: Shape) {

	if (shape.kind === "circle") {
	
		return Math.PI * shape.radius ** 2;//shape:Circle
	
	
	}

}
```
ts还设置了`never`,用于说明在这种情况下该变量不可能是任何类型:
```ts
type Shape = Circle | Square;

function getArea(shape: Shape) {

	switch (shape.kind) {
	
	case "circle":
	
		return Math.PI * shape.radius ** 2;
	
	case "square":
	
		return shape.sideLength ** 2;
	
	default:
	
		const _exhaustiveCheck: never = shape;
	
		return _exhaustiveCheck;

}

}
```
# More on Functions
表示函数的type:
```ts
function greeter(fn: (a: string) => void) {

	fn("Hello, World");

}
```
注意若进行类型注释,参数名是必须的.
在object type中的函数使用 `call signature`:
```ts
type DescribableFunction = {

	description: string;
	
	(someArg: number): boolean;

};
```
对于constructor,使用`construct signature`:
```ts
type SomeConstructor = {

	new (s: string): SomeObject;

};
```
对于有些即可作为constructor,也可以不作为:
```ts
interface CallOrConstruct {

	new (s: string): Date;
	
	(n?: number): number;

}
```
在ts中,`generics`用与表示多个值的type的对应关系:
```ts
function firstElement<Type>(arr: Type[]): Type | undefined {

	return arr[0];

}
```
其中的`Type`称为`Type parameter`,它的命名是任意的.可以有多个:
```ts
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] 
{

	return arr.map(func);

}
```
我们可以对`type parameter`添加限制条件:
```ts
function longest<Type extends { length: number }>(a: Type, b: Type) {

	if (a.length >= b.length) {
	
		return a;
	
	} else {
	
		return b;

	}

}

// longerArray is of type 'number[]'

const longerArray = longest([1, 2], [1, 2, 3]);

// longerString is of type 'alice' | 'bob'

const longerString = longest("alice", "bob");

// Error! Numbers don't have a 'length' property

const notOK = longest(10, 100);
```
使用时可以指定`type parameter`的值:
```ts
const arr = combine<string | number>([1, 2, 3], ["hello"]);
```
写出好的`type parameter`因遵循如下条件:
1. 使用type parameter时尽量不适应限制条件.
2. 使用尽可能少的type parameter.
3. 如果type parameter在函数中只出现了一次,重新思考是否需要它.
我们使用`?`表示函数某个参数可选:
```ts
function f(x?: number) {

// ...

}

f(); // OK

f(10); // OK
```
当然我们也可以使用参数带默认值实现.
对于callback,最好不要使用可选参数,除非需要一个不使用该参数的函数.
我们可以使用`overload signatures`来定义可以用多种方式调用的函数,它由一系列`function signature`加上函数的主体组成:
```ts
function makeDate(timestamp: number): Date;

function makeDate(m: number, d: number, y: number): Date;

function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {

if (d !== undefined && y !== undefined) {

		return new Date(y, mOrTimestamp, d);
	
	} else {
	
		return new Date(mOrTimestamp);

}

}

const d1 = makeDate(12345678);

const d2 = makeDate(5, 5, 5);

const d3 = makeDate(1, 3);//error
```
注意`function signature`需要至少有两个.
为写好overload,如果可以用union参数代替,使用union参数.
我们可以指定this的type(利用在js中this不能作为参数名的机制):
```ts
interface DB {

	filterUsers(filter: (this: User) => boolean): User[];

}
```
此时如果我们使用arrow function就会报错,因为arrow function的this是globalThis.
我们使用`void`表示函数不返回值,注意它与`undefined`不同.
此时函数仍可返回值,不过将函数返回值赋给变量时,它们的type仍会是`void`.这个特性的利用例子:
```ts

const src = [1, 2, 3];

const dst = [0];

src.forEach((el) => dst.push(el));//需要一个返回void的函数但push返回数字.

```
我们使用`object`表示除primitives外的type,注意它和js中的`Object`不同.
我们使用`unknown`表示任何类型,不过与any不同的是它不需要进行任何操作.
我们使用`never`表示在函数中不能返回值,即中止程序或抛出异常.
我们使用`Function`表示没有具体type的函数.应避免使用它.
指定`rest parameter`的type必须是array type:
```ts
function multiply(n: number, ...m: number[]) {

	return m.map((x) => n * x);

}
```
我们可以使用`rest argument`来展开数组作为参数:
```ts
const arr1 = [1, 2, 3];

const arr2 = [4, 5, 6];

arr1.push(...arr2);
```
但注意ts不认为数组不可修改,故有时会遇到问题:
```ts
const args = [8, 5];

const angle = Math.atan2(...args);//parameter:x:number,y:number
```
解决方法:
```ts
// Inferred as 2-length tuple

const args = [8, 5] as const;

// OK

const angle = Math.atan2(...args);
```
在低版本的运行环境使用`rest argument`可能需要打开 `downlevelIteration`.
我们可以在`parameter destructuring`指定type:
```ts
function sum({ a, b, c }: { a: number; b: number; c: number }) {

	console.log(a + b + c);

}
```
# Object Types
在ts中,object的类型(object types)可以是匿名的:
```ts
function greet(person: { name: string; age: number }) {
	return "Hello " + person.name;
}
```
也可以通过`interface`或`type alias`命名:
```ts
interface Person {

	name: string;
	
	age: number;

}
```
对于object types中的properties,我们可以进行三种操作:
1. 标明type
2. 表示某个property可选
3. 表示某个property只读
标明type上面已有例子,标明可选:
```ts
interface PaintOptions {

	shape: Shape;
	
	xPos?: number;
	
	yPos?: number;

}
```
可使用destruction语法给可选property设置默认值:
```ts
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {

	...

}
```
注意在destruction不可使用type annotation,因为在js的destruction语法中注释的语法已有其他的含义.
标明只读:
```ts
interface SomeType {

	readonly prop: string;

}
```
注意只读的只有prop本身,它内部的property等仍可读写.
ts并不会因为`readonly`影响type的判断,故以下语句是合法的:
```ts
interface Person {

	name: string;
	
	age: number;

}

interface ReadonlyPerson {

	readonly name: string;
	
	readonly age: number;

}

let writablePerson: Person = {

	name: "Person McPersonface",
	
	age: 42,

};

// works

let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age); // prints '42'

writablePerson.age++;

console.log(readonlyPerson.age); // prints '43'
```
当object本身仅部分确定时,我们可以使用`index signature`来表示可能值的type:
```ts
interface StringArray {

	[index: number]: string;

}

const myArray: StringArray = getStringArray();

const secondItem = myArray[1];
```
index的类型只能是number或string(可以两者一起).`index signature`也可以添加`readonly`.
它可以和一些properties的type annotation组合在一起,但这些properties必须符合`index signature`的规定:
```ts
interface NumberDictionary {

	[index: string]: number;
	
	length: number; // ok
	
	name: string; //error

}
```
其中index相关的property必须通过`[]`调用.
有时我们希望从现有的type的基础上新增properties参数新的type,使用`extend`:
```ts
interface BasicAddress {

	name?: string;
	
	street: string;
	
	city: string;
	
	country: string;
	
	postalCode: string;

}

interface AddressWithUnit extends BasicAddress {

	unit: string;

}
```
可以`extend`多个type.
我们也可以使用`intersection types`来组合现有的type:
```ts
interface Colorful {

	color: string;

}

interface Circle {

	radius: number;

}

type ColorfulCircle = Colorful & Circle;
```
我们可以在object types中使用`generic`:
```ts
interface Box<Type> {

	contents: Type;

}

let box: Box<string>;
```
`type alias`也可以使用,它可以拓展除很多其他用法:
```ts
type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];
```
在ts中的`Array`本身就是一个generic type.
除了正常的数组,我们可以创建只读数组:
```ts
function doStuff(values: ReadonlyArray<string>) {

	// We can read from 'values'...
	
	const copy = values.slice();
	
	console.log(`The first value is ${values[0]}`);
	
	// ...but we can't mutate 'values'.
	
	values.push("hello!");//error!
}
```
注意并没有叫`ReadonlyArray`的constructor,不过我们可以把正常的数组赋值给它:
```ts
const roArray: ReadonlyArray<string> = ["red", "green", "blue"];
```
注意反过来就不可行:
```ts
let x: readonly string[] = [];

let y: string[] = [];

x = y;

y = x;//error!
```
类似`Array`,它也有一个shorthand语法:`readonly Type[]`.
当我们对数组的形式有明确认知时,可以使用`tuple types`:
```ts
type StringNumberPair = [string, number];
```
此时它的length已确定,当赋值时会检查length.
可以有可选的properties:
```ts
type Either2dOr3d = [number, number, number?];
```
也可以不确定length,而且指定一部分值的类型:
```ts
type StringNumberBooleans = [string, number, ...boolean[]];

type StringBooleansNumber = [string, ...boolean[], number];

type BooleansStringNumber = [...boolean[], string, number];
```
它可以加上`readonly`,注意如果普通数组使用了`const assertion`,它会被视为`readonly tuple type`:
```ts
let point = [3, 4] as const;
```
# Type manipulation
## generic
我们可以`interface`来形成约束条件:
```ts
interface Lengthwise {

	length: number;

}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {

	console.log(arg.length); // Now we know it has a .length property, so no more error

	return arg;

}
```
也可以使用其他的`type parameter`:
```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {

	return obj[key];

}
```
想使用`generic`建立一个创建class实例的函数,需要指向它的构造函数:
```ts
function create<Type>(c: { new (): Type }): Type {

	return new c();

}
```
## keyof
对object type使用使用`keyof`获得一个它的key组成的union:
```ts
type Point = { x: number; y: number };

type P = keyof Point;//P:"x"|"y"
```
如果使用了`index signature`,则会是index对于的type:
```ts
type Arrayish = { [n: number]: unknown };

type A = keyof Arrayish;

//type A :number

type Mapish = { [k: string]: boolean };

type M = keyof Mapish;

//type M:string|number,因为js中的obj会自动将obj[0]转化为obj["0"]
```
## typeof
在js中已经中`typeof`运算符可已使用,在ts中它能正确根据上下文推断出type:
```ts
let s = "hello";

let n: typeof s;//n:string
```
这在使用如`ReturnType`这类内建type时很有用:
```ts
type Predicate = (x: unknown) => boolean;

type K = ReturnType<Predicate>;//K:boolean,ReturnType只接受type参数
```
注意当作为type annotation使用时,只有对`identifiers`(如变量名,函数名)和它们的properties中使用`typeof`才合法.
## indexed access types
我们可以使用`index`来获取type:
```ts
type Person = { age: number; name: string; alive: boolean };

type Age = Person["age"]; //type Age = number
```
`index`本身接受一个type,故可以使用type的各种特性:
```ts
type I1 = Person["age" | "name"];

type I1 = string | number

type I2 = Person[keyof Person];
```
我们可以使用`number`获取数组的type:
```ts
const MyArray = [

{ name: "Alice", age: 15 },

{ name: "Bob", age: 23 },

{ name: "Eve", age: 38 },

];

type Person = typeof MyArray[number];

type Person = { name: string; age: number; }

type Age = typeof MyArray[number]["age"];

type Age = number

// Or

type Age2 = Person["age"];

type Age2 = number
```
注意能作为`index`的只有type,故以下语句是非法的:
```ts
const key = "age";

type Age = Person[key];
```
## condition types
我们可以使用`condition types`来利用条件判断判断type:
```ts
interface Animal {

	live(): void;

}

interface Dog extends Animal {

	woof(): void;

}

type Example1 = Dog extends Animal ? number : string;//number


type Example2 = RegExp extends Animal ? number : string;//string
```
我们可以使用`infer`来利用条件推断出正确时的type:
```ts
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return

? Return

: never;

type Num = GetReturnType<() => number>;
//type Num = number

type Str = GetReturnType<(x: string) => string>;
//type Str = string
```
如果定义了多个`call signatures`,以最后一个为准:
```ts
declare function stringOrNum(x: string): number;

declare function stringOrNum(x: number): string;

declare function stringOrNum(x: string | number): string | number;

type T1 = ReturnType<typeof stringOrNum>;//string | number
```
如果与`generic`联合时使用了union,union的每一个内容都会被应用一次:
```ts
type ToArray<Type> = Type extends any ? Type[] : never;

type StrArrOrNumArr = ToArray<string | number>;//string[] | number[]
```
取消这种默认行为:
```ts
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

// 'StrArrOrNumArr' is no longer a union.

type StrArrOrNumArr = ToArrayNonDist<string | number>;//(string | number)[]
```
## mapped types
我们有时希望通过现有的type建立新的type,此时我们可以使用`mapped types`,遍历某个type的key建立type:
```ts
type OptionsFlags<Type> = {

	[Property in keyof Type]: boolean;

};

type FeatureFlags = {

	darkMode: () => void;
	
	newUserProfile: () => void;

};

type FeatureOptions = OptionsFlags<FeatureFlags>;
//type FeatureOptions = { darkMode: boolean; newUserProfile: boolean; }
```
它可以加上`mapping modifiers`:readonly和?,加上前缀,控制加上(`+`)或移除(`-`)这些功能.不加前缀的话,默认是`+`.
```ts
// Removes 'readonly' attributes from a type's properties

type CreateMutable<Type> = {

	-readonly [Property in keyof Type]: Type[Property];

};

// Removes 'optional' attributes from a type's properties

type Concrete<Type> = {

	[Property in keyof Type]-?: Type[Property];

};
```
我们还可以使用`as`进行第二次匹配:
```ts
// Remove the 'kind' property

type RemoveKindField<Type> = {

	[Property in keyof Type as Exclude<Property, "kind">]: Type[Property]

};
//Exclude<T,U>在T中有U时返回never,没有返回T.

interface Circle {

kind: "circle";

radius: number;

}

type KindlessCircle = RemoveKindField<Circle>;
//type KindlessCircle = { radius: number; }
```
## template literal types
就像js中的template literal,该语法也可以被用于type:
```ts
type World = "world";

type Greeting = `hello ${World}`;
//type Greeting = "hello world"
```
如果我们使用union,则union中的每一个内容都会应用一次形成新的union:
```ts
type EmailLocaleIDs = "welcome_email" | "email_heading";

type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

//type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
```
如果使用了多个union,则它们会交叉应用:
```ts
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

type Lang = "en" | "ja" | "pt";

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
//type LocaleMessageIDs = "en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id" | "ja_welcome_email_id" | "ja_email_heading_id" | "ja_footer_title_id" | "ja_footer_sendoff_id" | "pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id"
```
为string类型type的操作,ts内置了一些types可以被使用:
- `Uppercase<StringType>`:全部转为大写字母.
- `Lowercase<StringType>`:全部转为小写字母.
- `Capitalize<StringType>`:首字母大写.
- `Uncapitalize<StringType>`:首字母小写.
# class
我们使用`field declaration`来声明public的可读写的properties:
```ts
class Point {

	x: number;
	
	y: number;

}
```
可以初始化:
```ts
class Point {

	x = 0;
	
	y = 0;

}
```
在声明了相应的type后便不可改变.
properties可加上`readonly`设置为只读.
加上`constructor`:
```ts
class Point {

	x: number;
	
	y: number;
	
	// Normal signature with defaults
	
	constructor(x = 0, y = 0) {
		
		this.x = x;
		
		this.y = y;
	
	}

}
```
`constructor`与一般的函数的区别是:
- 不可用使用type parameter.
- 不可以对return type使用type annotation.
进行继承时,如果在`constructor`没有进行`super()`,ts会自动报错.
添加method:
```ts
class Point {

	x = 10;
	
	y = 10;
	
	scale(n: number): void {
	
		this.x *= n;
		
		this.y *= n;
	
	}

}
```
注意使用properties要加上this进行限定.
使用`getter`和`setter`:
```ts
class C {

	_length = 0;
	
	get length() {
	
		return this._length;
	
	}
	
	set length(value) {
	
		this._length = value;
	
	}

}
```
有几点需要注意:
- 如果只设置了getter,则property会自动被认为是readonly.
- 如果setter的参数type没有指定,ts会自动从getter的返回值推断.
- getter和setter必须具有相同的member visibility(即public等).
class可以使用`index signature`:
```ts
class MyClass {

	[s: string]: boolean | ((s: string) => boolean);
	
	check(s: string) {
	
		return this[s] as boolean;
	
	}

}
```
我们可以使用`implement`来检查class是否符合某个interface定义的type:
```ts
interface Pingable {

	ping(): void;

}

class Sonar implements Pingable {

	ping() {
	
	console.log("ping!");
	
	}

}

//error
class Ball implements Pingable {

	pong() {
	
		console.log("pong!");
	
	}

}
```
注意这仅仅只是进行检查,并不会改变class,故相应的type annotation还是需要做:
```ts
interface Checkable {

	check(name: string): boolean;

}

class NameChecker implements Checkable {

	check(s) {
	//s:any
	
	// Notice no error here
	
		return s.toLowercse() === "ok";
	
	}

}
```
而且如果其中有可选的property,也不会自动创建将property.
继承时覆盖method:
```ts
class Base {

	greet() {
	
		console.log("Hello, world!");
	
	}

}

class Derived extends Base {

	greet(name?: string) {
	
		if (name === undefined) {
		
			super.greet();
		
		} else {
		
			console.log(`Hello, ${name.toUpperCase()}`);
		
		}
	
	}

}
```
注意继承的class必须遵循原来的class,这样的有点是下面的语句合法:
```ts
const b: Base = d;//d是继承的class的instance

// No problem

b.greet();
```
如果不遵循就会出错:
```ts
class Base {

	greet() {
	
		console.log("Hello, world!");

}

}

class Derived extends Base {

	// Make this parameter required,error!!!
	
	greet(name: string) {
	
		console.log(`Hello, ${name.toUpperCase()}`);
	
	}

}
```
当target>=ES2022或 `useDefineForClassFields`被设置为true时,class fields会在父class的constructor运行完后运行,覆盖父class的properties,但有时我们仅仅只是想声明一个更具体的派生除了的type而不是覆盖,这时使用`declare`防止覆盖:
```ts
interface Animal {

	dateOfBirth: any;

}

interface Dog extends Animal {

	breed: any;

}

class AnimalHouse {

	resident: Animal;
	
	constructor(animal: Animal) {
	
		this.resident = animal;
	
	}

}

class DogHouse extends AnimalHouse {

// Does not emit JavaScript code,

// only ensures the types are correct

	declare resident: Dog;
	
	constructor(dog: Dog) {
	
		super(dog);
	
	}

}
```
class的初始化的运行顺序如下:
-   base class field初始化.
-   base class constructor运行.
-   derived class fields初始化.
-   derived class constructor运行.
这有时不注意的话会导致奇怪的结果:
```ts
class Base {

	name = "base";
	
	constructor() {
	
		console.log("My name is " + this.name);
	
	}

}

class Derived extends Base {

	name = "derived";

}

// Prints "base", not "derived"

const d = new Derived();
```
当继承内置的type时,若编译到ES6之前的版本,可能引发问题.
我们可以使用各种关键词设置`member visibility`,即控制class的内容对外部可见不可见.
如果没指定,默认是`public`,即对外部可见:
```ts
class Greeter {

	public greet() {
	
		console.log("hi!");
	
	}

}

const g = new Greeter();

g.greet();
```
使用`protected`对子类和自身内部可见:
```ts
class Greeter {

	protected getName() {
	
		return "hi";
	
	}

}

class SpecialGreeter extends Greeter {

	public howdy() {
	
	// OK to access protected member here
	
		console.log("Howdy, " + this.getName());
	
	}

}

const g = new SpecialGreeter();

g.getName();//error
```
我们可以在继承的class中将`protected`的内容暴露给外部:
```ts
class Base {

	protected m = 10;

}

class Derived extends Base {

// No modifier, so default is 'public'

	m = 15;

}

const d = new Derived();

console.log(d.m); // OK
```
不可以使用base class的实例在子类中访问`protected`的内容:
```ts
class Base {

	protected x: number = 1;

}

class Derived1 extends Base {

	protected x: number = 5;

}

class Derived2 extends Base {

	f1(other: Derived2) {
	
		other.x = 10;
	
	}

	f2(other: Base) {
	
		other.x = 10;//error
	
	}

}
```
使用`private`使得仅对内部可见:
```ts
class Base {

	private x = 0;

}

const b = new Base();

// Can't access from outside the class

console.log(b.x);
```
允许在class内通过其他instance内访问:
```ts
class A {

	private x = 10;
	
	public sameAs(other: A) {
	
		// No error
		
		return other.x === this.x;
	
	}

}
```
注意`protected`和`private`仅仅是ts的内容,在编译出的js文件中相关的class的内容仍可被访问,不过如果使用js的private field(#),在编译后依然能禁止访问.
在ts中,不可使用`static`覆盖`Function properties`:
```ts
class S {

	static name = "S!";//error!

}
```
`private`等则可正常使用.
class可以使用`generic`:
```ts
class Box<Type> {
	
	contents: Type;
	
	constructor(value: Type) {
	
		this.contents = value;
		
	}

}

const b = new Box("hello!");
```
`static`的内容不可使用`type parameter`.
在ts中,method可以使用`arrow function`,它会被保证正确得到`this`:
```ts
class MyClass {

	name = "MyClass";
	
	getName = () => {
	
		return this.name;
	
	};

}

const c = new MyClass();

const g = c.getName;

// Prints "MyClass" instead of crashing

console.log(g());
```
但有以下确定:
- 使用了更多的内存.
- 不可以通过super访问到.
我们可以设置`this`参数来保证class的函数被正确使用:
```ts
class MyClass {

	name = "MyClass";
	
	getName(this: MyClass) {
	
		return this.name;
	
	}

}

const c = new MyClass();

// OK

c.getName();

// Error, would crash

const g = c.getName;

console.log(g());
```
在ts中,`this`也是一个特殊的表示当前class的type:
```ts
class Box {

	contents: string = "";
	
	set(value: string) {
	
		this.contents = value;
	
		return this;

	}

}
class ClearableBox extends Box {
	
	clear() {
	
		this.contents = "";

	}

}

const a = new ClearableBox();

const b = a.set("hello");
//const b: ClearableBox
```
this也可以被利用来进行narrowing:
```ts
class FileSystemObject {

	isFile(): this is FileRep {
	
		return this instanceof FileRep;
	
	}
	
	isDirectory(): this is Directory {
	
		return this instanceof Directory;
	
	}
	
	isNetworked(): this is Networked & this {
	
		return this.networked;
	
	}
	
	constructor(public path: string, private networked: boolean) {}

}

class FileRep extends FileSystemObject {

	constructor(path: string, public content: string) {
	
		super(path, false);
	
	}

}

class Directory extends FileSystemObject {

	children: FileSystemObject[];

}

interface Networked {

	host: string;

}

const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");

if (fso.isFile()) {

	fso.content;

} else if (fso.isDirectory()) {

	fso.children;

} else if (fso.isNetworked()) {

	fso.host;

}
```
我们可以使用`abstract`的classes和members用于继承,继承时需要将`abstract`的内容具体实现:
```ts
abstract class Base {

	abstract getName(): string;
	
	printName() {
	
		console.log("Hello, " + this.getName());
	
	}

}

const b = new Base();//error

class Derived extends Base {

	getName() {
	
		return "world";
	
	}

}

const d = new Derived();

d.printName();
```
当想接受`abstract`的class作为参数时,需要加上一些限制:
```ts
function greet(ctor: new () => Base) {
	
	const instance = new ctor();
	
	instance.printName();

}

greet(Derived);

greet(Base);//error
```
除此之外注意`Empty class`会被判定符合所有classes:
```ts
function fn(x: Empty) {

// can't do anything with 'x', so I won't

}

// All OK!

fn(window);

fn({});

fn(fn);
```
# Modules
在ts中,type可以被正常`import`和`export`.不过我们也可以使用ts添加的方法表示我们在处理type:
```ts
import type { Cat, Dog } from "./animal.js";
import { createCatName, type Cat, type Dog } from "./animal.js";
```
# 设置
`strict`:开启一系列增强的类型检查功能.
`noImplicitAny`:禁止ts中出现`any`类型.
`strictNullChecks`:更严格地检查null和undefined.
`strictPropertyInitialization`:强制class的property初始化(在field declaration或constructor).可使用`name!: string;`来不初始化且避免错误.
`target`:表示要支持到的js运行环境,高于该环境的版本的代码会被转化.
`module`:设置modules之间使用什么通信.