
do ($=jQuery) ->

  class Memo extends Backbone.Model

  class Memos extends Backbone.Collection
    localStorage: new Store("memo")
    model: Memo

  memos = new Memos

  class AppView extends Backbone.View

    template: _.template "<tr><td><%- memo %></td></tr>"

    events:
      "click #post" : "post"
      "keypress input": "disableEnter"

    initialize: () ->
      @listenTo memos, 'add', @addMemo
      @listenTo memos, 'reset', @render
      memos.fetch()

    render: ->
      @.each(@addMemo, @)


    addMemo:(input) ->
        $(".memoList").append @template( input.toJSON() )


    disableEnter:(e) ->
      if e.keyCode == 13
        e.preventDefault()
        @post()

    post:() ->
      input = @$("input").val()
      memo = new Memo memo:input
      memos.create(memo)
      @$("input").val("")



  $ ->
    App = new AppView({el:"#memoApp"});
