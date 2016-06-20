/*
 * jMentions Plugin - v1.0.0
 * Author: Igor Corradi
 * Email: igorcorradi.dev@gmail.com
 * Date: Jun 13 2016
 *
 * Description: Mention people like Facebook and Asana.
 * */

(function($) {
  'use strict';

  var regex = /@([A-Za-z]+[_A-Za-z0-9]+)/gi;

  $.jMentions = function(elm, options) {
    function renderDropdown(mentions, dropdownClass) {
      var dropdown = $('<div class="' + dropdownClass +
                       '"></div>');

      if (mentions.length) {
        $.jMentions.elm = elm;

        mentions.forEach(function(mention) {
          var value = mention[$.jMentions.elm.data('options').value],
              label = mention[$.jMentions.elm.data('options').label];

          dropdown.append('<div onclick="$(this).jMentions.addMention(\'' +
                          value + '\')" data-mention="' + value + '">' +
                          label + '</div>');
        });

        $('.' + $.jMentions.elm.data('options').dropdownClass).remove();
        $(elm).after(dropdown);
      }
    }

    var _options = $.extend({
          dropdownClass: 'jmentions-dropdown',
          value: 'value',
          label: 'label',
          source: function() { return {}; }
        }, options);

    $(elm).data('options', _options);

    var textLength;

    $.jMentions.getResults = function(selector) {
      var targets = [],
          mentions;

      if (selector) {
        mentions = $(selector).find('span[value]');
      } else {
        mentions = $(elm).find('span[value]');
      }

      if (mentions) {
        for (var i = 0; i < mentions.length; i++) {
          if (targets.indexOf($(mentions[i]).attr('value')) == -1) {
            targets.push($(mentions[i]).attr('value'));
          }
        }
      }

      return targets;
    };

    $(elm).keyup(function(e) {
      $('.' + $(this).data('options').dropdownClass).remove();

      var match = $(this).text().match(regex);

      if (match) {
        var len = match[0].length,
            dropdownClass = $(this).data('options').dropdownClass,
            pureMatch = match[0].slice(1, len);

        if ($(this).data('options').source(pureMatch).promise) {
          $(this).data('options').source(pureMatch).promise().done(function(data) {
            renderDropdown(data, dropdownClass);
            $.jMentions.mentions = data;
          });
        } else {
          var data = $(this).data('options').source(pureMatch);
          renderDropdown(data, dropdownClass);
          $.jMentions.mentions = data;
        }
      } else {
        $.jMentions.mentions = [];
      }

      var range = window.getSelection().getRangeAt(0);

      // delete the mention
      if (textLength && $(this).html().length < textLength) {
        if (range.commonAncestorContainer.parentNode.tagName == 'SPAN') {
          $(this)[0].removeChild(range.commonAncestorContainer.parentNode);
        }
      }

      textLength = $(this).html().length;
    });
  };

  $.fn.jMentions = function(options) {
    return $.jMentions(this, options);
  };

  $.fn.jMentions.addMention = function(person) {
    $.jMentions.mentions.forEach(function(mention) {
      if (person == mention[$.jMentions.elm.data('options').value]) {
        person = mention;
      }
    });

    var $elm = $($.jMentions.elm),
        mentionHTML = '&#8203;<span value=\"' +
        person[$.jMentions.elm.data('options').value] + '\" disabled>' +
        person[$.jMentions.elm.data('options').label] + '</span>&#8203;&nbsp;';

    $elm.html($elm.html().replace(regex, mentionHTML));
    $elm.click(); // focus contenteditable

    // position cursor on contentditable after added mention
    var tmp = $('<span />').appendTo($elm),
    node = tmp.get(0),
    range = null,
    sel = null;

    range = document.createRange();
    range.selectNode(node);
    sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    tmp.remove();

    $.jMentions.mentions = [];
    $('.' + $.jMentions.elm.data('options').dropdownClass).remove();
  };
}(jQuery));
