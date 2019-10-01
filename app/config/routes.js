import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import Home from "../screens/Home";
import CurrencyList from "../screens/CurrencyList";
import Options from "../screens/Options";
import Language from "../screens/Language";
import Themes from "../screens/Themes";
import Cryptocurrencies from "../screens/Cryptocurrencies";
import EnterYourApiKey from "../screens/EnterYourApiKey";
import Auth from "../screens/Auth";

import { fromLeft, fadeIn, fadeOut } from "react-navigation-transitions";

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    Options: {
      screen: Options
    },
    Language: {
      screen: Language
    },
    Themes: {
      screen: Themes
    },
    Cryptocurrencies: {
      screen: Cryptocurrencies
    },
    EnterYourApiKey: {
      screen: EnterYourApiKey
    },
    CurrencyList: {
      screen: CurrencyList,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.state.params.title
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: 60
      },
      headerTitleStyle: {
        marginLeft: -5
      }
    },
    headerMode: "screen",
    transitionConfig: () => fromLeft(500)
  }
);

const AppNavigator = createSwitchNavigator(
  {
    Auth: {
      screen: Auth,
      navigationOptions: {
        header: null
      }
    },
    Home: {
      screen: HomeStack,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Auth",
    transitionConfig: () => fadeOut(2000)
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
