
do ($=jQuery) ->

  class Memo extends Backbone.Model

  class Memos extends Backbone.Collection
    model: Memo

  class AppView extends Backbone.View

    initialize: () ->
      @collection = new Memos()

    el: "#memoApp"
    template: _.template "<li><%- memo %></li>"

    events:
      "click #post" : "post"

    post:() ->

      input = @$("input").val()
      @model = new Memo(
        memo: input
      )
      $(".memoList").append(@template(@model.toJSON()))


  $ ->
    App = new AppView();
    console.log App