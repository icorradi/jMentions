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
    function renderDropdown() {
      var dropdown = $('<div class="' + $.jMentions.options.dropdownClass +
                       '"></div>');

      if ($.jMentions.mentions.length) {
        $.jMentions.mentions.forEach(function(mention) {
          dropdown.append('<div onclick="$(this).jMentions.addMention(\'' +
                          mention[$.jMentions.options.value] +
                          '\')" data-mention="' +
                          mention[$.jMentions.options.value] + '">' +
                          mention[$.jMentions.options.label] + '</div>')
        })

        $('.' + $.jMentions.options.dropdownClass).remove();
        $(elm).after(dropdown);
      }
    }

    $.jMentions = {
      options: $.extend({
        dropdownClass: 'jmentions-dropdown',
        value: 'value',
        label: 'label',
        source: function() { return {} }
      }, options),
      elm: elm
    }

    var textLength;

    $.jMentions.getResults = function(selector) {
      var targets = [];

      if (selector) {
        var mentions = $(selector).find('span[value]');
      } else {
        var mentions = $(elm).find('span[value]');
      }

      if (mentions) {
        for (var i = 0; i < mentions.length; i++) {
          if (targets.indexOf($(mentions[i]).attr('value')) == -1) {
            targets.push($(mentions[i]).attr('value'))
          }
        }
      }

      return targets;
    };

    $(elm).keyup(function(e) {
      $('.' + $.jMentions.options.dropdownClass).remove();

      var match = $(elm).text().match(regex);

      if (match) {
        var len = match[0].length,
            pureMatch = match[0].slice(1, len);

        if ($.jMentions.options.source(pureMatch).promise) {
          $.jMentions.options.source(pureMatch).promise().done(function(data) {
            $.jMentions.mentions = data;
            renderDropdown();
          })
        } else {
          $.jMentions.mentions = $.jMentions.options.source(pureMatch);
          renderDropdown();
        }
      } else {
        $.jMentions.mentions = [];
      };

      var range = window.getSelection().getRangeAt(0);

      // delete the mention
      if (textLength && $(elm).html().length < textLength) {
        var range = window.getSelection().getRangeAt(0);
        if (range.commonAncestorContainer.parentNode.tagName == 'SPAN') {
          $(elm)[0].removeChild(range.commonAncestorContainer.parentNode);
        }
      }

      textLength = $(elm).html().length;
    });
  };

  $.fn.jMentions = function(options) {
    return $.jMentions(this, options);
  }

  $.fn.jMentions.addMention = function(person) {
    $.jMentions.mentions.forEach(function(mention) {
      if (person == mention[$.jMentions.options.value]) {
        person = mention;
      }
    })

    var $elm = $($.jMentions.elm),
        mentionHTML = '&#8203;<span value="'
        + person[$.jMentions.options.value] + '" disabled>' +
        person[$.jMentions.options.label] + '</span>&#8203;&nbsp;'

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
    $('.' + $.jMentions.options.dropdownClass).remove();
  }
}(jQuery));
