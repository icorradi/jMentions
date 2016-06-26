# jMentions - jQuery Plugin
Mention people like Facebook and Asana

> This plugin is designed to be used with **contenteditable**.

### Example
[Demo](http://icorradi.github.io/jmentions)

![gif demo](https://github.com/icorradi/jMentions/blob/master/demo.gif "GIF Demo")

### How to use:
Add a tag with contenteditable attribute on HTML
```html
<div id="editable" class="editable1" contenteditable="true"></div>
```

After include jQuery and jMentions call the plugin with the following syntax
```javascript
$('#editable').jMentions({
  source: function(prefix) {
    /* prefix: it's the current value that was matched when '@' was mentioned
       Example: Hello, @jho...
       prefix: "jho"

       This is util to API with autocomplete
    */

    return $.get('users.json', function(data) {
      /* [
           {"value": "jhon", "label": "Jhon"},
           {"value": "maria", "label": "Maria"},
           {"value": "alex", "label": "Alex"}
         ]
       */
      return data;
    })
  },
  value: 'username', // default is 'value'
  label: 'name', // default is 'label'
  dropdownClass: 'myDropdown' // default is 'jmentions-dropdown'
});

/* Example to get mentions results */
$('#results-button').click(function() {
  console.log($.jMentions.getResults('.editable1'));
})
```

 - **source:** This function receives the prefix and returns a list of matches
 - **value:** Field name to get "value" from data
 - **label:** Field name to get "label" from data
 - **dropdownClass:** Class name for dropdown

### License

The MIT License (MIT)
Copyright © 2016 Igor Corradi <igorcorradi.dev@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
