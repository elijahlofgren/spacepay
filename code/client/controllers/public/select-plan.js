Template.selectPlan.helpers({
  plans: function () {
    var getPlans = Meteor.settings.public.plans;
    if (getPlans) {
      return getPlans;
    }
  }
});

Template.selectPlan.rendered = function () {
  var firstPlanItem = $('.select-plan a:first-child');
  firstPlanItem.addClass('active');
  firstPlanItem.find('input').prop("checked", true);
}

Template.selectPlan.events({
  'click .list-group-item': function (e) {
    var parent = $(e.target).closest('.list-group-item');
    parent.addClass("active");
    $('.list-group-item').not(parent).removeClass("active");
    parent.find('input[type="radio"]').prop("checked", true);
  }
});