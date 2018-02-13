'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StickyElement = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _throttle2 = require('lodash/throttle');

var _throttle3 = _interopRequireDefault(_throttle2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StickyElement = exports.StickyElement = function () {
  function StickyElement(el) {
    _classCallCheck(this, StickyElement);

    this.el = el;
    this.container = this.el.parentElement;

    this.rectangle = this.getRectangle();
    this.isSticky = false;

    this.addListener();
  }

  _createClass(StickyElement, [{
    key: 'addListener',
    value: function addListener() {
      var _this = this;

      document.addEventListener('scroll', (0, _throttle3.default)(function () {
        if (window.pageYOffset >= _this.rectangle.top) {
          _this.enableSticky();
        } else {
          _this.disableSticky();
        }
      }, 60));

      window.addEventListener('resize', (0, _throttle3.default)(function () {
        if (_this.isSticky) {
          var containerRect = _this.getRectangle(_this.container);
          var elRect = _this.getRectangle();

          _this.rectangle.top = containerRect.top;
          _this.rectangle.left = containerRect.left;
          _this.rectangle.height = elRect.height;
          _this.rectangle.width = elRect.width;

          _this.updateContainerSize();
        } else {
          _this.rectangle = _this.getRectangle();
        }
      }, 300));
    }
  }, {
    key: 'getRectangle',
    value: function getRectangle() {
      var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.el;

      var width = Math.max(element.offsetWidth, element.clientWidth);
      var height = Math.max(element.offsetHeight, element.clientHeight);

      var top = 0;
      var left = 0;

      do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
      } while (element);

      return {
        top: top,
        left: left,
        width: width,
        height: height
      };
    }
  }, {
    key: 'updateContainerSize',
    value: function updateContainerSize() {
      this.container.style.height = this.rectangle.height + 'px';
      this.container.style.width = this.rectangle.width + 'px';
    }
  }, {
    key: 'resetContainerSize',
    value: function resetContainerSize() {
      this.container.style.height = 'auto';
      this.container.style.width = 'auto';
    }
  }, {
    key: 'enableSticky',
    value: function enableSticky() {
      if (!this.isSticky) {
        document.body.classList.add('sticky');
        this.updateContainerSize();
        this.isSticky = true;
      }
    }
  }, {
    key: 'disableSticky',
    value: function disableSticky() {
      if (this.isSticky) {
        document.body.classList.remove('sticky');
        this.resetContainerSize();
        this.isSticky = false;
      }
    }
  }]);

  return StickyElement;
}();