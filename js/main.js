// Generated by CoffeeScript 1.6.3
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

(function($) {
  var AppView, Memo, Memos, memos, _ref, _ref1, _ref2;
  Memo = (function(_super) {
    __extends(Memo, _super);

    function Memo() {
      _ref = Memo.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Memo;

  })(Backbone.Model);
  Memos = (function(_super) {
    __extends(Memos, _super);

    function Memos() {
      _ref1 = Memos.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Memos.prototype.localStorage = new Store("memo");

    Memos.prototype.model = Memo;

    return Memos;

  })(Backbone.Collection);
  memos = new Memos;
  AppView = (function(_super) {
    __extends(AppView, _super);

    function AppView() {
      _ref2 = AppView.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    AppView.prototype.template = _.template("<tr><td><%- memo %></td></tr>");

    AppView.prototype.events = {
      "click #post": "post",
      "keypress input": "disableEnter"
    };

    AppView.prototype.initialize = function() {
      this.listenTo(memos, 'add', this.addMemo);
      this.listenTo(memos, 'reset', this.render);
      return memos.fetch();
    };

    AppView.prototype.render = function() {
      return this.each(this.addMemo, this);
    };

    AppView.prototype.addMemo = function(input) {
      return $(".memoList").append(this.template(input.toJSON()));
    };

    AppView.prototype.disableEnter = function(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        return this.post();
      }
    };

    AppView.prototype.post = function() {
      var input, memo;
      input = this.$("input").val();
      memo = new Memo({
        memo: input
      });
      memos.create(memo);
      return this.$("input").val("");
    };

    return AppView;

  })(Backbone.View);
  return $(function() {
    var App;
    return App = new AppView({
      el: "#memoApp"
    });
  });
})(jQuery);
