import _throttle from 'lodash/throttle'

export class StickyElement {
  constructor(el) {
    this.el = el
    this.container = this.el.parentElement

    this.rectangle = this.getRectangle()
    this.isSticky = false

    this.addListener()
  }

  addListener() {
    document.addEventListener(
      'scroll',
      _throttle(() => {
        if (window.pageYOffset >= this.rectangle.top) {
          this.enableSticky()
        } else {
          this.disableSticky()
        }
      }, 60)
    )

    window.addEventListener(
      'resize',
      _throttle(() => {
        if (this.isSticky) {
          let containerRect = this.getRectangle(this.container)
          let elRect = this.getRectangle()

          this.rectangle.top = containerRect.top
          this.rectangle.left = containerRect.left
          this.rectangle.height = elRect.height
          this.rectangle.width = elRect.width

          this.updateContainerSize()
        } else {
          this.rectangle = this.getRectangle()
        }
      }, 300)
    )
  }

  getRectangle(element = this.el) {
    let width = Math.max(element.offsetWidth, element.clientWidth)
    let height = Math.max(element.offsetHeight, element.clientHeight)

    let top = 0
    let left = 0

    do {
      top += element.offsetTop || 0
      left += element.offsetLeft || 0
      element = element.offsetParent
    } while (element)

    return {
      top: top,
      left: left,
      width: width,
      height: height,
    }
  }

  updateContainerSize() {
    this.container.style.height = this.rectangle.height + 'px'
    this.container.style.width = this.rectangle.width + 'px'
  }

  resetContainerSize() {
    this.container.style.height = 'auto'
    this.container.style.width = 'auto'
  }

  enableSticky() {
    if (!this.isSticky) {
      document.body.classList.add('sticky')
      this.updateContainerSize()
      this.isSticky = true
    }
  }

  disableSticky() {
    if (this.isSticky) {
      document.body.classList.remove('sticky')
      this.resetContainerSize()
      this.isSticky = false
    }
  }
}
