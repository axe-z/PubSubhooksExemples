import PubNub from "pubnub";
import pubnubConfig from "./pubnub.config";
// console.log(pubnubConfig);
// //https://www.pubnub.com/docs/web-javascript/data-streams-publish-and-subscribe

//creer un channel name
export const MESSAGE_CHANNEL = "MESSAGE_CHANNEL";

//creer un fn class pour avoir ensuite des instances
function PubSub() {
  //creer l'instance
  const pubnub = new PubNub(pubnubConfig);

  pubnub.subscribe({ channels: [MESSAGE_CHANNEL] });

  //creer notre propre listener qui call lui de l api
  this.addListener = listenerConfig => {
    pubnub.addListener(listenerConfig);
  };
  //creer notre propre publish sur l instance
  this.publish = message => {
    // console.log("message publié:", message);

    pubnub.publish({
      message,
      channel: MESSAGE_CHANNEL
    });
  };
}

export default PubSub;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//TEST AVEC L API
// //on peut en ajouter des channelS
// pubnub.subscribe({ channels: [MESSAGE_CHANNEL] });

// pubnub.addListener({
//   message: messageObject => {
//     console.log("messageObject", messageObject);
//   }
// });

///le listner se bati pas assez vite parfois quand le publish est lancé
// setTimeout(() => {
//   pubnub.publish({
//     //test
//     message: "foo",
//     channel: MESSAGE_CHANNEL
//   });
// }, 1000);

// {channel: "MESSAGE_CHANNEL", subscription: undefined, actualChannel: null, subscribedChannel: "MESSAGE_CHANNEL", timetoken: "15562987516865311", …}
// actualChannel: null
// channel: "MESSAGE_CHANNEL"
// message: "foo" //ok good !!
// publisher: "pn-d163339e-e788-4412-8898-13d07d9766fd"
// subscribedChannel: "MESSAGE_CHANNEL"
// subscription: undefined
// timetoken: "15562987516865311"
// __proto__: Object
