var keystone = require('keystone'),
	moment = require('moment');

var Meetup = keystone.list('Meetup');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'meetups';
	locals.page.title = 'Meetups - HS Hackers';
	
	view.query('upcomingMeetup',
		Meetup.model.findOne()
			.where('state', 'active')
			.sort('-startDate')
	, 'talks[who]');
	
	view.query('pastMeetups',
		Meetup.model.find()
			.where('state', 'past')
			.sort('-startDate')
	, 'talks[who]');
	
	view.render('site/meetups');
	
}
