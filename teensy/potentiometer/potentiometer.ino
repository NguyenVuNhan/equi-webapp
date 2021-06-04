// Rotary Encoder Inputs
#define SW 23
#define SHORT_PRESS_TIME 500 // 500 millisecond// Rotary Encoder Inputs
#define inputCLK 21
#define inputDT 22

String encdir = "";
unsigned long pressedTime = 0, releasedTime = 0, timePressLimit = 0;
int btnState, lastBtnState = HIGH, clicks = 0;
int counter = 0;
int currentStateCLK;
int previousStateCLK;
void setup() {
  pinMode(inputCLK, INPUT);
  pinMode(inputDT, INPUT);
  pinMode(SW, INPUT_PULLUP);
  Serial.begin(9600);
  previousStateCLK = digitalRead(inputCLK);
}
void loop() { // Read the current state of inputCLK
  currentStateCLK = digitalRead(inputCLK);
  // If the previous and the current state of the
  // inputCLK are different then a pulse has occured
  if (currentStateCLK != previousStateCLK) {
    // If the inputDT state is different than the inputCLK
    // state then
    // the encoder is rotating counterclockwise
    if (digitalRead(inputDT) != currentStateCLK) {
      counter--;
      encdir = "L";
    } else {
      // Encoder is rotating clockwise
      counter++;
      encdir = "R";
    }
    Serial.println(encdir);
  }
  // Update previousStateCLK with the current state
  previousStateCLK = currentStateCLK;
  btnState = digitalRead(SW);
  if (btnState == LOW && lastBtnState == HIGH) // button is pressed
  {
    clicks++;
    pressedTime = millis();
    timePressLimit = pressedTime + (unsigned long)SHORT_PRESS_TIME;
  } else if (btnState == HIGH && lastBtnState == LOW) {
    releasedTime = millis();
    unsigned long pressDuration = releasedTime - pressedTime;
    if (pressDuration < SHORT_PRESS_TIME) {
      if (clicks != 2) {
        Serial.println("A short press is detected");
      } else {
        if (millis() < timePressLimit)
          Serial.println("A double click");
        clicks = 0;
      }
    } else {
      clicks = 0;
      Serial.println("A long press is detected");
    }
  }
  lastBtnState = btnState;
}
