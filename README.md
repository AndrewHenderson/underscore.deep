# underscore.deep
Powerful extensions for [Underscore.js](https://github.com/jashkenas/underscore) which allow for depth-first tree traversal across objects and arrays.

## How is this different from other tree traversal?
Most other libraries work only with a strict structure of nested objects, ignoring any nested arrays. These functions look within those arrays as well to a depth of n.

Let's say your data looks something like this:

```js
var familyTree = {
  name: "Michael",
  age: "deceased",
  children: [
    {
      name: "Joseph",
      age: "deceased",
      children: []
    },
    {
      name: "Christine",
      age: 73,
      children: [
        {
          name: "Christopher",
          age: 45,
          children: []
        },
        {
          name: "Craig",
          age: 41,
          children: [
            {
              name: "Luca",
              age: 13,
              children: []
            },
            {
              name: "Christine",
              age: 9,
              children: []
            }
          ]
        }
      ]
    },
    {
      name: "Robert",
      age: 71,
      children: [
        {
          name: "Jennifer",
          age: 46,
          children: [
            {
              name: "Isabella",
              age: 17,
              children: []
            },
            {
              name: "Nicholas",
              age: 13,
              children: []
            }
          ]
        },
        {
          name: "Erin",
          age: 43,
          children: [
            {
              name: "Eve",
              age: 8,
              children: []
            },
            {
              name: "Rowan",
              age: 6,
              children: []
            }
          ]
        }
      ]
    },
    {
      name: "Rosemary",
      age: 69,
      children: [
        {
          name: "Andrew",
          age: 31,
          children: []
        }
      ]
    },
    {
      name: "Nancy",
      age: 67,
      children: []
    },
    {
      name: "Michael",
      age: 65,
      children: [
        {
          name: "Nicole",
          age: 32,
          children: []
        },
        {
          name: "Emily",
          age: 28,
          children: []
        }
      ]
    }
  ]
};

```
#### deepFind

**Signature:** `_.deepFind(collection:Array|Object, predicate:Function|Object)`

Recursively looks through each value in the `collection`, returning the first object that passes a truth test - `predicate`.

**Note: `predicate` can also be a properties object.**

You'd like to see all children between the ages of 13 and 30.

```js
_.deepFind(familyTree, function (obj) {
  return _.isNumber(obj.age) && obj.age > 13 && obj.age < 30;
});
```
Result:
```js
{
  "name": "Isabella",
  "age": 17,
  "children": []
}
```

Now you want to see the child age 46.
```js
_.deepFind(familyTree, {"age":46});
```
Result:
```js
{
  "name": "Jennifer",
  "age": 46,
  "children": [
    {
      "name": "Isabella",
      "age": 17,
      "children": []
    },
    {
      "name": "Nicholas",
      "age": 13,
      "children": []
    }
  ]
}
```
#### deepFilter

**Signature:** `_.deepFilter(collection:Array|Object, predicate:Function|Object)`

Recursively looks through each value in the `collection`, returning an array of all the objects that pass a truth test (`predicate`).

**Note: `predicate` can also be a properties object.**

Now you want to see all children with an empty children array.
```js
_.deepFilter(familyTree, {
  children: []
});
```
Result: 12
```js
[
  {
    "name": "Joseph",
    "children": []
  },
  {
    "name": "Christopher",
    "children": []
  },
  {
    "name": "Luca",
    "children": []
  },
  {
    "name": "Christine",
    "children": []
  },
  {
    "name": "Isabella",
    "children": []
  },
  {
    "name": "Nicholas",
    "children": []
  },
  {
    "name": "Eve",
    "children": []
  },
  {
    "name": "Rowan",
    "children": []
  },
  {
    "name": "Andrew",
    "children": []
  },
  {
    "name": "Nancy",
    "children": []
  },
  {
    "name": "Nicole",
    "children": []
  },
  {
    "name": "Emily",
    "children": []
  }
]
```
Now you'd like to see all children with the name "Christine":
```js
_.deepFilter(familyTree, {
  name: "Christine"
});
```
Result: 2
```js
[
  {
    "name": "Christine",
    "children": [
      {
        "name": "Christopher",
        "children": []
      },
      {
        "name": "Craig",
        "children": [
          {
            "name": "Luca",
            "children": []
          },
          {
            "name": "Christine",
            "children": []
          }
        ]
      }
    ]
  },
  {
    "name": "Christine",
    "children": []
  }
]
```
Interestingly, the array contains both the parent the child by the same name!

Now you'd like to see all children with one child.
```js
_.deepFilter(familyTree, function (obj) {
  return obj.children && obj.children.length == 1;
});
```
Result: 1
```js
[
  {
    "name": "Rosemary",
    "age": 69,
    "children": [
      {
        "name": "Andrew",
        "age": 31,
        "children": []
      }
    ]
  }
]
```
#### deepSearch

**Signature:** `_.deepSearch(collection:Array|Object, values:Array)`

Recursively looks through each value in the `collection`, returning an array of all the objects that contain all of the `values`.

Now you'd like to see all objects that contain both "Nicholas" and 13.
```js
_.deepSearch(familyTree, ['Nicholas', 13]);
```
Result: 1
```js
[
  {
    "name": "Nicholas",
    "age": 13,
    "children": []
  }
]
```
