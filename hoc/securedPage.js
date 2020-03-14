import { getCookie } from '../lib/session';
import { redirect } from '../lib/helpers';
import React, { Component } from 'react';
const getDisplayName = (Component) =>
  Component.displayName || Component.name || 'Component';

const withAuthSync = (WrappedComponent) =>
  class extends Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      const isLoggedIn = getCookie('id_token', ctx.req) ? true : false;

      if (!isLoggedIn) {
        redirect(ctx, '/login');
        return { isLoggedIn };
      }
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, isLoggedIn };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export default withAuthSync;
