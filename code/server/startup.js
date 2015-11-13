// old, no policy
//Meteor.startup( () => Modules.server.startup() );

// new with policy
Meteor.startup( () => {
  BrowserPolicy.content.allowOriginForAll("https://js.stripe.com/")
  BrowserPolicy.content.allowOriginForAll("https://checkout.stripe.com/")
})