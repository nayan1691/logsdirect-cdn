(function(window) {
    'use strict';

    // Replace this with your actual API endpoint
    const API_ENDPOINT = 'https://logs-direct.vercel.app/api/send-slack';
  
    function LogsDirect() {
      this.sendSlackMessage = function(channel, message) {
        return new Promise((resolve, reject) => {
          fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ channel, message }),
          })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              resolve(data);
            } else {
              reject(new Error(data.error || 'Failed to send Slack message'));
            }
          })
          .catch(error => {
            reject(new Error('Network error: ' + error.message));
          });
        });
      };
    }
  
    // Create a global LogsDirect instance
    window.LogsDirect = new LogsDirect();
  
  })(window);