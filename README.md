# underscore.deep
Powerful extensions for Underscore.js which allow you to quickly locate any object that contains all of the key-value pairs listed in properties. The recursive depth-first traversal looks inside arrays as well objects.

#### deepWhere

**Signature:** `_.deepWhere(collection:Array|Object, properties:Object)`

Recursively looks through each value in the `collection`, returning an array of all the objects that contain all of the key-value pairs listed in `properties`.

Let's say your data looks something like this:

```js
var familyTree = {
  name: "Charles",
  children: [
    {
      name: "Joseph",
      children: []
    },
    {
      name: "Christine",
      children: [
        {
          name: "Christopher",
          children: []
        },
        {
          name: "Craig",
          children: [
            {
              name: "Luca",
              children: []
            },
            {
              name: "Christine",
              children: []
            }
          ]
        }
      ]
    },
    {
      name: "Robert",
      children: [
        {
          name: "Jennifer",
          children: [
            {
              name: "Isabella",
              children: []
            },
            {
              name: "Nicholas",
              children: []
            }
          ]
        },
        {
          name: "Erin",
          children: [
            {
              name: "Eve",
              children: []
            },
            {
              name: "Rowan",
              children: []
            }
          ]
        }
      ]
    },
    {
      name: "Rosemary",
      children: [
        {
          name: "Andrew",
          children: []
        }
      ]
    },
    {
      name: "Nancy",
      children: []
    },
    {
      name: "Michael",
      children: [
        {
          name: "Nicole",
          children: []
        },
        {
          name: "Emily",
          children: []
        }
      ]
    }
  ]
};

```
And you want to see all children with an empty children array.
```js
_.deepWhere(familyTree, {
  children: []
});
```
Result:
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
_.deepWhere(familyTree, {
  name: "Christine"
});
```
Result:
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
