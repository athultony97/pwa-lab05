// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .catch(function (error) {
      console.log('Service Worker failed to register:', error);
    });
}
else {
  console.log('Service Worker is not supported by this browser.');
}


function profileClick(){
  const myNavigator =document.getElementById('my-navigator')
  myNavigator.pushPage('pages/profile.html');
}

function taskClick(){
  const myNavigator =document.getElementById('my-navigator')
  myNavigator.pushPage('pages/task.html');
}

var ClickMe = function() {
  ons.notification.alert('This is a DEMO website');
};