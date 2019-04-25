import LinkComponent from '@ember/routing/link-component';
import { getOwner } from '@ember/application';
import { set, get } from '@ember/object';
import { FEATURES } from '@ember/canary-features';

export default LinkComponent.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    const owner = getOwner(this);

    if (owner.mountPoint) {
      // https://emberjs.github.io/rfcs/0459-angle-bracket-built-in-components.html
      const routeKey = FEATURES.EMBER_GLIMMER_ANGLE_BRACKET_BUILT_INS
        ? 'route'
        : 'targetRouteName';
      const routeName = get(this, routeKey);
      const externalRoute = owner._getExternalRoute(routeName);
      set(this, routeKey, externalRoute);
    }
  }
});
