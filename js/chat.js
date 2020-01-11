var tags = [
  {
    type: "input",
    tag: "text",
    name: "name",
    "chat-msg": "Hi, I'm Chatty. What's your name?"
  },
  {
    type: "input",
    tag: "radio",
    name: "bhkType",
    "chat-msg":
      "Nice to meet ya, {{name}}! What BHK Type are you looking for ?",
    children: [
      {
        value: "1 BHK",
        text: "1 BHK"
      },
      {
        value: "2 BHK",
        text: "2 BHK"
      },
      {
        value: "3 BHK",
        text: "3 BHK"
      }
    ]
  },
  {
    type: "msg",
    "chat-msg": "Ok, Searching {{bhkType}} houses for you...",
    delay: 1250,
    callback: function() {
      var name = Chat.getData().name;
      Chat.addTags([
        {
          type: "input",
          tag: "radio",
          name: "movingDate",
          "chat-msg": "Tell us your desired moving date!",
          children: [
            {
              value: "Immediately",
              text: "Immediately"
            },
            {
              value: "Within 15 days",
              text: "Within 15 days"
            },
            {
              value: "Within 30 days",
              text: "Within 30 days"
            },
            {
              value: "After 30 days",
              text: "After 30 days"
            }
          ],
          success: function(data) {
            var msg;

            switch (data.movingDate[0]) {
              case "Immediately":
                msg = "Located 195 houses";
                break;
              case "Within 15 days":
                msg = "Located 137 houses";
                break;
              case "Within 30 days":
                msg = "Located 188 houses";
                break;
              case "After 30 days":
                msg = "Located 156 houses";
                break;
            }

            Chat.addTags([
              {
                type: "msg",
                "chat-msg": msg,
                delay: 2000
              }
            ]);
          }
        }
      ]);
    }
  },
  {
    type: "input",
    tag: "custom",
    name: "customTag",
    submitBarStyle: "full-submit",
    "chat-msg": "This was a basic demo!!",
    renderer: customTagRender,
    retriever: function() {
      $("#custom-input").remove();
      return {
        data: window.customData,
        friendly:
          "Custom inputs can return data, and a custom message to display from the user. That is what this message is."
      };
    }
  },
  {
    type: "msg",
    "chat-msg": "Anyways, thanks for checking this out!"
  }
];

function customTagRender() {
  $("#ui-control").prepend(
    '<div id="custom-input">Custom input! Practically, this would be a clickable map or image, or virtually anything that you can code up. Click the big button below to submit</div>'
  );

  //This custom data would be set by user interaction in the real world
  window.customData = "the possibilities are endless!";
}

$(document).ready(function() {
  Chat.start($("#chat-context"), tags);
});
