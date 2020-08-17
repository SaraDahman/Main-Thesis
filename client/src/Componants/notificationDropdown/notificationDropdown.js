import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';

class NotificationDropdown extends React.Component {
  state = {};
  render() {
    return (
      <div class='panel panel-default'>
        <div class='panel-body'>
          <div class='btn-group pull-right top-head-dropdown'>
            <button
              type='button'
              class='btn btn-default dropdown-toggle'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              Notification <span class='caret'></span>
            </button>
            <ul class='dropdown-menu dropdown-menu-right'>
              <li>
                <a href='#' class='top-text-block'>
                  <div class='top-text-heading'>
                    You have <b>3 new themes</b> trending
                  </div>
                  <div class='top-text-light'>15 minutes ago</div>
                </a>
              </li>
              <li>
                <a href='#' class='top-text-block'>
                  <div class='top-text-heading'>
                    New asset recommendations in <b>Gaming Laptop</b>
                  </div>
                  <div class='top-text-light'>2 hours ago</div>
                </a>
              </li>
              <li>
                <a href='#' class='top-text-block'>
                  <div class='top-text-heading'>
                    New asset recommendations in <b>5 themes</b>
                  </div>
                  <div class='top-text-light'>4 hours ago</div>
                </a>
              </li>
              <li>
                <a href='#' class='top-text-block'>
                  <div class='top-text-heading'>
                    Assets specifications modified in themes
                  </div>
                  <div class='top-text-light'>4 hours ago</div>
                </a>
              </li>
              <li>
                <a href='#' class='top-text-block'>
                  <div class='top-text-heading'>
                    We crawled <b>www.dell.com</b> successfully
                  </div>
                  <div class='top-text-light'>5 hours ago</div>
                </a>
              </li>
              <li>
                <a href='#' class='top-text-block'>
                  <div class='top-text-heading'>
                    Next crawl scheduled on <b>10 Oct 2016</b>
                  </div>
                  <div class='top-text-light'>6 hours ago</div>
                </a>
              </li>
              <li>
                <a href='#' class='top-text-block'>
                  <div class='top-text-heading'>
                    You have an update for <b>www.dell.com</b>
                  </div>
                  <div class='top-text-light'>7 hours ago</div>
                </a>
              </li>
              <li>
                <a href='#' class='top-text-block'>
                  <div class='top-text-heading'>
                    <b>"Gaming Laptop"</b> is now trending
                  </div>
                  <div class='top-text-light'>7 hours ago</div>
                </a>
              </li>
              <li>
                <a href='#' class='top-text-block'>
                  <div class='top-text-heading'>
                    New asset recommendations in <b>Gaming Laptop</b>
                  </div>
                  <div class='top-text-light'>7 hours ago</div>
                </a>
              </li>
              <li>
                <div class='loader-topbar'></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default NotificationDropdown;
