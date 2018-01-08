Template.JobEdit.helpers({
  job: function() {
    return Session.get('Job');
  }
});

// events
Template.JobEdit.events({
  'click .job-edit-submit': function(event) {
    event.preventDefault();

    var formData = AutoForm.getFormValues('updateJobForm').updateDoc;
    var job = Session.get('Job');

    // call update
    Meteor.call('jobUpdate', job._id, formData, function(error) {
      if(error) {
        $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
      } else {
        $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Job has been saved.</div>');

        // auto dismis
        $("#alert").fadeTo(2000, 500).slideUp(500, function(){
          $("#alert").slideUp(500);
        });

        // history
        Meteor.call('createHistory', {
          userId: Meteor.userId(),
          message: 'Updated job #' + job._id
        });

        // reset session
        Session.set('JobEdit', false);
      }
    });
  },
});
