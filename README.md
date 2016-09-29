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
           {"value": "jhon", "label": "Jhon", "avatar": "pic.jpg"},
           {"value": "maria", "label": "Maria", "avatar": "pic.jpg"},
           {"value": "alex", "label": "Alex", "avatar": "pic.jpg"}
         ]
       */
      return data;
    })
  },
  value: 'username', // default is 'value'
  label: 'name', // default is 'label'
  avatar: 'user-pic', // default is 'avatar'
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
 - **avatar:** Field name to get "avatar" from data
 - **dropdownClass:** Class name for dropdown
