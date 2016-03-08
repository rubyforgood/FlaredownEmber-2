import Ember from 'ember';

/*
  Assumes the following exist:
    this.get('store')
    this.router
*/

export default Ember.Mixin.create({

  checkinByDate(date) {
    return new Ember.RSVP.Promise((resolve,reject) => {
      this.get('store').query('checkin', {date: date}).then(results => {
        var records = results.toArray();
        if (Ember.isEmpty(records)) {
          reject();
        } else {
          resolve(records[0]);
        }
      });
    });
  },

  routeToCheckin(date, step) {
    this.checkinByDate(date).then( checkin => {
      this.router.transitionTo('checkin', checkin.get('id'), step ? step : 'summary');
    }, () => {
      this.routeToNewCheckin(date, step);
    });
  },

  routeToNewCheckin(date, step) {
    var newCheckin = this.get('store').createRecord('checkin', {date: date});
    newCheckin.save().then(savedCheckin => {
      this.router.transitionTo('checkin', savedCheckin.get('id'), step ? step : 'start');
    });
  }

});
