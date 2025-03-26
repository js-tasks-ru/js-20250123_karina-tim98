export default class NotificationMessage {
  element;
  timerId;
  static lastShownElement;

success
constructor(message, {duration = 2000, type = 'success' } = {}) {
  this.message = message;
  this.duration = duration;
  this.type = type;

  this.element = this.createElement(this.createTemplate());
}

createElement(template) {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstElementChild;
}

createTemplate() {
  return (`<div class="notification ${this.type}" style="--value:${this.duration}s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
        ${this.message}
      </div>
    </div>
  </div>`);
}

show(targetElement = document.body) {
  if (NotificationMessage.lastShownElement) {
    NotificationMessage.lastShownElement.destroy();
  }
  NotificationMessage.lastShownElement = this;

  targetElement.append(this.element);

  this.hide();
}

hide() {

  this.timerId = setTimeout(()=>{
    this.remove()
    , this.duration;});
}

remove() {
  this.element.remove();
    
}

destroy() {
  clearTimeout(this.timerId);
  this.remove();
  NotificationMessage.lastShownElement = null;
}

}
