/**
 * Basic namespaced action fatcory
 */
export default class ActionCreator {
  /**
   * Constructor.
   * @param  {String} namespace
   * @return {Object}
   */
  constructor(namespace) {
    this.namespace = namespace;
  }

  /**
   * Create an auto-namespaced action.
   * @param  {Object} props
   * @return {Object}
   */
  create(props) {
    let action;

    const {type, payload} = props;
    // console.log('~ ActionCreator', props);
    if (typeof type !== 'undefined') {
      const namespace = this.namespace;
      action = {
        namespace,
        type,
        payload,
      };
      // console.log('! ActionCreator', action);
    } else {
      action = props;
      // console.log('? ActionCreator', action);
    }

    return action;
  }
}
