export class ValidationError extends Error {
  /**
   * @param {String} message
   */
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }

  /**
   * @param {Object} pattern
   * @param {() => *} pattern.ValidationError
   */
  matchWith(pattern) {
    if(this.constructor.name in pattern) {
      return pattern[this.constructor.name]()
    } else if('_' in pattern) {
      return pattern['_']()
    } else {
      throw new Error('Pattern mismatched')
    }
  }
}
