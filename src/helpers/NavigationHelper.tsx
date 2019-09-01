import { NavigationActions, NavigationContainerComponent } from 'react-navigation';

let _navigator: NavigationContainerComponent;

function setTopLevelNavigator(navigatorRef: NavigationContainerComponent | null) {
  if (navigatorRef != null) {
    _navigator = navigatorRef;
  }
}

function navigate(routeName: string, params = {}) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
};
