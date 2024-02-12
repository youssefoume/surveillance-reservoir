/*
  Rui Santos
  Complete project details at our blog.
    - ESP32: https://RandomNerdTutorials.com/esp32-firebase-realtime-database/
    - ESP8266: https://RandomNerdTutorials.com/esp8266-nodemcu-firebase-realtime-database/
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files.
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  Based in the RTDB Basic Example by Firebase-ESP-Client library by mobizt
  https://github.com/mobizt/Firebase-ESP-Client/blob/main/examples/RTDB/Basic/Basic.ino
*/

#include <Arduino.h>
#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>
#include <time.h>
//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "Me"
#define WIFI_PASSWORD "youssef23"

// Insert Firebase project API Key
#define API_KEY "AIzaSyC_abYkNEzpEbvo722Uo5n77xuK-tAljh0"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://surveillance-reservoir-default-rtdb.europe-west1.firebasedatabase.app" 

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;
const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = 0;
const int   daylightOffset_sec = 3600;
unsigned long sendDataPrevMillis = 0;
int count = 0;
bool signupOK = false;
const int sensorPin = 18; 
const double level_hight=18;
String level = "niveau 1";
void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("ok");
    signupOK = true;
  } else {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback;  //see addons/TokenHelper.h

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  
  long duration;
  double distance;

  // Trigger the ultrasonic pulse
  pinMode(sensorPin, OUTPUT);
  digitalWrite(sensorPin, LOW);
  delayMicroseconds(2);
  digitalWrite(sensorPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(sensorPin, LOW);

  // Receive the echo
  pinMode(sensorPin, INPUT);
  duration = pulseIn(sensorPin, HIGH);

  // Calculate distance in centimeters (speed of sound is 343 meters per second)
  distance = duration * 0.034 / 2;


  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    // Push a new int on the database path test/historyInt (creating a random id)
    struct tm timeinfo;
    getLocalTime(&timeinfo);
    char currentDate[20];
    strftime(currentDate, sizeof(currentDate), "%Y-%m-%d %H:%M:%S", &timeinfo);
    
    if(level_hight-distance<2) level="niveau 1";
    else {
      if(level_hight-distance<7) level="niveau 2";
      else
       {
        if(level_hight-distance<15) level="niveau 3";
        else level="niveau 4";
       }
    }

    // Push the current date to the specified location in the Realtime Database
    String path = "test/data/";
    FirebaseJson json;
    json.add("date", currentDate);
    json.add("level", level);

    if (Firebase.RTDB.pushJSON(&fbdo, path.c_str(), &json)) {
         Serial.print("Distance: ");
         Serial.print(distance);
          Serial.println(" cm");
  
    } else {
        Serial.println("Failed to push date!");
        Serial.println(fbdo.errorReason());
    }
  }
  delay(1000);
}
