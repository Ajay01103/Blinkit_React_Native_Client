import { createNavigationContainerRef, CommonActions, StackActions } from "@react-navigation/native"

export const NavigationRef = createNavigationContainerRef()

export async function navigate(routeName: string, params?: object) {
  NavigationRef.isReady()

  if (NavigationRef.isReady()) {
    NavigationRef.dispatch(CommonActions.navigate(routeName, params))
  }
}

export async function replace(routeName: string, params?: object) {
  NavigationRef.isReady()

  if (NavigationRef.isReady()) {
    NavigationRef.dispatch(StackActions.replace(routeName, params))
  }
}

export async function resetAndNavigate(routeName: string) {
  NavigationRef.isReady()

  if (NavigationRef.isReady()) {
    NavigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }],
      })
    )
  }
}

export async function goBack() {
  NavigationRef.isReady()

  if (NavigationRef.isReady()) {
    NavigationRef.dispatch(CommonActions.goBack())
  }
}

export async function push(routename: string, params?: object) {
  NavigationRef.isReady()

  if (NavigationRef.isReady()) {
    NavigationRef.dispatch(StackActions.push(routename, params))
  }
}

export async function prepareNavigation() {
  NavigationRef.isReady()
}
