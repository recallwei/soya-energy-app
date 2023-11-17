package com.SoyaEnergyApp;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.util.Map;
import java.util.HashMap;

public class MagicToastModule extends ReactContextBaseJavaModule {
  MagicToastModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  public String getName() {
    return "MagicToastModule";
  }

  @ReactMethod
  public void hello(String text, Callback cb) {
    try {
      String str = "Hello" + text;
      cb.invoke(null, str);
    } catch (Exception err) {
      cb.invoke(err, null);
    }
  }
}
