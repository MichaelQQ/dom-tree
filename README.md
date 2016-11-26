# dom-tree
convert .html file to DOM tree

# Example
.html file
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width: device-width" />
  <title>Document</title>
  <script src="./test.js"></script>
  <script type="text/javascript">
    console.log('hello world!');
  </script>
</head>
<body>
  <div class="main">
    <div class="inner">
      Inner 123
    </div>
  </div>
</body>
</html>
```
convert to
```js
[
  {
    attributes: " html",
    children: [],
    paired: true,
    tag: "<!DOCTYPE html>",
    tagName: "DOCTYPE",
    type: "autoClose"
  }, {
    attributes: " lang=\"en\"",
    children: [
      {
        attributes: "",
        children: [
          {
            attributes: " charset=\"UTF-8\"",
            children: [],
            paired: true,
            tag: "<meta charset=\"UTF-8\">",
            tagName: "meta",
            type: "autoClose"
          }, {
            attributes: " name=\"viewport\" content=\"width: device-width\" /",
            children: [],
            paired: true,
            tag: "<meta name=\"viewport\" content=\"width: device-width\" />",
            tagName: "meta",
            type: "autoClose"
          }, {
            attributes: "",
            children: [
              {
                paired: true,
                tag: "Document",
                type: "String"
              }
            ],
            paired: true,
            tag: "<title>",
            tagName: "title",
            type: "open"
          }, {
            attributes: " src=\"./test.js\"",
            children: [],
            paired: true,
            tag: "<script src=\"./test.js\">"
            tagName: "script",
            type: "open"
          }, {
            attributes: " type=\"text/javascript\"",
            children: [
              {
                paired: true,
                tag: "console.log('hello world!');↵  ",
                type: "String"
              }
            ],
            paired: true,
            tag: "<script type=\"text/javascript\">",
            tagName: "script",
            type: "open"
          }
        ],
        paired: true,
        tag: "<head>",
        tagName: "head",
        type: "open"
      }, {
        attributes: "",
        children: [
          {
            attributes: " class=\"main\"",
            children: [
              {
                attributes: " class=\"inner\""
                children: [
                  {
                    paired: true,
                    tag: "Inner 123↵    ",
                    type: "String"
                  }
                ],
                paired: true,
                tag: "<div class=\"inner\">",
                tagName: "div",
                type: "open"
              }
            ],
            paired: true,
            tag: "<div class=\"main\">",
            tagName: "div",
            type: "open"
          }
        ],
        paired: true,
        tag: "<body>",
        tagName: "body",
        type: "open"
      }
    ],
    paired: true,
    tag: "<html lang=\"en\">",
    tagName: "html",
    type: "open"
  }
]
```

# LICENSE
MIT &copy; [MichaelQQ](http://michaelqq.com)