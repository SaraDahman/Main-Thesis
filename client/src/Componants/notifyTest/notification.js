import {
  NotificationActions,
  NotificationContainer,
} from 'material-ui-notifications';
import React from 'react';

function Notify() {
  return (
    <div>
      <NotificationContainer />
      <button
        onClick={(e) => {
          NotificationActions.addNotification({
            headerLabel: 'Mail',
            secondaryHeaderLabel: 'timohanisch@googlemail.com',
            timestamp: 'Now',
            primaryColor: '#ff0000',
            title: 'Timo Hanisch',
            text: 'Yeah this seems like a pretty good idea!',
          });
        }}
      />
    </div>
  );
}

export default Notify;
