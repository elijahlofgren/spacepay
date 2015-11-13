var Future = Npm.require('fibers/future');


Meteor.methods({
	createTrialCustomer: function (customer) {
		check(customer, {
			//name: String,
			emailAddress: String,
			password: String,
			plan: String,
			token: String
		});

		var emailRegex = new RegExp(customer.emailAddress, "i");
		var lookupCustomer = Meteor.users.findOne({ "emails.address": emailRegex });

		if (!lookupCustomer) {
			var newCustomer = new Future();

			Meteor.call('stripeCreateCustomer', customer.token, customer.emailAddress, function (error, stripeCustomer) {
				if (error) {
					console.log(error);
				} else {
					var customerId = stripeCustomer.id,
						plan = customer.plan;

					Meteor.call('stripeCreateSubscription', customerId, plan, function (error, response) {
						if (error) {
							console.log(error);
						} else {
							// If all goes well with our subscription, we'll handle it here.
						}
					});
				}
			});
			return newCustomer.wait();
		} else {
			throw new Meteor.Error('customer-exists', 'Sorry, that customer email already exists!');
		}

	},
	stripeCreateCustomer: function (token, email) {

		check(email, String);
		check(token, String);

		var Stripe = StripeAPI(Meteor.settings.private.stripe.testSecretKey);


		var stripeCustomer = new Future();

		Stripe.customers.create({
			source: token,
			email: email
		}, function (error, customer) {
			if (error) {
				stripeCustomer.return(error);
			} else {
				stripeCustomer.return(customer);
			}
		});

		return stripeCustomer.wait();
	}
});