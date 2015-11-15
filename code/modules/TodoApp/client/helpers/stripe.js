
Meteor.startup(function () {
	var stripeKey = Meteor.settings.public.stripe.testPublishableKey;
	Stripe.setPublishableKey(stripeKey);

});
