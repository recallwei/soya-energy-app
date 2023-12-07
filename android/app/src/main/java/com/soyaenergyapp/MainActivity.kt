package com.SoyaEnergyApp

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

// NOTE: Required for onCreate method
class MainActivity : ReactActivity() {
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "SoyaEnergyApp"


  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
    DefaultReactActivityDelegate(
      this,
      mainComponentName,  // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      fabricEnabled
    )


  /**
   * React Navigation
   *
   * @see https://reactnavigation.org/docs/getting-started.installing-dependencies-into-a-bare-react-native-project
   */
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }
}
