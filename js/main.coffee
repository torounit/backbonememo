
do ($=jQuery) ->

  class Memo extends Backbone.Model

  class Memos extends Backbone.Collection
    model: Memo

  memos = new Memos

  class AppView extends Backbone.View

    template: _.template "<tr><td><%- memo %></td></tr>"

    events:
      "click #post" : "post"
      "keypress input": "disableEnter"

    initialize: () ->
      @listenTo memos, 'add', (input)->
        $(".memoList").append @template( input.toJSON() )


    disableEnter:(e) ->
      if e.keyCode == 13
        e.preventDefault()
        @post()

    post:() ->
      input = @$("input").val()
      memos.add({memo: input})
      @$("input").val("")



  $ ->
    App = new AppView({el:"#memoApp"});
